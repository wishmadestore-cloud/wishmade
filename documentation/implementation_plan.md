# Database Setup (MongoDB)

## Goal Description
Migrate from local JSON files (`orders.json`, `users.json`) to a MongoDB database to ensure data persistence for a production environment.

## User Review Required
> [!IMPORTANT]
> You will need a **MongoDB Connection String**. I will set up the code to look for it in a `.env` file. You can get a free database from [MongoDB Atlas](https://www.mongodb.com/atlas/database).

## Proposed Changes

### Backend [MODIFY]
- **Dependencies**: Install `mongoose` (ORM) and `dotenv` (Environment variables).

#### [NEW] [backend/.env](file:///Users/tssha/Documents/wishmade/backend/.env)
- Store `MONGO_URI` and `JWT_SECRET`.

#### [NEW] [backend/config/db.js](file:///Users/tssha/Documents/wishmade/backend/config/db.js)
- Logic to connect to the database.

#### [NEW] [backend/models/User.js](file:///Users/tssha/Documents/wishmade/backend/models/User.js)
- Schema: Name, Email, Password, IsAdmin.

#### [NEW] [backend/models/Product.js](file:///Users/tssha/Documents/wishmade/backend/models/Product.js)
- Schema: Name, Price, Category, Image, Description, Sizes.

#### [NEW] [backend/models/Order.js](file:///Users/tssha/Documents/wishmade/backend/models/Order.js)
- Schema: Customer (Object), Items (Array), Total, Status, Date.

#### [MODIFY] [backend/server.js](file:///Users/tssha/Documents/wishmade/backend/server.js)
- Replace all `fs.readFileSync` and `fs.writeFileSync` calls with:
    - `User.findOne()`, `User.create()`
    - `Product.find()`
    - `Order.find()`, `Order.create()`

#### [NEW] [backend/seed.js](file:///Users/tssha/Documents/wishmade/backend/seed.js)
- A one-time script to populate your new database with the existing products from `products.json`.

## Verification Plan

### Manual Verification
1.  **Connect**: Ensure backend connects to Mongo without error.
2.  **Seed**: Run `node seed.js` and verify products appear.
3.  **Flow**: Register a new user (saves to DB), Place an order (saves to DB), Check Admin Panel (fetches from DB).

## Email Notifications (Nodemailer)

### Goal
Send an automated email receipt to the customer immediately after they place an order.

### Implementation
1.  **Library**: `nodemailer`
2.  **Transport**:
    *   **Development**: [Ethereal Email](https://ethereal.email/) (Fake SMTP service that catches emails so you can preview them via a URL).
    *   **Production**: Gmail or SendGrid (Configurable via `.env`).

### Changes
#### [MODIFY] [backend/package.json](file:///Users/tssha/Documents/wishmade/backend/package.json)
- Add `nodemailer`.

#### [NEW] [backend/utils/sendEmail.js](file:///Users/tssha/Documents/wishmade/backend/utils/sendEmail.js)
- Helper function to create transporter and send mail.

#### [MODIFY] [backend/server.js](file:///Users/tssha/Documents/wishmade/backend/server.js)
- Import `sendEmail`.
- Call `sendEmail` inside the `POST /api/orders` route.
- HTML Email Template: Simple table with order items and total.

## Admin Authentiction

### Goal
Restrict the Admin Panel and Order API to authorized "Admin" users only.

### Implementation
1.  **Backend Middleware**:
    *   `protect`: Verifies JWT token (already exists).
    *   `admin`: middleware to check if `req.user.isAdmin === true`.
2.  **Protect Routes**:
    *   Apply `protect` and `admin` to `GET /api/orders`.
3.  **Admin User**:
    *   Create a script to seed an initial admin user (e.g., `admin@wishmade.com` / `admin123`).
4.  **Admin Client**:
    *   Add `LoginPage.jsx`.
    *   On load, check if token exists. If not, show Login.
    *   On Login, POST to request token, save to localStorage.
    *   Include token in API calls to `fetchOrders`.

## Admin UI Improvements

### Goal
Modernize the Admin Login page to look professional and provide better user feedback.

### Implementation
#### [MODIFY] [admin-panel/src/LoginPage.jsx](file:///Users/tssha/Documents/wishmade/admin-panel/src/LoginPage.jsx)
1.  **Glassmorphism Container**:
    *   Wrapper background: Linear Gradient (Black/White or Purple/Blue accents based on brand).
    *   Card: `backdrop-filter: blur(10px)`, slight transparency, thin white border.
2.  **Input Fields**:
    *   Add icons (via SVG or `lucide-react` if available, or simple unicode).
    *   Focus states with glow effect.
3.  **Loading State**:
    *   Disable button during API call.
    *   Change text to "Logging in..." or show spinner.
4.  **Error Handling**:
    *   Shake animation on error.
    *   Clearer error text (red pill/alert style).

