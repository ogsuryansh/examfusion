# Netlify Deployment Guide for EXAMFUSION

This guide will help you deploy your EXAMFUSION frontend to Netlify without the common deployment issues.

## 🚀 Quick Deployment Steps

### Method 1: Deploy via Netlify UI (Recommended)

1. **Go to [Netlify](https://netlify.com)** and sign in
2. **Click "New site from Git"**
3. **Connect your repository** (GitHub, GitLab, or Bitbucket)
4. **Configure build settings:**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. **Click "Deploy site"**

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Deploy to Netlify:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

## ⚙️ Build Settings

Make sure your Netlify build settings are configured correctly:

### Build Settings
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Environment Variables (if needed)
- `VITE_API_URL`: Your backend API URL
- `NODE_VERSION`: `18` (or your preferred version)

## 🔧 Troubleshooting Common Issues

### Issue 1: MIME Type Errors
**Error**: `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"`

**Solution**: The `netlify.toml` file in the frontend directory should fix this automatically. If not:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** > **Headers**
3. Add the following headers:
   ```
   /*.js
   Content-Type: application/javascript
   
   /*.mjs
   Content-Type: application/javascript
   ```

### Issue 2: 404 Errors for Assets
**Error**: `Failed to load resource: the server responded with a status of 404`

**Solution**: 
1. Make sure the `netlify.toml` file is in the `frontend` directory
2. Check that the build completed successfully
3. Verify the publish directory is set to `dist`

### Issue 3: React Router 404 Errors
**Error**: Direct URL access returns 404

**Solution**: The `netlify.toml` file includes a redirect rule that should fix this. If not:

1. Go to **Site settings** > **Redirects**
2. Add a redirect rule:
   ```
   /*    /index.html   200
   ```

### Issue 4: Build Failures
**Error**: Build process fails

**Solution**:
1. Check that all dependencies are installed: `npm install`
2. Verify Node.js version compatibility
3. Check the build logs in Netlify dashboard

## 📁 File Structure for Deployment

Ensure your repository structure looks like this:

```
public/
├── frontend/
│   ├── src/
│   ├── public/
│   │   └── favicon.svg
│   ├── package.json
│   ├── vite.config.js
│   ├── netlify.toml
│   └── index.html
└── backend/
```

## 🎯 Pre-deployment Checklist

Before deploying, ensure:

- [ ] All dependencies are installed (`npm install`)
- [ ] The project builds locally (`npm run build`)
- [ ] `netlify.toml` file is in the `frontend` directory
- [ ] `favicon.svg` exists in `frontend/public/`
- [ ] No references to missing files in `index.html`
- [ ] Environment variables are set (if needed)

## 🚀 Post-deployment Steps

After successful deployment:

1. **Test the live site** - Navigate through all pages
2. **Check console for errors** - Open browser dev tools
3. **Test responsive design** - Check mobile/tablet views
4. **Verify API connections** - Test login/register functionality
5. **Set up custom domain** (optional)

## 🔍 Debugging Tips

### Check Build Logs
1. Go to your Netlify dashboard
2. Click on your site
3. Go to **Deploys** tab
4. Click on the latest deploy
5. Check the build logs for errors

### Local Testing
Test your build locally before deploying:
```bash
cd frontend
npm run build
npm run preview
```

### Environment Variables
If your app needs environment variables:
1. Go to **Site settings** > **Environment variables**
2. Add your variables (prefixed with `VITE_` for Vite)

## 📞 Support

If you're still experiencing issues:

1. Check the [Netlify documentation](https://docs.netlify.com/)
2. Review the build logs in your Netlify dashboard
3. Test the build locally first
4. Ensure all files are committed to your repository

---

**Happy Deploying! 🎉**
