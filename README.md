# QuickBill Restaurant POS 🍽️

A full-stack, feature-rich **Point of Sale (POS) system** for restaurants. Built with a React + TypeScript frontend and a Node.js + Express + MongoDB backend.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | JWT-based login with role-based access (Admin / Staff) |
| 🍕 **Menu Management** | Add, edit, delete items with multiple price variants |
| 🛒 **Order Processing** | Build orders, select variants, track quantities |
| 💳 **Payment Methods** | Cash, UPI, Card — with per-order currency selection |
| 🧾 **Bill Printing** | Thermal-style receipt (57mm) with print-optimized CSS |
| 📦 **Past Orders** | Filterable order history with CSV export |
| 🌍 **Multi-Currency** | INR, USD, EUR, GBP support with live rate conversion |
| 🌙 **Dark Mode** | System-aware + user-togglable dark theme |
| 👑 **Admin Panel** | Dashboard, user management, logs, and full order visibility |
| 📊 **Server-side Pagination** | All lists use efficient backend pagination + search + sort |
| 📝 **Activity Logging** | Client-side events logged to backend (fire-and-forget) |

---

## 🏗️ Tech Stack

### Frontend
- **React 19** (TypeScript)
- **Vite 6** — dev server & bundler
- **Tailwind CSS** (CDN) — styling
- **Google Fonts** (Inter)

### Backend
- **Node.js** + **Express 4**
- **MongoDB** (Atlas) via **Mongoose 8**
- **JWT** (jsonwebtoken) — authentication
- **bcryptjs** — password hashing
- **nodemon** — development auto-restart

---

## 📁 Project Structure

```
quickbill-restaurant-pos/
├── index.html              # App entry point (Vite)
├── index.tsx               # React root with AuthProvider + ErrorBoundary
├── App.tsx                 # Main application shell
├── types.ts                # Shared TypeScript interfaces
├── constants.ts            # CURRENCIES, DEFAULT_TAX_RATE, ORDERS_PER_PAGE
├── vite.config.ts          # Vite config with /api proxy to :5000
│
├── components/
│   ├── Login.tsx           # Login form
│   ├── Header.tsx          # Nav, theme toggle, logout, currency
│   ├── MenuList.tsx        # Paginated menu with search, sort, card/table views
│   ├── MenuItem.tsx        # Individual menu card component
│   ├── OrderSummary.tsx    # Live order cart with tax toggle
│   ├── AddItemModal.tsx    # Create menu item form
│   ├── EditItemModal.tsx   # Edit menu item name/variants
│   ├── BillModal.tsx       # Printable bill/receipt
│   ├── PaymentModal.tsx    # Payment method selection
│   ├── PastOrders.tsx      # Order history with filters + CSV export
│   ├── PastOrderDetailModal.tsx # View a past order's receipt
│   ├── ProfileModal.tsx    # Restaurant profile settings
│   ├── Notification.tsx    # Toast notification system
│   ├── ErrorBoundary.tsx   # React error boundary
│   └── admin/
│       ├── AdminDashboard.tsx  # Stats overview
│       ├── AdminMenu.tsx       # All users' menu items
│       ├── AdminOrders.tsx     # All users' orders
│       ├── AdminUsers.tsx      # User management
│       ├── AdminLogs.tsx       # Activity log viewer
│       └── ResetPasswordModal.tsx
│
├── context/
│   └── AuthContext.tsx     # Auth state, login/logout, localStorage persistence
│
├── services/
│   ├── api.ts              # Typed fetch wrapper (GET/POST/PUT/DELETE) with token
│   └── logger.ts           # Fire-and-forget client-side logger → backend
│
└── backend/
    ├── server.js           # Express app, CORS, routes, seeding
    ├── .env                # Environment variables (not committed)
    ├── config/
    │   └── db.js           # MongoDB connection
    ├── middleware/
    │   └── auth.js         # protect + authorize middleware
    ├── models/
    │   ├── user.js         # User schema (bcrypt hash, JWT generation)
    │   ├── menuItem.js     # MenuItem schema (variants array)
    │   ├── order.js        # Order schema
    │   ├── profile.js      # Restaurant profile schema
    │   └── log.js          # Activity log schema
    └── routes/
        ├── auth.js         # POST /api/auth/login
        ├── menu.js         # CRUD /api/menu (paginated, search, sort)
        ├── orders.js       # GET + POST /api/orders (paginated, filtered)
        ├── profile.js      # GET + PUT /api/profile
        ├── logs.js         # POST /api/logs
        └── admin.js        # Admin-only dashboard, users, orders, menu, logs
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ and **npm**
- A **MongoDB Atlas** account (or local MongoDB instance)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd quickbill-restaurant-pos
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/quickbill?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=1d
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=yourSecureAdminPassword
```

> **⚠️ Important:** Never commit your `.env` file. It is excluded by `.gitignore`.

