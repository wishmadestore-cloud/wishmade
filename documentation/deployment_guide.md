# Deployment Guide: WishMade E-commerce

Yes, you can host your entire E-commerce platform for **$0/month**!

Here is the "Free Stack" strategy verified for your project:

## 1. The Strategy

| Component | Service | Cost | Why? |
| :--- | :--- | :--- | :--- |
| **Database** | **MongoDB Atlas** | Free | Official cloud hosting for MongoDB. Secure and reliable. |
| **Backend** | **Render.com** (or Railway) | Free | Excellent support for Node.js APIs. |
| **Frontend** | **Vercel** (or Netlify) | Free | The standard for hosting React apps. Fast and simple. |

---

## 2. Step-by-Step Plan

### Phase 0: Push to GitHub
1.  Initialize Git: `git init` (I have done this for you).
2.  Create a new repository on [GitHub.com](https://github.com/new).
3.  Link your local code to GitHub:
    ```bash
    git remote add origin https://github.com/TSSHA07/wishmade.git
    git branch -M main
    git push -u origin main
    ```

### Phase 1: Database (MongoDB Atlas)
1.  Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a new free **Cluster**.
3.  Create a **Database User** (username/password).
4.  Get the **Connection String** (looks like `mongodb+srv://...`).
    *   *We will replace your local `MONGO_URI` with this cloud one.*

### Phase 2: Backend (Render)
1.  Push your code to **GitHub**.
2.  Connect your repo to **Render**.
3.  Set Environment Variables on Render:
    *   `MONGO_URI`: (The string from Phase 1)
    *   `JWT_SECRET`: (IMPORTANT: Key for securing logins. Generate a random string.)
    *   `NODE_ENV`: `production`

### Phase 3: Frontend (Vercel)
1.  Connect your same GitHub repo to **Vercel**.
2.  Deploy the `frontend` folder.
3.  Set Environment Variable:
    *   `REACT_APP_API_URL`: The URL of your live Backend (from Phase 2).
4.  Deploy the `admin-panel` folder (as a separate project).
    *   `VITE_API_URL`: The URL of your live Backend.

---

## 3. Preparation Checklist (I can do this now)
Before we deploy, I need to make sure the code is "Production Ready":

- [ ] **Backend**: Ensure it uses `process.env.PORT` (Done).
- [ ] **Backend**: Update CORS to allow the new Vercel domains.
- [ ] **Frontend**: Ensure API URLs are dynamic (not hardcoded to `localhost`).
- [ ] **Admin**: Ensure API URLs are dynamic.

**Shall I proceed with these "Production Ready" preparations?**

## 4. How to Update Your Website
Now that you are live, updating is easy! Vercel and Render are "watching" your GitHub.

1.  **Edit the code** on your computer (like normal).
2.  **Save** your changes.
3.  **Push to GitHub**:
    ```bash
    git add .
    git commit -m "Description of changes"
    git push
    ```
4.  **Wait 2 minutes.** Vercel and Render will see the new code and **automatically update** your live website. You don't need to do anything else!
