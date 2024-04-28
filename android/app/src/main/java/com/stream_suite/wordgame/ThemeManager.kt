package com.stream_suite.wordgame

import android.content.res.Configuration
import android.view.View
import android.view.Window
import androidx.core.content.ContextCompat
import androidx.core.view.WindowCompat

class ThemeManager(private val window: Window, private val gameWebView: View) {
    fun setSystemBarColors(uiMode: Int) {
        when (uiMode and Configuration.UI_MODE_NIGHT_MASK) {
            Configuration.UI_MODE_NIGHT_NO -> {
                val insetsController = WindowCompat.getInsetsController(window, gameWebView)
                val bgColor = ContextCompat.getColor(window.context, R.color.bg_0_light)
                window.statusBarColor = bgColor
                window.navigationBarColor = bgColor
                insetsController.isAppearanceLightStatusBars = true
            }

            Configuration.UI_MODE_NIGHT_YES -> {
                val insetsController = WindowCompat.getInsetsController(window, gameWebView)
                val bgColor = ContextCompat.getColor(window.context, R.color.bg_0_dark)
                window.statusBarColor = bgColor
                window.navigationBarColor = bgColor
                insetsController.isAppearanceLightStatusBars = false
            }
        }
    }
}