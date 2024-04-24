package com.stream_suite.wordgame

import android.content.Context
import android.view.HapticFeedbackConstants
import android.view.View
import android.webkit.JavascriptInterface

class WebAppInterface(private val mContext: Context, private val view: View) {
    @JavascriptInterface
    fun onKeyPress() {
        if (view.isHapticFeedbackEnabled) {
            view.performHapticFeedback(HapticFeedbackConstants.KEYBOARD_TAP);
        }
    }
}