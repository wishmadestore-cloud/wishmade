# E-commerce Website Development

## Project Audit
- [/] Analyze frontend `package.json` to identify tech stack <!-- id: 1 -->
- [/] Read frontend `README.md` for project context <!-- id: 2 -->
- [/] Check frontend `src` structure <!-- id: 3 -->
- [ ] Determine backend requirements (currently empty) <!-- id: 4 -->

## Planning
- [x] Define technology stack (Frontend + Backend) <!-- id: 5 -->
- [x] Create `implementation_plan.md` <!-- id: 6 -->

## Implementation
- [x] Setup backend (TBD) <!-- id: 7 -->
- [x] Enhance frontend design and functionality <!-- id: 8 -->
- [x] Integrate frontend and backend <!-- id: 9 -->
- [x] Build Admin Dashboard for viewing orders <!-- id: 11 -->
- [x] Improve Admin Page Accessibility (A11y + Navigation) <!-- id: 12 -->
- [x] Implement Product Details Page with Size Selection <!-- id: 13 -->

## User Authentication
- [x] Backend: User registration and login endpoints (JWT/bcrypt) <!-- id: 14 -->
- [x] Frontend: Login and Register pages <!-- id: 15 -->
- [x] Frontend: Auth Context for managing user state <!-- id: 16 -->
- [x] Frontend: User Profile/Order History page <!-- id: 17 -->
- [x] UI: Polish Profile page and Navbar user menu <!-- id: 18 -->
- [x] UI: Remove Admin Access link from Footer <!-- id: 19 -->

## Standalone Admin Dashboard
- [x] Scaffold new React app `admin-panel` <!-- id: 20 -->
- [x] Migrate `AdminPage` logic to new app <!-- id: 21 -->
- [x] Backend: Configure CORS for new admin port <!-- id: 22 -->
- [x] Cleanup: Remove Admin code from main Store frontend <!-- id: 23 -->

## Database Migration (MongoDB)
- [x] Backend: Install Mongoose & Dotenv <!-- id: 24 -->
- [x] Backend: Create Mongoose Models (User, Product, Order) <!-- id: 25 -->
- [x] Backend: Connect to MongoDB <!-- id: 26 -->
    - [x] Setup: Download and run local MongoDB in `wishmade/database` <!-- id: 29 -->
- [x] Backend: Refactor endpoints to use Database <!-- id: 27 -->
- [x] Backend: Seed initial products <!-- id: 28 -->

## Verification
- [x] Verify end-to-end flow <!-- id: 10 -->
- [x] Debug: Restart backend to fix connection issues <!-- id: 30 -->

## Features
- [x] Backend: Update User model with address fields <!-- id: 31 -->
- [x] Backend: Add endpoint to update user profile <!-- id: 32 -->
- [x] Frontend: Autofill Checkout form from User Context <!-- id: 33 -->
- [x] Frontend: Save address to profile on Checkout submit <!-- id: 34 -->

## Admin Enhancements
- [x] Admin: Display full Customer Address (Street, City, Zip) <!-- id: 35 -->
- [x] Admin: Display full Customer Address (Street, City, Zip) <!-- id: 35 -->
- [x] Admin: Show detailed Product info in order list <!-- id: 36 -->
- [x] Admin: Show Product Image in order list <!-- id: 37 -->

## Debugging
- [x] Fix Admin Page rendering crash <!-- id: 38 -->

## Deployment Preparation
- [x] Create Deployment Guide <!-- id: 39 -->
- [x] Backend: Configure for Production (CORS, Env Vars) <!-- id: 40 -->
- [x] Frontend: Configure API URL for Production <!-- id: 41 -->

## Email Notifications
- [x] Backend: Install `nodemailer` <!-- id: 42 -->
- [x] Backend: Create `sendEmail` utility (Ethereal for Dev) <!-- id: 43 -->
- [x] Backend: Send confirmation email on Order Creation <!-- id: 44 -->
- [x] Backend: Enhance Email with Date, Time, and Product Images <!-- id: 45 -->

## Admin Authentication
- [x] Backend: Create `admin` middleware (require `isAdmin`) <!-- id: 46 -->
- [x] Backend: Protect `/api/orders` with admin middleware <!-- id: 47 -->
- [x] Database: Create Admin User script (`create_admin.js`) <!-- id: 48 -->
- [x] Admin Panel: Create Login Page <!-- id: 49 -->
- [x] Admin Panel: Implement Auth Flow (Login -> Token -> Fetch) <!-- id: 50 -->

## Live Launch (External Steps)
- [x] Database: Setup MongoDB Atlas Cluster <!-- id: 51 -->
- [x] Database: Get Connection String (MONGO_URI) <!-- id: 52 -->
- [x] Backend: Deploy to Render <!-- id: 53 -->
- [x] Backend: Set Environment Variables on Render <!-- id: 54 -->
- [x] Frontend: Deploy Store to Vercel <!-- id: 55 -->
- [x] Frontend: Deploy Admin Panel to Vercel <!-- id: 56 -->

## Admin UI Improvements
- [x] Design: Modernize Login Page UI (Glassmorphism/Gradient) <!-- id: 57 -->
- [x] Feature: Add specific error messages <!-- id: 58 -->
- [x] Feature: Add loading state to login button <!-- id: 59 -->
