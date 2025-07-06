# Native iOS Timestamp Module Setup

This document explains how to set up the native iOS timestamp module that provides a timer functionality every 20 seconds.

## Files Created

1. `ios/tn_catalog_app/TimestampModule.swift` - Swift implementation of the native module
2. `ios/tn_catalog_app/TimestampModule.m` - Objective-C bridge for React Native
3. `ios/tn_catalog_app/tn_catalog_app-Bridging-Header.h` - Bridging header for Swift-Objective-C interop
4. `src/utils/TimestampModule.ts` - TypeScript interface for the native module
5. `src/hooks/useTimestamp.ts` - React hook for using the timestamp functionality
6. `src/components/FloatingTimestamp.tsx` - UI component that displays the timestamp

## Xcode Setup Required

To complete the setup, you need to add the Swift files to your Xcode project:

1. Open `ios/tn_catalog_app.xcworkspace` in Xcode
2. Right-click on the `tn_catalog_app` folder in the project navigator
3. Select "Add Files to 'tn_catalog_app'"
4. Add the following files:
   - `TimestampModule.swift`
   - `TimestampModule.m`
   - `tn_catalog_app-Bridging-Header.h`

5. In the project settings, go to "Build Settings" and search for "Bridging Header"
6. Set "Objective-C Bridging Header" to `tn_catalog_app/tn_catalog_app-Bridging-Header.h`

## Features

- **Timer Functionality**: Executes every 20 seconds and returns current timestamp
- **Event Emission**: Sends timestamp updates via React Native events
- **Promise-based API**: Provides `getCurrentTimestamp()` method
- **Local Time Conversion**: Converts timestamps to local time using date-fns
- **Floating UI**: Displays current time in a fixed floating position on the home screen

## Usage

The module is automatically integrated into the Home screen and will display the current time in a floating bubble. The timestamp updates every 20 seconds automatically.

## Dependencies

- `date-fns`: For date formatting and timezone conversion
- React Native 0.78.2+ with new architecture support

## Troubleshooting

If the module doesn't work:
1. Ensure all Swift files are added to the Xcode project
2. Check that the bridging header is properly configured
3. Clean and rebuild the project
4. Check the console for any error messages 