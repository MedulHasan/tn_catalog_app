import Foundation
import React

@objc(TimestampModule)
class TimestampModule: RCTEventEmitter {
    
    private var timer: Timer?
    private var hasListeners = false
    
    override init() {
        super.init()
        setupTimer()
    }
    
    deinit {
        stopTimer()
    }
    
    @objc
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    override func supportedEvents() -> [String]! {
        return ["onTimestampUpdate"]
    }
    
    override func startObserving() {
        hasListeners = true
        startTimer()
    }
    
    override func stopObserving() {
        hasListeners = false
        stopTimer()
    }
    
    private func setupTimer() {
        // Timer will be started when listeners are added
    }
    
    private func startTimer() {
        guard timer == nil else { return }
        
        timer = Timer.scheduledTimer(withTimeInterval: 20.0, repeats: true) { [weak self] _ in
            self?.sendTimestampUpdate()
        }
        
        // Send initial timestamp immediately
        sendTimestampUpdate()
    }
    
    private func stopTimer() {
        timer?.invalidate()
        timer = nil
    }
    
    private func sendTimestampUpdate() {
        guard hasListeners else { return }
        
        let timestamp = Date().timeIntervalSince1970
        let eventData: [String: Any] = [
            "timestamp": timestamp,
            "dateString": ISO8601DateFormatter().string(from: Date())
        ]
        
        sendEvent(withName: "onTimestampUpdate", body: eventData)
    }
    
    @objc
    func getCurrentTimestamp(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        let timestamp = Date().timeIntervalSince1970
        let eventData: [String: Any] = [
            "timestamp": timestamp,
            "dateString": ISO8601DateFormatter().string(from: Date())
        ]
        resolve(eventData)
    }
} 