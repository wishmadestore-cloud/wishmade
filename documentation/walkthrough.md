# WishMade Upgrade Walkthrough

I have successfully upgraded the WishMade application to a full-stack e-commerce site with a premium design, User Authentication, and a **completely separate Admin Dashboard**.

## Changes Made

### Separate Admin Dashboard [NEW]
- **Isolated App**: Created `admin-panel`, a standalone React application.
- **Dedicated Port**: Runs on port `5173` (e.g., `http://localhost:5173`), keeping it physically separate from the store.
- **Features**: Includes all order management, searching, and filtering features.
- **Security**: Removed all admin code and links from the main store (`localhost:3000`).

### Live Deployment
- **Store URL**: [wishmade-store.vercel.app](https://wishmade-store.vercel.app)
- **Admin Panel**: [wishmade-admin.vercel.app](https://wishmade-admin.vercel.app)
- **Backend API**: [wishmade.onrender.com](https://wishmade.onrender.com)

### Admin Panel (Management)
- **URL**: `http://localhost:5173`
- **Purpose**: Staff view to manage orders and see customer details.
- **UI**: Modern Glassmorphism design with secure login.

- **Key Features**: Sortable table, Order filtering, Status management.
- **New Features**: Full Customer Address, Product Sizes, thumbnails.

![Admin Panel with Images](/Users/tssha/.gemini/antigravity/brain/4294acdf-70a6-499b-8e70-6b802d2f2b22/admin_panel_proof.png)

### User Authentication
- **Secure Accounts**: Users can now **Register** and **Login**.
- **Profile Page**: A personal dashboard (`/profile`) showing user details.
- **Address Autofill**: Checkout form automatically fills from profile data.

### Email Notifications
- **Trigger**: Order Placement (`POST /api/orders`)
- **Technology**: Nodemailer
- **Content**: HTML receipt with product thumbnails and total.
- **Personalized Header**: "Hi, [Name]" greeting.

### Backend
- **CORS Update**: Configured to allow connections from both the Store (3000) and Admin Panel (5173).
- **APIs**: Serves both applications seamlessly.

## How to Run

### 1. Database (Start this first!) [NEW]
You must start the database manually before the backend.
```bash
./database/start_db.sh
```
*Keep this terminal window open.*

### 2. Backend (Data & API)
```bash
cd backend
npm run dev
# Runs on http://localhost:5001
```

### 2. Store (Customer Site)
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

### 3. Admin Panel (Management)
```bash
cd admin-panel
npm run dev
# Runs on http://localhost:5173
```

## Setup for Admin Panel
If you haven't already:
1.  Navigate to the folder: `cd admin-panel`
2.  Install dependencies: `npm install`
3.  Start it: `npm run dev`

## Key Files
- [admin-panel/src/App.jsx](file:///Users/tssha/Documents/wishmade/admin-panel/src/App.jsx): The new Admin Dashboard logic.
- [frontend/src/App.js](file:///Users/tssha/Documents/wishmade/frontend/src/App.js): Cleaned up main store app.
