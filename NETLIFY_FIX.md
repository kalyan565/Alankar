# Fixing Netlify 404 Error

## Steps to Fix:

### 1. Update Netlify Build Settings

Go to your Netlify dashboard:
1. Click on your site: **starlit-youtiao-cf9141**
2. Go to **Site settings** → **Build & deploy** → **Build settings**
3. Update the following:

   **Build command:**
   ```
   npm run build
   ```

   **Publish directory:**
   ```
   .next
   ```

### 2. Install Netlify Next.js Plugin

The `netlify.toml` file has been created. Now you need to:

**Option A: Redeploy from Git (if connected)**
- Push the updated files to your repository
- Netlify will automatically redeploy

**Option B: Redeploy manually**
1. In Netlify dashboard, go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Or drag and drop your updated `shop` folder again

### 3. Alternative: Use Netlify's Next.js Runtime

If the above doesn't work, try this in Netlify dashboard:

1. Go to **Site settings** → **Build & deploy** → **Build settings**
2. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
3. Go to **Plugins** section
4. Click **Add plugin** → Search for **"Next.js"**
5. Install **"Essential Next.js Plugin"**

### 4. Check Build Logs

After redeploying:
1. Go to **Deploys** tab
2. Click on the latest deployment
3. Check the build logs for any errors
4. Make sure the build completes successfully

### 5. Clear Cache and Redeploy

If still having issues:
1. Go to **Site settings** → **Build & deploy** → **Build settings**
2. Click **Clear cache and retry deploy**
3. Wait for the new deployment

## Quick Fix Commands (if using Netlify CLI):

```bash
cd C:\shop
npm install
netlify deploy --prod
```

## Expected Result:

After redeploying, your site should work at:
**https://starlit-youtiao-cf9141.netlify.app/**

The homepage should load correctly showing your Alankar Cosmetics website.

