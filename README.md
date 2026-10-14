# 🏛️ Borgholm — Creative Agency & Architecture Studio

A high-end, luxury full-stack web platform designed for contemporary creative agencies, architectural studios, and digital ventures. Featuring a Scandinavian-inspired aesthetic, client management portal, and a resilient PostgreSQL backend.

---

## ✨ Features

- **🎨 Scandinavian Design Aesthetic:** Minimalist layouts, smooth transitions, and responsive typography.
- **🧭 Multi-Page Experience:**
  - **Showcase & Hero:** Dynamic editorial carousel and project highlights.
  - **Selected Works / Portfolio:** Interactive filterable gallery.
  - **Journal & Editorial:** Thought leadership articles and insights.
  - **Editions & Shop:** Curated merchandise and design assets.
- **🔐 Client Authentication & Portal:** JWT-based user login, registration, and private client dashboard.
- **📩 Interactive Inquiries:** "Say Hello" contact drawer syncing directly to PostgreSQL.
- **📊 Admin Inspector:** Real-time visual inspector for incoming inquiries and database records.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Styling:** Modular CSS with Scandinavian Minimalist Design System

### Backend
- **Runtime:** Node.js
- **Server:** Express.js (REST API on Port 5000)
- **Database:** PostgreSQL 18
- **Auth:** JSON Web Tokens (JWT) & Bcrypt

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm / npm
- PostgreSQL (running on port 5432)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MOHAMEDASHIK54/Borgholm-OFFICE-SITE.git
   cd Borgholm-OFFICE-SITE
   ```

2. **Run Frontend (React + Vite):**
   ```bash
   pnpm dev
   ```
   *Frontend will launch at `http://localhost:5173`*

3. **Run Backend (Express + PostgreSQL):**
   ```bash
   pnpm dev:backend
   ```
   *Backend will launch at `http://localhost:5000`*

---

## 📁 Project Structure

```text
Borgholm/
├── backend/
│   ├── routes/          # Express API routes (auth, inquiries, orders, etc.)
│   ├── db.js            # PostgreSQL connection pool & schema migrations
│   ├── index.js         # Express server entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/       # React page views (Main, Portfolio, Blog, Admin, etc.)
    │   ├── components/  # Header, Footer, Drawers, Modals
    │   ├── context/     # App State Management
    │   └── data/        # Seed & mock content
    └── package.json
```

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
