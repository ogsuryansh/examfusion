#!/bin/bash

echo "🚀 Starting deployment process...";

# Clean previous build
echo "🧹 Cleaning previous build...";
rm -rf dist;
rm -rf node_modules;
rm -f package-lock.json;

# Install dependencies
echo "📦 Installing dependencies...";
npm install;

# Build the project
echo "🔨 Building project...";
npm run build;

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful!";
    echo "📁 Build output in dist/ folder";
    echo "🚀 Ready for deployment to Netlify";
else
    echo "❌ Build failed!";
    exit 1;
fi;
