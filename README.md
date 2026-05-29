# 🍫 The Bittersweet Co. — Luxury Artisan Bakery Storefront

Welcome to **The Bittersweet Co.**, a production-grade, premium storefront designed for a high-end artisan bakery. Built with a modern, motion-first user experience and a warm glassmorphic aesthetic, the site is designed to wow visitors and turn cravings into orders.

---

## ✨ Features

- **🛍️ Complete Storefront & Menu**: Browse handcrafted brownies, cookies, and gourmet gift boxes with intuitive category filtering and a responsive details modal.
- **🛒 Persistent Cart**: An elegant slide-out cart powered by a custom Zustand store, fully synced across page refreshes.
- **🧾 Multi-Step COD Checkout**: A seamless step-by-step Cash On Delivery checkout flow, including flat coupon code validation (e.g., `SWEET20`).
- **🚚 Live Order Tracking**: Beautiful timeline status tracking (`Received` ➔ `Baking` ➔ `Out for Delivery` ➔ `Delivered`) accompanied by a festive confetti-reveal upon checkout success.
- **👑 Admin Dashboard**: A comprehensive, secure backoffice for bakery owners:
  - **Orders**: View, process, and transition order statuses with direct database updates.
  - **Products**: Complete CRUD suite for products, pricing (INR), stock control, and categories.
  - **Customers**: Review client histories, order counts, and contact records.
  - **Coupons**: Manage active discount codes.
- **✉️ Transactional Emails**: Fully integrated Resend templates for order confirmations, delivery updates, and completion emails.
- **📱 Fully Responsive Design**: Seamless optimization for mobile, featuring a persistent floating Order Bar and slide-out navigation.

---

## 🎨 Brand Design System

Built on custom-curated warm tones and fluid animations:
- **Cream** (`#F8F2E8`): Warm cream background.
- **Beige** (`#E8DDCF`): Soft contrast.
- **Chocolate** (`#5B3A29`): Rich mid-tones.
- **Cocoa** (`#2F1B12`): Elegant dark slate and text.
- **Gold** (`#C8B38A`): Light luxury shimmer accents.
- **Typography**: Playfair Display (Luxury Serif Headings), Inter (Clean Body), and Poppins (Dynamic Buttons).

---

## 🚀 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (Full-stack React with server functions & layout routing)
- **Runtime & UI**: React 19 & TypeScript
- **Database / Auth**: Supabase (PostgreSQL with Row-Level Security)
- **Styling**: Tailwind CSS v4 & Framer Motion
- **State Management**: Zustand
- **Emails**: Resend API

---

## 🛠️ Local Development

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) (v18+) installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of the project and populate it with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
```

### 4. Seed Database
Run the schema setup and data seed migrations inside your Supabase SQL editor using the scripts provided in `supabase/migrations/` or schema documentation.

### 5. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the bakery.

---

## 📦 Production Build
To build and check the production assets:
```bash
npm run build
npm run start
```

---

*Baked with love and premium code. 🥐*
