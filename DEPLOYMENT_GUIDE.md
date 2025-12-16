# Deployment Guide - Making Alankar Cosmetics Public

## Option 1: Deploy to Vercel (Recommended - Easiest & Free)

Vercel is made by the Next.js team and offers free hosting with automatic deployments.

### Steps:

1. **Create a Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub, GitLab, or email

2. **Install Vercel CLI** (Optional - for command line deployment)
   ```bash
   npm install -g vercel
   ```

3. **Deploy via Vercel Dashboard:**
   - Go to https://vercel.com/new
   - Import your project (if using Git) or drag & drop your project folder
   - Vercel will auto-detect Next.js
   - Click "Deploy"

4. **Deploy via Command Line:**
   ```bash
   cd C:\shop
   vercel
   ```
   - Follow the prompts
   - Your site will be live at: `https://your-project-name.vercel.app`

### Benefits:
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Automatic deployments from Git
- ✅ Global CDN
- ✅ Zero configuration needed

---

## Option 2: Deploy to Netlify (Free Alternative)

### Steps:

1. **Create Netlify Account**
   - Go to https://www.netlify.com
   - Sign up for free

2. **Deploy via Netlify Dashboard:**
   - Drag and drop your `shop` folder to Netlify dashboard
   - Or connect your Git repository

3. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Deploy via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   cd C:\shop
   npm run build
   netlify deploy --prod
   ```

---

## Option 3: Deploy to Railway (Free Tier Available)

### Steps:

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo" or "Empty Project"
   - Connect your repository or upload files

3. **Configure:**
   - Railway auto-detects Next.js
   - Add environment variables if needed
   - Deploy!

---

## Option 4: Use ngrok (Temporary Public Access)

For quick testing or temporary access without deploying:

1. **Install ngrok:**
   - Download from https://ngrok.com
   - Or: `npm install -g ngrok`

2. **Start your Next.js app:**
   ```bash
   cd C:\shop
   npm run dev
   ```

3. **In another terminal, run ngrok:**
   ```bash
   ngrok http 3000
   ```

4. **Get your public URL:**
   - ngrok will give you a public URL like: `https://abc123.ngrok.io`
   - This URL will forward to your localhost:3000

**Note:** Free ngrok URLs change each time you restart. For permanent URL, upgrade to paid plan.

---

## Option 5: Deploy to Your Own Server/VPS

If you have a VPS (DigitalOcean, AWS EC2, etc.):

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Use PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "alankar-cosmetics" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx as reverse proxy** (optional but recommended)

---

## Quick Start: Vercel (Recommended)

### Fastest Way:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd C:\shop
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - Project name? (or press Enter for default)
   - Directory? (press Enter for current)
   - Override settings? **N**

5. **Your site is live!** 🎉

---

## Important Notes:

### Before Deploying:

1. **Check environment variables** (if any)
2. **Test production build locally:**
   ```bash
   npm run build
   npm start
   ```

3. **Update any hardcoded localhost URLs** in your code

4. **Ensure all images are in public folder** (✅ Already done)

### After Deploying:

1. **Custom Domain** (Optional):
   - Add your domain in Vercel/Netlify settings
   - Update DNS records as instructed

2. **Environment Variables** (if needed):
   - Add in platform dashboard under Settings → Environment Variables

3. **Monitor Performance:**
   - Check analytics in your hosting platform dashboard

---

## Recommended: Vercel

For Next.js applications, **Vercel is the best choice** because:
- Made by Next.js creators
- Zero configuration
- Automatic optimizations
- Free tier is generous
- Fast global CDN
- Easy custom domains

