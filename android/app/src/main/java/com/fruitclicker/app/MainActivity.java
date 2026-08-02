package com.fruitclicker.app;

import android.app.Activity;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;

import com.fruitclicker.app.billing.BillingManager;

public class MainActivity extends Activity {

    private static final String TAG = "MainActivity";
    private WebView webView;
    private BillingManager billingManager;
    private AdView adView;
    private static final String AD_UNIT_ID = "ca-app-pub-2369179575521282/3426927468";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        LinearLayout rootLayout = new LinearLayout(this);
        rootLayout.setOrientation(LinearLayout.VERTICAL);
        rootLayout.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.MATCH_PARENT
        ));

        webView = new WebView(this);
        LinearLayout.LayoutParams webParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            0,
            1f
        );
        rootLayout.addView(webView, webParams);

        MobileAds.initialize(this, initializationStatus -> {});

        adView = new AdView(this);
        adView.setAdSize(AdSize.BANNER);
        adView.setAdUnitId(AD_UNIT_ID);

        LinearLayout.LayoutParams adParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        rootLayout.addView(adView, adParams);

        AdRequest adRequest = new AdRequest.Builder().build();
        adView.loadAd(adRequest);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());

        billingManager = new BillingManager(this, webView);

        webView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public String purchase(String sku) {
                billingManager.purchase(sku);
                return "queued";
            }

            @JavascriptInterface
            public String isAvailable() {
                return billingManager.isAvailable();
            }
        }, "AndroidBilling");

        webView.loadUrl("file:///android_asset/index.html");
        setContentView(rootLayout);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        if (adView != null) {
            adView.pause();
        }
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (adView != null) {
            adView.resume();
        }
    }

    @Override
    protected void onDestroy() {
        if (billingManager != null) {
            billingManager.destroy();
            billingManager = null;
        }
        if (adView != null) {
            adView.destroy();
            adView = null;
        }
        if (webView != null) {
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}
