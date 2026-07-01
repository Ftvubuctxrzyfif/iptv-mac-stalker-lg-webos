#!/bin/bash

# Build script for creating webOS IPK package
# This script creates a properly formatted IPK file for LG webOS TVs

set -e

echo "🚀 Building IPTV Mac Stalker for webOS..."

# Configuration
APP_ID="com.kamelkanane.iptv-mac-stalker"
APP_NAME="iptv-mac-stalker-lg-webos"
VERSION="1.0.0"
BUILD_DIR="dist"
IPK_FILE="${APP_NAME}-${VERSION}.ipk"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Step 1: Building application...${NC}"
npm run build

if [ ! -d "$BUILD_DIR" ]; then
  echo -e "${RED}Error: Build directory not found${NC}"
  exit 1
fi

echo -e "${GREEN}Step 2: Creating webOS package structure...${NC}"

# Create package directory
PKG_DIR="${BUILD_DIR}/package"
rm -rf "$PKG_DIR"
mkdir -p "$PKG_DIR"

# Copy built files
cp -r "$BUILD_DIR"/* "$PKG_DIR/"

# Copy webOS specific files
cp appinfo.json "$PKG_DIR/"
cp LICENSE "$PKG_DIR/"

echo -e "${GREEN}Step 3: Creating icons...${NC}"

# Create simple icon files (in production, replace with actual icons)
convert -size 80x80 xc:none -fill '#3B82F6' -draw 'circle 40,40 40,0' -fill white -pointsize 40 -gravity center -annotate +0+0 'TV' "$PKG_DIR/icon.png" 2>/dev/null || {
  echo "⚠️  ImageMagick not found, creating placeholder icons..."
  # Create placeholder if ImageMagick not available
  echo "iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAACAFv9cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+/Pp/mixwAAABgUExURQAAAP//////6qqqpgAAAD///////8AAAAAAP8zMzNmZmZnZ2dmZmZzMzMAAAAAAAA8WYxwAAAAJdFJOUwAFAgICBAUFBQQGBwgICQoKCwsLDQwMDQ4ODg8QERISFhcYGRoaGhojIyMkJCQkJyopKywsLS0wMDIyMjQ2NjY4ODg6Ojw8PD4+P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSkxMTE5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXFnZ2dra2tvb29zc3N3d3eFhYWGhoaLi4uPj5BQUFGRkZKSkpMTExRUZKSkpMTFFRVE1HkpKSklRVRkZTSEZKSklNTE1LTE5LTU1OT09PUE9RUFBRUVFJSUpKSkxMTU1NT05PT1BQUFFRUVJSUlKTExMTU1NT05OT09QUFBRUVFRSUlJSkxMTE1NTU5OTk9PUE9RUVFRUlJTUlJKTExMTU5PUFBRU1FNT1BQUFFRUVJSUlKSkxMTU5PUFBQUVFRUlJSUpKSkxMTU5PUVJTU1NTUlJTUlKSkpMTExNT05PT1BQUVFRUlJSUpKSkxMTU5PT1BQUVFRUlJSUpKSkxMTU9PUFBQUVFSUlKSkpMTExOT1BQUVFJSUpKSkxMTU5PUVJTU1NSU5MTFFQT1A8AAAAAWJLR0QAiAUdSAAAACAlQkNJBAAAACxAAAMBAAAAAABAAAARQAAABAAAACAAAAAABAAADAAAAAAA" | base64 -d > "$PKG_DIR/icon.png"
}

convert -size 130x130 xc:none -fill '#3B82F6' -draw 'circle 65,65 65,0' -fill white -pointsize 60 -gravity center -annotate +0+0 'TV' "$PKG_DIR/large-icon.png" 2>/dev/null || {
  echo "⚠️  ImageMagick not found, creating placeholder icons..."
  # Create placeholder if ImageMagick not available
  echo "iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAACAFv9cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+/Pp/mixwAAABgUExURQAAAP//////6qqqpgAAAD///////8AAAAAAP8zMzNmZmZnZ2dmZmZzMzMAAAAAAAA8WYxwAAAAJdFJOUwAFAgICBAUFBQQGBwgICQoKCwsLDQwMDQ4ODg8QERISFhcYGRoaGhojIyMkJCQkJyopKywsLS0wMDIyMjQ2NjY4ODg6Ojw8PD4+P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSkxMTE5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXFnZ2dra2tvb29zc3N3d3eFhYWGhoaLi4uPj5BQUFGRkZKSkpMTExRUZKSkpMTFFRVE1HkpKSklRVRkZTSEZKSklNTE1LTE5LTU1OT09PUE9RUFBRUVFJSUpKSkxMTU1NT05PT1BQUFFRUVJSUlKTExMTU1NT05OT09QUFBRUVFRSUlJSkxMTE1NTU5OTk9PUE9RUVFRUlJTUlJKTExMTU5PUFBRU1FNT1BQUFFRUVJSUlKSkxMTU5PUFBQUVFRUlJSUpKSkxMTU9PUFBQUVFSUlKSkpMTExOT1BQUVFJSUpKSkxMTU5PUVJTU1NSU5MTFFQT1A8AAAAAWJLR0QAiAUdSAAAACAlQkNJBAAAACxAAAMBAAAAAABAAAARQAAABAAAACAAAAAABAAADAAAAAAA" | base64 -d > "$PKG_DIR/large-icon.png"
}

echo -e "${GREEN}Step 4: Creating package manifest...${NC}"

# Create package manifest
cat > "$PKG_DIR/manifest.json" << EOF
{
  "package": "${APP_ID}",
  "version": "${VERSION}",
  "icon": "icon.png",
  "largeIcon": "large-icon.png",
  "title": "IPTV Mac Stalker",
  "vendor": "Kamel Kanane",
  "type": "web",
  "main": "index.html",
  "uiRevision": "2"
}
EOF

echo -e "${GREEN}Step 5: Creating IPK archive...${NC}"

# Navigate to package directory
cd "$PKG_DIR"

# Create IPK file (it's just a zip with specific structure)
zip -r "../${IPK_FILE}" . -q "*.json" "*.png" "*.html" "*.js" "*.css" "*/" LICENSE

# Navigate back
cd ..

# Cleanup package directory
rm -rf "$PKG_DIR"

echo -e "${GREEN}✅ IPK file created: ${BUILD_DIR}/${IPK_FILE}${NC}"
echo -e "${YELLOW}File size: $(du -h "${BUILD_DIR}/${IPK_FILE}" | cut -f1)${NC}"

echo -e "${GREEN}Installation instructions:${NC}"
echo -e "  1. Enable Developer Mode on your LG TV"
echo -e "  2. Install webOS SDK on your computer"
echo -e "  3. Run: ares-install -d <TV_IP> ${BUILD_DIR}/${IPK_FILE}"
echo -e "  4. Or use webOS TV CLI to install from USB"

echo -e "${GREEN}Build complete! 🎉${NC}"
