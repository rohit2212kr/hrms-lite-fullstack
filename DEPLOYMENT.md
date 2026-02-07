# HRMS Lite Deployment Guide

## Project Structure
This is a monorepo with separate frontend and backend folders.

## Deployment Options

### Option 1: Deploy Frontend and Backend Separately (Recommended)

#### Deploy Backend to Vercel:
1. Create a new Vercel project
2. Set Root Directory to: `backend`
3. Build Command: (leave empty)
4. Output Directory: (leave empty)
5. Install Command: `npm install`
6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 5000

#### Deploy Frontend to Vercel:
1. Create another Vercel project
2. Set Root Directory to: `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Install Command: `npm install`
6. Update `frontend/src/App.jsx` to use your backend URL instead of `/api`

### Option 2: Deploy as Monorepo

Create `vercel.json` in root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ]
}
```

Add to `frontend/package.json` scripts:
```json
"vercel-build": "npm run build"
```

### Option 3: Deploy Backend to Render/Railway

1. Deploy backend to Render.com or Railway.app
2. Deploy frontend to Vercel/Netlify
3. Update frontend API calls to point to backend URL

## Environment Variables

### Backend (.env):
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend:
Update axios base URL in `src/App.jsx` if deploying separately:
```javascript
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000'
```

## Quick Fix for Current Error

The error you're seeing is because Vercel is trying to build from root. 

**Solution:**
1. In Vercel dashboard, go to Project Settings
2. Under "Build & Development Settings":
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

This will deploy only the frontend. Deploy backend separately.
