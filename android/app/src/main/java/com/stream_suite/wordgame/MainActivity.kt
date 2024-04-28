package com.stream_suite.wordgame

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

@SuppressLint("SetJavaScriptEnabled")
class MainActivity : AppCompatActivity() {
    private lateinit var gameWebView: WebView
    private lateinit var callback: OnBackPressedCallback

    private val webViewStateKey = "webViewState"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        gameWebView = findViewById(R.id.webview)

        if (savedInstanceState != null) {
            savedInstanceState.getBundle(webViewStateKey)?.let { gameWebView.restoreState(it) }
        }

        gameWebView.settings.javaScriptEnabled = true
        gameWebView.settings.domStorageEnabled = true
        gameWebView.loadUrl("https://sstream17.github.io/word-game-2/")

        gameWebView.addJavascriptInterface(WebAppInterface(this, gameWebView), "MobileGame")

        callback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                // Navigate within the WebView if it can go back
                if (gameWebView.canGoBack()) {
                    gameWebView.goBack()
                } else {
                    // If the WebView cannot go back, trigger the default Android back behavior
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        }

        onBackPressedDispatcher.addCallback(this, callback)
    }

    override fun onResume() {
        super.onResume()
        // Re-enable the onBackPressedCallback when the activity is resumed
        callback.isEnabled = true
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        val bundle = Bundle()
        gameWebView.saveState(bundle)
        outState.putBundle(webViewStateKey, bundle)
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        savedInstanceState.getBundle(webViewStateKey)?.let { gameWebView.restoreState(it) }
    }
}
