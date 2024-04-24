package com.stream_suite.wordgame

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

@SuppressLint("SetJavaScriptEnabled")
class MainActivity : AppCompatActivity() {
    private lateinit var callback: OnBackPressedCallback

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val gameWebView = findViewById<WebView>(R.id.webview)
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
}
