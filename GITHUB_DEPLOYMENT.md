# GitHub Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages.

## 🚀 Quick Setup

### 1. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it `swetank01.github.io`
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 3. Push to GitHub
```bash
git remote add origin https://github.com/swetank01/swetank01.github.io.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "GitHub Actions"
5. The site will be automatically deployed on every push to main

## 🔧 Configuration Details

### Repository Structure
Your repository is already configured with:
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Next.js static export configuration (root-level deployment)
- ✅ Proper `.gitignore` settings
- ✅ README with deployment instructions

### Build Process
The GitHub Actions workflow will:
1. Install Node.js 18
2. Install dependencies (`npm ci`)
3. Build the project (`npm run build`)
4. Deploy to GitHub Pages

### Custom Domain (Optional)
If you want to use a custom domain:
1. Go to repository Settings → Pages
2. Add your domain in the "Custom domain" field
3. Add a `CNAME` file to your repository root with your domain

## 🌐 Access Your Site

Once deployed, your portfolio will be available at:
```
https://swetank01.github.io
```

## 🔄 Updating Your Site

To update your portfolio:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

The site will automatically rebuild and deploy within a few minutes.

## 🐛 Troubleshooting

### Build Failures
- Check the "Actions" tab in your GitHub repository
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation passes

### 404 Errors
- Ensure the repository is **public**
- Verify the repository name is exactly `swetank01.github.io`
- Wait a few minutes for deployment to complete

### Styling Issues
- Clear browser cache
- Check that all assets are being loaded correctly
- Verify the root-level configuration in `next.config.ts`

## 📝 Notes

- The site uses static export (`output: 'export'`)
- Images are unoptimized for better compatibility
- The build process creates an `out` directory
- GitHub Actions automatically handles deployment

---

**Your portfolio is now ready for GitHub! 🎉** 