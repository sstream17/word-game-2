package com.stream_suite.wordgame

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity

@SuppressLint("SetJavaScriptEnabled")
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val gameWebView = findViewById<WebView>(R.id.webview)
        gameWebView.settings.javaScriptEnabled = true
        gameWebView.settings.domStorageEnabled = true
        gameWebView.loadUrl("https://sstream17.github.io/word-game-2/")
    }
}