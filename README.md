## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 18.0.0
- **npm** or **yarn**
- **React Native CLI**: `npm install -g @react-native-community/cli`
- **Xcode**: 15.0+ (for iOS development)
- **Android Studio**: Latest version (for Android development)
- **CocoaPods**: `sudo gem install cocoapods` (for iOS dependencies)

## Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:MedulHasan/tn_catalog_app.git
   cd tn_catalog_app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies**

   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Environment Setup**

   ```bash
   # Copy the environment example file
   cp env.example .env

   # Edit .env with your actual values
   # - Add your Google Maps API key
   # - Configure your API base URL
   # - Set the environment
   ```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Google Maps API Key
GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key_here

# API Base URL
API_BASE_URL=https://dummyjson.com

# App Environment
ENV=development
```

## Running the Application

### iOS

1. **Start Metro bundler**

   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on iOS Simulator**

   ```bash
   npm run ios
   # or
   yarn ios
   ```

3. **Run on iOS Device**
   - Connect your iOS device
   - Open `ios/tn_catalog_app.xcworkspace` in Xcode
   - Select your device and run the project

### Android

1. **Start Metro bundler**

   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on Android Emulator**

   ```bash
   npm run android
   # or
   yarn android
   ```

3. **Run on Android Device**
   - Enable Developer Options and USB Debugging on your device
   - Connect your device via USB
   - Run `npm run android` or `yarn android`
