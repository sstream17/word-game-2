package com.stream_suite.wordgame

import android.app.UiModeManager
import android.content.Context
import android.os.Build
import android.view.HapticFeedbackConstants
import android.view.View
import android.webkit.JavascriptInterface
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate

class WebAppInterface(private val mContext: Context, private val view: View) {
    @JavascriptInterface
    fun onKeyPress() {
        if (view.isHapticFeedbackEnabled) {
            view.performHapticFeedback(HapticFeedbackConstants.KEYBOARD_TAP);
        }
    }

    @JavascriptInterface
    fun onDarkThemeSet() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val uiModeManager = mContext.getSystemService(Context.UI_MODE_SERVICE) as UiModeManager
            uiModeManager.setApplicationNightMode(UiModeManager.MODE_NIGHT_YES)
        } else {
            val delegate = (mContext as AppCompatActivity).delegate
            delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_YES
        }
    }

    @JavascriptInterface
    fun onLightThemeSet() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val uiModeManager = mContext.getSystemService(Context.UI_MODE_SERVICE) as UiModeManager
            uiModeManager.setApplicationNightMode(UiModeManager.MODE_NIGHT_NO)
        } else {
            val delegate = (mContext as AppCompatActivity).delegate
            delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_NO
        }
    }

    @JavascriptInterface
    fun onSystemThemeSet() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val uiModeManager = mContext.getSystemService(Context.UI_MODE_SERVICE) as UiModeManager
            uiModeManager.setApplicationNightMode(UiModeManager.MODE_NIGHT_AUTO)
        } else {
            val delegate = (mContext as AppCompatActivity).delegate
            delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM
        }
    }
}