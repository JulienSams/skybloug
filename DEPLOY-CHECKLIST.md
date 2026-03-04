# 🚀 Quick Deployment Checklist

## Before Deploying

- [ ] Code is pushed to GitHub
- [ ] `multer` is installed in server/package.json
- [ ] Backend has `render.yaml` configured
- [ ] Frontend has `render.yaml` configured
- [ ] CORS is configured for `.onrender.com` domains

## On Render.com

### 1. Create PostgreSQL Database (5 min)
- [ ] Go to dashboard.render.com
- [ ] Click "New +" → "PostgreSQL"
- [ ] Name: `skyblog-db`
- [ ] Plan: **Free**
- [ ] Region: Frankfurt (or closest to you)
- [ ] Click "Create Database"
- [ ] **Copy the Internal Database URL** (starts with `postgresql://`)

### 2. Deploy Backend (10 min)
- [ ] Click "New +" → "Web Service"
- [ ] Connect your GitHub repo
- [ ] Name: `skyblog-backend`
- [ ] Root Directory: `server`
- [ ] Environment: Node
- [ ] Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
- [ ] Start Command: `npm start`
- [ ] Plan: **Free**
- [ ] Add Environment Variable:
  - `DATABASE_URL` = [paste the Internal Database URL]
  - `NODE_ENV` = `production`
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (~5-10 min)
- [ ] **Copy the backend URL** (e.g., `https://skyblog-backend.onrender.com`)

### 3. Deploy Frontend (5 min)
- [ ] Click "New +" → "Static Site"
- [ ] Connect same GitHub repo
- [ ] Name: `skyblog-frontend`
- [ ] Root Directory: `.` (leave empty for root)
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`
- [ ] Add Environment Variable:
  - `VITE_API_URL` = `https://skyblog-backend.onrender.com/api`
- [ ] Click "Create Static Site"
- [ ] Wait for build (~3-5 min)

### 4. Test Deployment
- [ ] Open frontend URL (e.g., `https://skyblog-frontend.onrender.com`)
- [ ] ⚠️ First load takes ~30s (backend waking up)
- [ ] Check profile loads
- [ ] Test creating an article
- [ ] Test kiffing an article
- [ ] Test adding a comment

## 🎉 Success!

Your Skyblog is live at:
- **Frontend:** https://skyblog-frontend.onrender.com
- **Backend:** https://skyblog-backend.onrender.com/api
- **Database:** PostgreSQL on Render (Free - expires in 90 days)

## ⚠️ Important Notes

1. **Backend Sleep:** Free tier sleeps after 15 min. First request takes ~30s.
2. **Database Expiry:** Free PostgreSQL expires after 90 days. Backup your data!
3. **Images:** Uploaded images are ephemeral. Consider Cloudinary for production.
4. **Custom Domain:** You can add your own domain in Settings → Custom Domains

## 💰 Costs

- **Current:** $0/month (100% free)
- **Upgrade Options:**
  - Backend always-on: $7/month
  - Permanent database: $7/month
  - Total with upgrades: $14/month

## 🔄 Auto-Deploy

Render automatically deploys when you push to `main` branch.

To deploy changes:
```bash
git add .
git commit -m "your changes"
git push origin main
```

Render will detect the push and redeploy automatically!

## 📚 Full Documentation

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions and troubleshooting.
