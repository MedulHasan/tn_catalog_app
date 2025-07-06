#!/bin/bash

# Script to add native module files to Xcode project
echo "Adding native module files to Xcode project..."

# Navigate to iOS directory
cd ios

# Add files to Xcode project using xcodebuild
echo "Adding TimestampModule.swift..."
xcodebuild -workspace tn_catalog_app.xcworkspace -scheme tn_catalog_app -configuration Debug -target tn_catalog_app -showBuildSettings | grep -E "(PROJECT_DIR|SRCROOT)"

# Alternative: Use Xcode command line tools to add files
echo "Please manually add the following files to your Xcode project:"
echo "1. TimestampModule.swift"
echo "2. TimestampModule.m" 
echo "3. tn_catalog_app-Bridging-Header.h"
echo ""
echo "Then set the bridging header in Build Settings to:"
echo "tn_catalog_app/tn_catalog_app-Bridging-Header.h"

echo "Script completed!" 