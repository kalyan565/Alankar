# Deploy to Vercel - Step by Step Guide

## Why Vercel?
- ✅ Made by Next.js creators
- ✅ Zero configuration needed
- ✅ Automatic optimizations
- ✅ Free tier available
- ✅ Works perfectly with Next.js

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Create Vercel Account
1. Go to: https://vercel.com
2. Click **Sign Up**
3. Sign up with **GitHub**, **GitLab**, or **Email**

### Step 2: Deploy Your Project
1. After signing in, click **Add New Project**
2. You have two options:

   **Option A: Deploy from Git (Recommended)**
   - Connect your GitHub/GitLab account
   - Import your repository
   - Vercel will auto-detect Next.js
   - Click **Deploy**

   **Option B: Deploy by Uploading Files**
   - Click **Deploy** without connecting Git
   - Or use the Vercel CLI (see Method 2 below)

### Step 3: Wait for Deployment
- Vercel will automatically:
  - Install dependencies
  - Build your project
  - Deploy it
- Takes about 2-3 minutes

### Step 4: Access Your Site
- Your site will be live at: `https://your-project-name.vercel.app`
- You'll see the URL in the deployment page

---

## Method 2: Deploy via Command Line (Fastest)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Navigate to Your Project
```bash
cd C:\shop
```

### Step 3: Login to Vercel
```bash
vercel login
```
- This will open a browser for authentication
- Or use email/password

### Step 4: Deploy
```bash
vercel
```

### Step 5: Follow Prompts
- Set up and deploy? → Type **Y** and press Enter
- Which scope? → Select your account
- Link to existing project? → Type **N** and press Enter
- What's your project's name? → Press Enter (uses default) or type a name
- In which directory is your code located? → Press Enter (uses current directory)
- Want to override the settings? → Type **N** and press Enter

### Step 6: Your Site is Live!
- Vercel will give you a URL like: `https://your-project-name.vercel.app`
- Copy and open it in your browser

### Step 7: Deploy to Production (Optional)
For production deployment:
```bash
vercel --prod
```

---

## Method 3: Deploy via GitHub (Best for Updates)

### Step 1: Create GitHub Repository
1. Go to: https://github.com/new
2. Create a new repository (e.g., "alankar-cosmetics")
3. Don't initialize with README

### Step 2: Push Your Code to GitHub
```bash
cd C:\shop
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/alankar-cosmetics.git
git push -u origin main
```

### Step 3: Connect to Vercel
1. Go to: https://vercel.com/new
2. Click **Import Git Repository**
3. Select your repository
4. Click **Import**
5. Vercel auto-detects Next.js settings
6. Click **Deploy**

### Step 4: Automatic Deployments
- Every time you push to GitHub, Vercel automatically redeploys
- No manual deployment needed!

---

## Troubleshooting

### If deployment fails:
1. Check build logs in Vercel dashboard
2. Make sure all dependencies are in `package.json`
3. Ensure `next.config.js` is correct
4. Check that all images are in `public` folder

### Common Issues:
- **Build Error**: Check Node.js version (should be 18+)
- **Image Not Loading**: Verify images are in `public/images/products/`
- **404 Errors**: Make sure all routes are correct

---

## After Deployment

### Custom Domain (Optional)
1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS instructions

### Environment Variables (If Needed)
1. Go to **Settings** → **Environment Variables**
2. Add any required variables

---

## Quick Start Command

If you just want to deploy quickly:

```bash
cd C:\shop
npm install -g vercel
vercel login
vercel
```

That's it! Your site will be live in 2-3 minutes.


