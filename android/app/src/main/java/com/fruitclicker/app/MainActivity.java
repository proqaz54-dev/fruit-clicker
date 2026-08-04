package com.fruitclicker.app;

import android.app.Activity;
import android.graphics.Point;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
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
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import com.google.android.gms.ads.rewarded.RewardItem;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.RequestConfiguration;

public class MainActivity extends Activity {

    private static final String TAG = "MainActivity";
    private WebView webView;
    private AdView adView;
    private InterstitialAd interstitialAd;
    private RewardedAd rewardedAd;
    private LinearLayout rootLayout;
    private static final String AD_UNIT_ID = "ca-app-pub-5166043026354710/8848900250";
    private static final String INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-5166043026354710/6350609288";
    private static final String REWARDED_AD_UNIT_ID = "ca-app-pub-5166043026354710/6750330460";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        rootLayout = new LinearLayout(this);
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

        adView = new AdView(this);
        adView.setAdUnitId(AD_UNIT_ID);
        LinearLayout.LayoutParams adParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        adView.setBackgroundColor(0xFF000000);
        rootLayout.addView(adView, adParams);

        setContentView(rootLayout);
        enableFullscreen();

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        settings.setSupportZoom(false);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                initAds();
            }
        });
        webView.setWebChromeClient(new WebChromeClient());

        webView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void showInterstitial() {
                runOnUiThread(MainActivity.this::showInterstitialAd);
            }

            @JavascriptInterface
            public void showRewarded() {
                runOnUiThread(MainActivity.this::showRewardedAd);
            }
        }, "AndroidAds");

        webView.loadUrl("file:///android_asset/index.html");
    }

    private void initAds() {
        Log.i(TAG, "ADMOB INIT START");
        try {
            RequestConfiguration configuration = new RequestConfiguration.Builder()
                .setTestDeviceIds(java.util.Collections.emptyList())
                .build();
            MobileAds.setRequestConfiguration(configuration);
            Log.i(TAG, "RequestConfiguration set");
            MobileAds.initialize(MainActivity.this, initializationStatus -> {
                try {
                    Log.i(TAG, "AdMob initialized: " + initializationStatus.toString());
                    Log.i(TAG, "Adapter statuses: " + initializationStatus.getAdapterStatusMap().toString());
                    loadAdMobBanner();
                    loadInterstitialAd();
                    loadRewardedAd();
                } catch (Exception e) {
                    Log.e(TAG, "Error in AdMob init callback", e);
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "AdMob initialization failed", e);
        }
        Log.i(TAG, "ADMOB INIT END");
    }

    private void loadAdMobBanner() {
        if (adView == null) return;
        try {
            Display display = getWindowManager().getDefaultDisplay();
            Point size = new Point();
            display.getSize(size);
            int width = Math.min(size.x, 400);
            AdSize adSize = AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(this, width);
            adView.setAdSize(adSize);
            LinearLayout.LayoutParams adParams = (LinearLayout.LayoutParams) adView.getLayoutParams();
            if (adParams != null) {
                adParams.width = LinearLayout.LayoutParams.MATCH_PARENT;
                adParams.height = LinearLayout.LayoutParams.WRAP_CONTENT;
                adView.setLayoutParams(adParams);
            }

            AdRequest adRequest = new AdRequest.Builder().build();
            adView.setAdListener(new AdListener() {
                @Override
                public void onAdLoaded() {
                    Log.i(TAG, "Banner ad LOADED successfully");
                    adView.setVisibility(View.VISIBLE);
                }

                @Override
                public void onAdFailedToLoad(LoadAdError loadAdError) {
                    Log.e(TAG, "Banner ad FAILED: " + loadAdError.getMessage() + " (code: " + loadAdError.getCode() + ")");
                    adView.setVisibility(View.VISIBLE);
                    adView.setBackgroundColor(0xFF000000);
                }

                @Override
                public void onAdOpened() {
                    Log.i(TAG, "Banner ad OPENED");
                }

                @Override
                public void onAdClosed() {
                    Log.i(TAG, "Banner ad CLOSED");
                }
            });
            adView.loadAd(adRequest);
        } catch (Exception e) {
            Log.e(TAG, "Failed to load banner ad", e);
            adView.setVisibility(View.VISIBLE);
        }
    }

    private void loadInterstitialAd() {
        if (INTERSTITIAL_AD_UNIT_ID.isEmpty()) return;
        try {
            AdRequest adRequest = new AdRequest.Builder().build();
            InterstitialAd.load(this, INTERSTITIAL_AD_UNIT_ID, adRequest, new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(com.google.android.gms.ads.interstitial.InterstitialAd interstitial) {
                    Log.d(TAG, "Interstitial ad loaded");
                    interstitialAd = interstitial;
                }

                @Override
                public void onAdFailedToLoad(LoadAdError loadAdError) {
                    Log.e(TAG, "Interstitial ad FAILED: " + loadAdError.getMessage() + " (code: " + loadAdError.getCode() + ")");
                    interstitialAd = null;
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Failed to load interstitial ad", e);
        }
    }

    private void showInterstitialAd() {
        if (interstitialAd == null) {
            Log.d(TAG, "Interstitial ad not ready (null)");
            return;
        }
        try {
            Log.i(TAG, "Showing interstitial ad");
            interstitialAd.show(this);
            Log.i(TAG, "Interstitial ad shown successfully");
            interstitialAd = null;
            loadInterstitialAd();
        } catch (Exception e) {
            Log.e(TAG, "Failed to show interstitial ad", e);
        }
    }

    private void loadRewardedAd() {
        if (REWARDED_AD_UNIT_ID.isEmpty()) return;
        try {
            AdRequest adRequest = new AdRequest.Builder().build();
            RewardedAd.load(this, REWARDED_AD_UNIT_ID, adRequest, new RewardedAdLoadCallback() {
                @Override
                public void onAdLoaded(RewardedAd ad) {
                    Log.d(TAG, "Rewarded ad LOADED successfully");
                    rewardedAd = ad;
                }

                @Override
                public void onAdFailedToLoad(LoadAdError loadAdError) {
                    Log.e(TAG, "Rewarded ad FAILED: " + loadAdError.getMessage() + " (code: " + loadAdError.getCode() + ")");
                    rewardedAd = null;
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "Failed to load rewarded ad", e);
        }
    }

    private void showRewardedAd() {
        if (rewardedAd == null) {
            Log.d(TAG, "Rewarded ad not ready (null)");
            return;
        }
        try {
            Log.i(TAG, "Showing rewarded ad");
            rewardedAd.show(this, rewardItem -> {
                Log.i(TAG, "Rewarded ad COMPLETED. Reward: " + rewardItem.getAmount() + " " + rewardItem.getType());
                runOnUiThread(() -> {
                    if (webView != null) {
                        webView.evaluateJavascript("javascript:onRewardEarned('" + rewardItem.getType() + "', " + rewardItem.getAmount() + ")", null);
                    }
                });
            });
            Log.i(TAG, "Rewarded ad shown successfully");
            rewardedAd = null;
            loadRewardedAd();
        } catch (Exception e) {
            Log.e(TAG, "Failed to show rewarded ad", e);
        }
    }

    private void enableFullscreen() {
        WindowInsetsController controller;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            controller = getWindow().getInsetsController();
            if (controller != null) {
                controller.hide(WindowInsets.Type.statusBars());
                controller.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            }
        } else {
            getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
            );
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            );
        }
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
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
        enableFullscreen();
    }

    @Override
    protected void onDestroy() {
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
