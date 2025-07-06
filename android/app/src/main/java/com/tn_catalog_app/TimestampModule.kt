package com.tn_catalog_app

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.text.SimpleDateFormat
import java.util.*

// Import react-native-config for environment variables
import com.lugg.RNCConfig.RNCConfigPackage

@ReactModule(name = TimestampModule.NAME)
class TimestampModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "TimestampModule"
        private const val TIMER_INTERVAL = 20000L // 20 seconds
    }

    private var timer: Timer? = null
    private var handler: Handler? = null
    private var hasListeners = false

    override fun getName(): String = NAME

    @ReactMethod
    fun getCurrentTimestamp(promise: Promise) {
        try {
            val timestamp = System.currentTimeMillis() / 1000
            val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US)
            dateFormat.timeZone = TimeZone.getTimeZone("UTC")
            val dateString = dateFormat.format(Date())
            
            // Example of accessing environment variables in native code
            val env = reactApplicationContext.getResources().getString(reactApplicationContext.getResources().getIdentifier("ENV", "string", reactApplicationContext.getPackageName()))
            
            val result = Arguments.createMap().apply {
                putDouble("timestamp", timestamp.toDouble())
                putString("dateString", dateString)
                putString("environment", env)
            }
            
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to get timestamp", e)
        }
    }

    @ReactMethod
    fun addListener(eventName: String) {
        hasListeners = true
        startTimer()
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        hasListeners = false
        stopTimer()
    }

    private fun startTimer() {
        if (timer != null) return

        timer = Timer()
        handler = Handler(Looper.getMainLooper())

        // Send initial timestamp immediately
        sendTimestampUpdate()

        // Schedule timer for every 20 seconds
        timer?.scheduleAtFixedRate(object : TimerTask() {
            override fun run() {
                handler?.post {
                    sendTimestampUpdate()
                }
            }
        }, TIMER_INTERVAL, TIMER_INTERVAL)
    }

    private fun stopTimer() {
        timer?.cancel()
        timer = null
        handler = null
    }

    private fun sendTimestampUpdate() {
        if (!hasListeners) return

        try {
            val timestamp = System.currentTimeMillis() / 1000
            val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US)
            dateFormat.timeZone = TimeZone.getTimeZone("UTC")
            val dateString = dateFormat.format(Date())
            
            val params = Arguments.createMap().apply {
                putDouble("timestamp", timestamp.toDouble())
                putString("dateString", dateString)
            }

            reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("onTimestampUpdate", params)
        } catch (e: Exception) {
            // Handle any errors silently
        }
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        stopTimer()
    }
} 