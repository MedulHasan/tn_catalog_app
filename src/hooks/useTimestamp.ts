import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import TimestampModule, { timestampEventEmitter, TimestampData } from '../utils/TimestampModule';
import { Platform } from 'react-native';

export const useTimestamp = () => {
  const [timestamp, setTimestamp] = useState<TimestampData | null>(null);
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    // Fallback JavaScript timer when native module is not available
    const createFallbackTimer = () => {
      const updateTime = () => {
        const now = new Date();
        const timestampData: TimestampData = {
          timestamp: Math.floor(now.getTime() / 1000),
          dateString: now.toISOString()
        };
        setTimestamp(timestampData);
        updateLocalTime(timestampData.timestamp);
      };

      // Update immediately
      updateTime();

      // Set up timer for every 20 seconds
      const interval = setInterval(updateTime, 20000);

      return () => clearInterval(interval);
    };

    // Only run on iOS and if native module is available
    if (Platform.OS !== 'ios' || !TimestampModule || !timestampEventEmitter) {
      console.warn('TimestampModule not available, using JavaScript fallback');
      return createFallbackTimer();
    }

    // Get initial timestamp
    const getInitialTimestamp = async () => {
      try {
        if (!TimestampModule) return;
        const data = await TimestampModule.getCurrentTimestamp();
        setTimestamp(data);
        updateLocalTime(data.timestamp);
      } catch (error) {
        console.error('Error getting initial timestamp:', error);
        // Fallback to JavaScript timer if native module fails
        return createFallbackTimer();
      }
    };

    getInitialTimestamp();

    // Listen for timestamp updates
    const subscription = timestampEventEmitter.addListener(
      'onTimestampUpdate',
      (data: TimestampData) => {
        setTimestamp(data);
        updateLocalTime(data.timestamp);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const updateLocalTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const formattedTime = format(date, 'HH:mm:ss');
    const formattedDate = format(date, 'MMM dd, yyyy');
    setLocalTime(`${formattedDate} ${formattedTime}`);
  };

  return {
    timestamp,
    localTime,
    getCurrentTimestamp: TimestampModule?.getCurrentTimestamp || (() => Promise.reject('Module not available')),
  };
}; 