Start the backend dev server:

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected: <your-host>
```

The **admin user is seeded automatically** on first startup using `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env`. If no env values are set, it falls back to `admin / admin`.

### 3. Frontend Setup

Open a **new terminal** in the project root:

```bash
cd quickbill-restaurant-pos   # project root (not backend/)
npm install
npm run dev
```

The app opens at **http://localhost:5173**

The Vite dev server proxies all `/api/*` requests to `http://localhost:5000`, so no CORS configuration is needed during development.

---

## 🔑 Roles & Permissions

| Action | Admin | Staff |
|---|---|---|
| Login | ✅ | ✅ |
| View Menu | ✅ | ✅ |
| Add Menu Item | ✅ | ✅ |
| Edit/Delete Item | ✅ | ✅ |
| Place Order | ✅ | ✅ |
| View Own Orders | ✅ | ✅ |
| Update Profile | ✅ | ✅ |
| View Admin Panel | ✅ | ❌ |
| View All Users | ✅ | ❌ |
| Create Staff Users | ✅ | ❌ |
| Reset Staff Passwords | ✅ | ❌ |
| View All Orders (all users) | ✅ | ❌ |
| View All Menu Items (all users) | ✅ | ❌ |
| View Activity Logs | ✅ | ❌ |

---

## 📡 API Reference

All protected routes require the `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| `POST` | `/api/auth/login` | ❌ | `{ username, password }` | Login, returns `{ token, user }` |

### Menu (`/api/menu`)

| Method | Endpoint | Auth | Params / Body | Description |
|---|---|---|---|---|
| `GET` | `/api/menu` | ✅ | `?page&limit&search&sortBy&sortOrder` | Paginated menu items for logged-in user |
| `POST` | `/api/menu` | ✅ | `{ name, variants[], imageUrl }` | Add a new menu item |
| `PUT` | `/api/menu/:id` | ✅ | `{ name?, variants? }` | Update item name/variants |
| `DELETE` | `/api/menu/:id` | ✅ | — | Delete a single item |
| `POST` | `/api/menu/delete-many` | ✅ | `{ ids[] }` | Bulk delete items |

### Orders (`/api/orders`)

| Method | Endpoint | Auth | Params / Body | Description |
|---|---|---|---|---|
| `GET` | `/api/orders` | ✅ | `?page&limit&search&sortBy&sortOrder&paymentFilter&filterType&singleDate&dateStart&dateEnd` | Paginated orders for user |
| `GET` | `/api/orders/count` | ✅ | — | Total order count for user |
| `POST` | `/api/orders` | ✅ | `{ items, subtotal, tax, total, currency, paymentMethod, customer? }` | Create order |

### Profile (`/api/profile`)

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| `GET` | `/api/profile` | ✅ | — | Get or auto-create restaurant profile |
| `PUT` | `/api/profile` | ✅ | `{ restaurantName?, address?, phone?, logoUrl?, taxRate? }` | Update profile (upsert) |

### Logs (`/api/logs`)

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| `POST` | `/api/logs` | ✅ | `{ level, message, meta? }` | Record a client-side log entry |

### Admin (`/api/admin`) — Admin only

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/stats` | Dashboard stats (user count, revenue, recent orders) |
| `GET` | `/api/admin/users` | All users |
| `POST` | `/api/admin/users` | Create a staff user |
| `PUT` | `/api/admin/users/:id/reset-password` | Reset a staff user's password |
| `GET` | `/api/admin/orders` | All orders (optionally filtered by `?userId`) |
| `GET` | `/api/admin/menu` | All menu items (all users) |
| `POST` | `/api/admin/menu` | Add menu item for a specific user |
| `GET` | `/api/admin/logs` | Activity logs (optionally filtered by `?userId`) |

---

## 🐛 Known Bugs Fixed

| # | File | Bug | Fix Applied |
|---|---|---|---|
| 1 | `services/logger.ts` | Hardcoded `localhost:5000` — broken in production | Now uses same `import.meta.env.PROD` strategy as `api.ts` |
| 2 | `services/logger.ts` | Log requests had no Authorization header → 401 errors | Auth token now attached to every log request |
| 3 | `context/AuthContext.tsx` | Dead code referencing non-existent `api.__request` | Removed broken interceptor placeholder |
| 4 | `backend/models/user.js` | Missing `return` in `pre('save')` — double execution risk | Added `return next()` to halt execution when password unchanged |
| 5 | `backend/routes/admin.js` | POST /menu validated `price` field (doesn't exist in schema) | Now validates `variants[]` array correctly |
| 6 | `backend/routes/admin.js` | ValidationError response used `msg` key (inconsistent) | Changed to `message` to match all other routes |
| 7 | `index.html` | Broken `<importmap>` from AI Studio pointing to CDNs | Removed — Vite handles all module resolution |
| 8 | `components/Login.tsx` | Hardcoded test credentials visible in UI | Removed `Testing: test / test` hint |

---

## 🔒 Security Considerations

- JWT secrets **must** be set via `JWT_SECRET` env variable. A warning is logged on startup if missing.
- Passwords are hashed with **bcrypt** (10 salt rounds) before storage.
- The `password` field is excluded from all User queries by default (`select: false`).
- Admins cannot reset their own password via the admin panel (protected server-side).
- CORS is restricted to known origins in `server.js`.
- `.env` is excluded from git via `.gitignore`.

---

## 🛠️ Available Scripts

### Backend (`/backend`)
```bash
npm run dev     # Start with nodemon (auto-restart on changes)
npm start       # Start with plain node (production)
```

### Frontend (project root)
```bash
npm run dev     # Start Vite dev server at http://localhost:5173
npm run build   # Build for production (outputs to /dist)
npm run preview # Preview production build locally
```

---

## 🌐 Deployment Notes

- **Frontend** is deployable to Vercel/Netlify. Update the production API URL in `services/api.ts` and `services/logger.ts` (`import.meta.env.PROD` branch).
- **Backend** is deployable to Render/Railway/Fly.io. Set all `.env` variables as environment secrets.
- Update the CORS `origin` array in `backend/server.js` with your production frontend URL.

---

## 📄 License

ISC © QuickBill Restaurant POS
