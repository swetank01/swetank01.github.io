#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Static files generated in ./out directory"
    echo ""
    echo "🚀 To deploy to GitHub Pages:"
    echo "1. Push your code to GitHub"
    echo "2. Enable GitHub Pages in repository settings"
    echo "3. Set source to 'GitHub Actions'"
    echo ""
    echo "📋 Or manually deploy:"
    echo "1. Copy contents of ./out to your gh-pages branch"
    echo "2. Or use: npx gh-pages -d out"
    echo ""
    echo "🌐 Your site will be available at:"
    echo "https://[your-username].github.io/[repository-name]"
else
    echo "❌ Build failed!"
    exit 1
fi 