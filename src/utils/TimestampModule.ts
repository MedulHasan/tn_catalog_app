import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

interface TimestampData {
  timestamp: number;
  dateString: string;
}

interface TimestampModuleInterface {
  getCurrentTimestamp(): Promise<TimestampData>;
}

// Check if the native module is available
const isNativeModuleAvailable = () => {
  return (Platform.OS === 'ios' || Platform.OS === 'android') && NativeModules.TimestampModule;
};

const { TimestampModule } = NativeModules;

// Create event emitter only if module is available
export const timestampEventEmitter = isNativeModuleAvailable() 
  ? new NativeEventEmitter(TimestampModule)
  : null;

// Export the module with fallback
export default isNativeModuleAvailable() 
  ? (TimestampModule as TimestampModuleInterface)
  : null;

export type { TimestampData }; 