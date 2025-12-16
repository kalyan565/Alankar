# Deploy to GitHub - Complete Guide

## Part 1: Push Your Code to GitHub

### Step 1: Create a GitHub Account (if you don't have one)
1. Go to: https://github.com
2. Click **Sign up**
3. Create your account

### Step 2: Create a New Repository on GitHub
1. After logging in, click the **+** icon (top right)
2. Click **New repository**
3. Fill in:
   - **Repository name**: `alankar-cosmetics` (or any name you like)
   - **Description**: "Alankar Cosmetics - Professional Salon Items E-Commerce Website"
   - **Visibility**: Choose **Public** (free) or **Private**
   - **DO NOT** check "Initialize with README" (we'll push our code)
4. Click **Create repository**

### Step 3: Initialize Git in Your Project
Open your terminal/command prompt and run:

```bash
cd C:\shop
git init
```

### Step 4: Add All Files to Git
```bash
git add .
```

### Step 5: Create Your First Commit
```bash
git commit -m "Initial commit - Alankar Cosmetics website"
```

### Step 6: Connect to GitHub Repository
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/alankar-cosmetics.git
```
**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 7: Push Your Code to GitHub
```bash
git push -u origin main
```

You'll be asked to login to GitHub. Use your GitHub username and a Personal Access Token (not password).

---

## Part 2: Create GitHub Personal Access Token

If you need to authenticate:

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Give it a name: "Alankar Cosmetics"
4. Select scopes: Check **repo** (full control of private repositories)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)
7. When pushing, use:
   - Username: Your GitHub username
   - Password: The token you just created

---

## Part 3: Deploy from GitHub to Vercel (Recommended)

### Step 1: Go to Vercel
1. Visit: https://vercel.com
2. Sign up/Login with your **GitHub account** (easiest!)

### Step 2: Import Your GitHub Repository
1. Click **Add New Project**
2. You'll see your GitHub repositories
3. Find **alankar-cosmetics** (or your repo name)
4. Click **Import**

### Step 3: Configure Project
1. **Project Name**: Keep default or change it
2. **Framework Preset**: Should auto-detect "Next.js"
3. **Root Directory**: Leave as `./` (current directory)
4. **Build Command**: `npm run build` (auto-filled)
5. **Output Directory**: `.next` (auto-filled)
6. **Install Command**: `npm install` (auto-filled)

### Step 4: Deploy
1. Click **Deploy**
2. Wait 2-3 minutes
3. Your site will be live at: `https://your-project-name.vercel.app`

### Step 5: Automatic Updates
- Every time you push code to GitHub, Vercel automatically redeploys!
- No manual deployment needed

---

## Part 4: Alternative - Deploy to Netlify from GitHub

### Step 1: Go to Netlify
1. Visit: https://www.netlify.com
2. Sign up/Login with your **GitHub account**

### Step 2: Import Site
1. Click **Add new site** → **Import an existing project**
2. Choose **GitHub**
3. Authorize Netlify to access your repositories
4. Select **alankar-cosmetics** repository

### Step 3: Configure Build Settings
1. **Branch to deploy**: `main`
2. **Build command**: `npm run build`
3. **Publish directory**: `.next`
4. Click **Deploy site**

---

## Quick Command Summary

```bash
# Navigate to your project
cd C:\shop

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Connect to GitHub (replace YOUR_USERNAME)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/alankar-cosmetics.git

# Push to GitHub
git push -u origin main
```

---

## Updating Your Code Later

After making changes to your code:

```bash
cd C:\shop
git add .
git commit -m "Description of your changes"
git push
```

Vercel/Netlify will automatically redeploy!

---

## Benefits of GitHub Deployment

✅ **Version Control**: Track all changes to your code
✅ **Backup**: Your code is safely stored on GitHub
✅ **Automatic Deployments**: Push code → Auto deploy
✅ **Collaboration**: Others can contribute
✅ **Free**: GitHub is free for public repositories

---

## Troubleshooting

### "Repository not found" error
- Check your GitHub username is correct
- Make sure the repository exists on GitHub
- Verify you have access to the repository

### "Authentication failed" error
- Use Personal Access Token instead of password
- Make sure token has `repo` scope

### "Permission denied" error
- Check your GitHub username
- Verify repository URL is correct
- Make sure you're logged in to GitHub

---

## Need Help?

If you encounter any issues:
1. Check GitHub repository exists
2. Verify your username in the repository URL
3. Make sure you've created a Personal Access Token
4. Check that all files are committed

