# Quick Fix for Vercel Deployment Error

## The Problem
Vercel is trying to build from the root directory, but your project has `frontend` and `backend` folders.

## Immediate Solution

### Step 1: Configure Vercel Project Settings

In your Vercel dashboard:

1. Go to **Project Settings** → **General**
2. Set **Root Directory** to: `frontend`
3. Click **Save**

### Step 2: Configure Build Settings

In **Build & Development Settings**:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Redeploy

Click "Redeploy" and it should work!

## For Backend Deployment

Your backend needs to be deployed separately. Options:

### Option A: Deploy Backend to Vercel (Separate Project)

1. Create a NEW Vercel project
2. Connect the same GitHub repo
3. Set **Root Directory** to: `backend`
4. **Build Command**: (leave empty)
5. **Output Directory**: (leave empty)
6. Add Environment Variable: `MONGODB_URI`

### Option B: Deploy Backend to Render.com

1. Go to render.com
2. Create New → Web Service
3. Connect your GitHub repo
4. **Root Directory**: `backend`
5. **Build Command**: `npm install`
6. **Start Command**: `npm start`
7. Add Environment Variable: `MONGODB_URI`

## Update Frontend to Use Backend URL

Once backend is deployed, update `frontend/src/App.jsx`:

Replace:
```javascript
const response = await axios.get('/api/employees')
```

With:
```javascript
const API_URL = 'https://your-backend-url.vercel.app'
const response = await axios.get(`${API_URL}/api/employees`)
```

Do this for all API calls in App.jsx.

## Alternative: Use Environment Variable

1. Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

2. Update `frontend/src/App.jsx`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || ''

// Then use it in all API calls:
const response = await axios.get(`${API_URL}/api/employees`)
```

This way you can keep different URLs for development and production.
