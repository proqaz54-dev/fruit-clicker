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
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends Activity {

    private static final String TAG = "MainActivity";
    private WebView webView;
    private AdView adView;
    private InterstitialAd interstitialAd;
    private RewardedAd rewardedAd;
    private LinearLayout rootLayout;
    private final List<String> logBuffer = new ArrayList<>();
    private static final String AD_UNIT_ID = "ca-app-pub-5166043026354710/8761150204";
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

            @JavascriptInterface
            public String getLogs() {
                StringBuilder sb = new StringBuilder();
                for (String log : logBuffer) {
                    sb.append(log).append("\n");
                }
                return sb.toString();
            }
        }, "AndroidAds");

        webView.loadUrl("file:///android_asset/index.html");
    }

    private void initAds() {
        addLog("ADMOB INIT START");
        try {
            RequestConfiguration configuration = new RequestConfiguration.Builder()
                .setTestDeviceIds(java.util.Collections.emptyList())
                .build();
            MobileAds.setRequestConfiguration(configuration);
            addLog("RequestConfiguration set");
            MobileAds.initialize(MainActivity.this, initializationStatus -> {
                try {
                    addLog("AdMob initialized: " + initializationStatus.toString());
                    addLog("Adapter statuses: " + initializationStatus.getAdapterStatusMap().toString());
                    loadAdMobBanner();
                    loadInterstitialAd();
                    loadRewardedAd();
                } catch (Exception e) {
                    addLog("Error in AdMob init callback: " + Log.getStackTraceString(e));
                }
            });
        } catch (Exception e) {
            addLog("AdMob initialization failed: " + Log.getStackTraceString(e));
        }
        addLog("ADMOB INIT END");
    }

    private void addLog(String message) {
        String log = "[" + android.text.format.DateFormat.format("HH:mm:ss", new java.util.Date()) + "] " + message;
        Log.i(TAG, log);
        runOnUiThread(() -> {
            logBuffer.add(log);
            if (logBuffer.size() > 200) {
                logBuffer.remove(0);
            }
        });
    }

    private void loadAdMobBanner() {
        if (adView == null) return;
        try {
            Display display = getWindowManager().getDefaultDisplay();
            Point size = new Point();
            display.getSize(size);
            AdSize adSize = AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(this, size.x);
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
                    addLog("Banner ad LOADED successfully");
                    adView.setVisibility(View.VISIBLE);
                }

                @Override
                public void onAdFailedToLoad(LoadAdError loadAdError) {
                    addLog("Banner ad FAILED: " + loadAdError.getMessage() + " (code: " + loadAdError.getCode() + ")");
                    adView.setVisibility(View.VISIBLE);
                    adView.setBackgroundColor(0xFF000000);
                }

                @Override
                public void onAdOpened() {
                    addLog("Banner ad OPENED");
                }

                @Override
                public void onAdClosed() {
                    addLog("Banner ad CLOSED");
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
                    addLog("Interstitial ad FAILED: " + loadAdError.getMessage() + " (code: " + loadAdError.getCode() + ")");
                    interstitialAd = null;
                }
            });
        } catch (Exception e) {
            addLog("Failed to load interstitial ad: " + Log.getStackTraceString(e));
        }
    }

    private void showInterstitialAd() {
        if (interstitialAd == null) {
            addLog("Interstitial ad not ready (null)");
            return;
        }
        try {
            addLog("Showing interstitial ad");
            interstitialAd.show(this);
            addLog("Interstitial ad shown successfully");
            interstitialAd = null;
            loadInterstitialAd();
        } catch (Exception e) {
            addLog("Failed to show interstitial ad: " + Log.getStackTraceString(e));
        }
    }

    private void loadRewardedAd() {
        if (REWARDED_AD_UNIT_ID.isEmpty()) return;
        try {
            AdRequest adRequest = new AdRequest.Builder().build();
            RewardedAd.load(this, REWARDED_AD_UNIT_ID, adRequest, new RewardedAdLoadCallback() {
                @Override
                public void onAdLoaded(RewardedAd ad) {
                    addLog("Rewarded ad LOADED successfully");
                    rewardedAd = ad;
                }

                @Override
                public void onAdFailedToLoad(LoadAdError loadAdError) {
                    addLog("Rewarded ad FAILED: " + loadAdError.getMessage() + " (code: " + loadAdError.getCode() + ")");
                    rewardedAd = null;
                }
            });
        } catch (Exception e) {
            addLog("Failed to load rewarded ad: " + Log.getStackTraceString(e));
        }
    }

    private void showRewardedAd() {
        if (rewardedAd == null) {
            addLog("Rewarded ad not ready (null)");
            return;
        }
        try {
            addLog("Showing rewarded ad");
            rewardedAd.show(this, rewardItem -> {
                addLog("Rewarded ad COMPLETED. Reward: " + rewardItem.getAmount() + " " + rewardItem.getType());
                runOnUiThread(() -> {
                    if (webView != null) {
                        webView.evaluateJavascript("javascript:onRewardEarned('" + rewardItem.getType() + "', " + rewardItem.getAmount() + ")", null);
                    }
                });
            });
            addLog("Rewarded ad shown successfully");
            rewardedAd = null;
            loadRewardedAd();
        } catch (Exception e) {
            addLog("Failed to show rewarded ad: " + Log.getStackTraceString(e));
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
