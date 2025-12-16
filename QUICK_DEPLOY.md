# Quick Deploy to Vercel - Simple Steps

## Step 1: Login to Vercel
Open your terminal/command prompt and run:
```bash
cd C:\shop
vercel login
```
- This will open your browser
- Sign in with GitHub, GitLab, or Email
- Return to terminal when done

## Step 2: Deploy
Run:
```bash
vercel
```

## Step 3: Follow Prompts
When asked:
- **Set up and deploy?** → Type `Y` and press Enter
- **Which scope?** → Select your account (press Enter)
- **Link to existing project?** → Type `N` and press Enter
- **Project name?** → Press Enter (uses default) or type a name
- **Directory?** → Press Enter (uses current directory)
- **Override settings?** → Type `N` and press Enter

## Step 4: Your Site is Live!
Vercel will give you a URL like:
`https://your-project-name.vercel.app`

Copy and open it in your browser!

---

## Alternative: Deploy via Web Dashboard

1. Go to: https://vercel.com
2. Sign up/Login
3. Click **Add New Project**
4. Drag and drop your `C:\shop` folder
5. Wait 2-3 minutes
6. Your site is live!

---

## Need Help?
If you get any errors, check:
- All files are in the `shop` folder
- `package.json` exists
- Images are in `public/images/products/` folder


