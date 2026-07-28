package com.fruitclicker.app.billing;

import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BillingManager implements PurchasesUpdatedListener {
    private static final String TAG = "BillingManager";
    private final Activity activity;
    private final WebView webView;
    private BillingClient billingClient;
    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private final Map<String, String> pendingCallbacks = new HashMap<>();
    private boolean connected = false;

    public BillingManager(Activity activity, WebView webView) {
        this.activity = activity;
        this.webView = webView;
        initBillingClient();
    }

    private void initBillingClient() {
        PendingPurchasesParams pendingPurchasesParams = PendingPurchasesParams.newBuilder()
                .enableOneTimePurchases()
                .build();

        billingClient = BillingClient.newBuilder(activity.getApplicationContext())
                .setListener(this)
                .enablePendingPurchases(pendingPurchasesParams)
                .build();

        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                connected = billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK;
                Log.d(TAG, "Billing connected: " + connected);
                dispatchEvent("connected", connected ? 1 : 0, null);
            }

            @Override
            public void onBillingServiceDisconnected() {
                connected = false;
                Log.d(TAG, "Billing disconnected");
            }
        });
    }

    @JavascriptInterface
    public void purchase(final String sku) {
        mainHandler.post(() -> launchPurchase(sku));
    }

    @JavascriptInterface
    public String isAvailable() {
        return connected ? "1" : "0";
    }

    private void launchPurchase(String sku) {
        if (!connected || billingClient == null) {
            dispatchEvent("result", 0, sku, "Billing not available", null);
            return;
        }

        List<QueryProductDetailsParams.Product> products = new ArrayList<>();
        products.add(QueryProductDetailsParams.Product.newBuilder()
                .setProductId(sku)
                .setProductType(BillingClient.ProductType.INAPP)
                .build());

        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
                .setProductList(products)
                .build();

        billingClient.queryProductDetailsAsync(params, (billingResult, productDetailsList) -> {
            if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                dispatchEvent("result", 0, sku, "query_failed:" + billingResult.getDebugMessage(), null);
                return;
            }

            if (productDetailsList.isEmpty()) {
                dispatchEvent("result", 0, sku, "product_not_found:" + sku, null);
                return;
            }

            ProductDetails productDetails = productDetailsList.get(0);
            BillingFlowParams flowParams = BillingFlowParams.newBuilder()
                    .setProductDetailsParamsList(
                            List.of(BillingFlowParams.ProductDetailsParams.newBuilder()
                                    .setProductDetails(productDetails)
                                    .build())
                    )
                    .build();

            BillingResult result = billingClient.launchBillingFlow(activity, flowParams);
            if (result.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                dispatchEvent("result", 0, sku, "launch_failed:" + result.getDebugMessage(), null);
            }
        });
    }

    @Override
    public void onPurchasesUpdated(BillingResult billingResult, List<Purchase> purchases) {
        if (billingResult == null) {
            dispatchEvent("result", 0, null, "billing_result_null", null);
            return;
        }

        if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && purchases != null) {
            for (Purchase purchase : purchases) {
                if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                    if (!purchase.isAcknowledged()) {
                        AcknowledgePurchaseParams acknowledgePurchaseParams =
                                AcknowledgePurchaseParams.newBuilder()
                                        .setPurchaseToken(purchase.getPurchaseToken())
                                        .build();
                        billingClient.acknowledgePurchase(acknowledgePurchaseParams, result -> {
                            if (result.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                                Log.d(TAG, "Purchase acknowledged: " + purchase.getProducts());
                            }
                        });
                    }

                    try {
                        JSONObject data = new JSONObject();
                        data.put("sku", purchase.getProducts().get(0));
                        data.put("token", purchase.getPurchaseToken());
                        data.put("state", "purchased");
                        data.put("isAcknowledged", purchase.isAcknowledged());
                        dispatchEvent("result", 1, purchase.getProducts().get(0), null, data);
                    } catch (JSONException e) {
                        dispatchEvent("result", 1, purchase.getProducts().get(0), null, null);
                    }
                } else if (purchase.getPurchaseState() == Purchase.PurchaseState.PENDING) {
                    dispatchEvent("result", 2, purchase.getProducts().get(0), "pending", null);
                }
            }
        } else if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.USER_CANCELED) {
            dispatchEvent("result", 0, null, "user_canceled", null);
        } else {
            dispatchEvent("result", 0, null, "error:" + billingResult.getDebugMessage(), null);
        }
    }

    private void dispatchEvent(String event, int code, String sku, String message, JSONObject data) {
        mainHandler.post(() -> {
            try {
                JSONObject payload = new JSONObject();
                payload.put("event", event);
                payload.put("code", code);
                if (sku != null) payload.put("sku", sku);
                if (message != null) payload.put("message", message);
                if (data != null) {
                    for (String key : data.keySet()) {
                        payload.put(key, data.get(key));
                    }
                }
                String js = "window.onBillingEvent && window.onBillingEvent(" + payload.toString() + ");";
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT) {
                    webView.evaluateJavascript(js, null);
                } else {
                    webView.loadUrl("javascript:" + js);
                }
            } catch (Exception e) {
                Log.e(TAG, "dispatchEvent error", e);
            }
        });
    }

    public void destroy() {
        if (billingClient != null && connected) {
            billingClient.endConnection();
            billingClient = null;
        }
    }
}
