package com.fruitclicker.app.billing;

import android.app.Activity;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

public class BillingManager {
    private static final String TAG = "BillingManager";
    private final Activity activity;
    private final WebView webView;
    private boolean connected = false;

    public BillingManager(Activity activity, WebView webView) {
        this.activity = activity;
        this.webView = webView;
        dispatchEvent("connected", 0, null, null, null);
    }

    @JavascriptInterface
    public void purchase(final String sku) {
        dispatchEvent("result", 0, sku, "Billing not available", null);
    }

    @JavascriptInterface
    public String isAvailable() {
        return "0";
    }

    private void dispatchEvent(String event, int code, String sku, String message, JSONObject data) {
        try {
            JSONObject payload = new JSONObject();
            payload.put("event", event);
            payload.put("code", code);
            if (sku != null) payload.put("sku", sku);
            if (message != null) payload.put("message", message);
            if (data != null) {
                Iterator<String> keys = data.keys();
                while (keys.hasNext()) {
                    String key = keys.next();
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
    }

    public void destroy() {
    }
}
