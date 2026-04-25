#!/bin/bash
# render-build.sh

echo "🚀 Starting Render build process..."

# Remove potential corrupted files
rm -rf node_modules package-lock.json

# Install with legacy peer deps
npm install --legacy-peer-deps

# Rebuild native modules
npm rebuild

echo "✅ Build completed."
