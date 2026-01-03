# Add New Product — Admin UI (Next.js)

This project implements an **Add New Product admin page** based on the provided Figma design.  
The focus is on **real-world form UX, validation, and state management** using modern frontend tools.

---

## 🔗 Figma Design

Design reference used for this implementation:

https://www.figma.com/design/zseMQCcDXvA55nVZOiQMWI/PSZ-Admin-Flow

The Figma file is embedded in the app as a **toggleable reference** in the header so it does not affect the actual UI layout.

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod (form validation)
- next/image
- Sonner (toast notifications)

No backend or database is used.

---

## ✨ Features

### Layout
- Desktop: Left main form + right product organization panel
- Mobile: Stacked layout
- Responsive sidebar with mobile drawer

### Product Form
- Title (required, max 150 characters)
- Category → Sub-category (dependent dropdowns, mocked data)
- Description textarea (supports new lines and bullets)
- Product images:
  - Multiple upload (minimum 1)
  - JPG / PNG / WebP only
  - Max size 5MB
  - Client-side preview and remove option

### Pricing
- MRP
- Offer %
- Selling Price
- Auto-calculation:
  - Selling Price updates from MRP and Offer %
  - Editing Selling Price recalculates Offer %

### Variants
- Placeholder UI
- Add variant name and options
- No SKU matrix (intentionally out of scope)

### Product Organization
- Brand / Manufacturer
- Warranty
- Seller Name
- Tags (chip input)
- Material & Care
- Product Weight (value + unit)
- Stock Quantity

---

## ✅ Validation & UX

- Zod-based client-side validation
- Inline error messages
- Save button disabled until form is valid
- Keyboard accessible inputs and actions

---

## 💾 Save & Cancel

- **Save**
  - Stores product data in `localStorage`
  - Shows success toast
- **Cancel**
  - Navigates back to previous page

---

## 📦 What Is Mocked

- Category and sub-category data
- Image uploads (no server upload)
- Data persistence using `localStorage`

---

## ❌ Out of Scope

- Backend APIs
- Authentication
- SKU-level inventory
- Database integration

---

## 🧩 Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <project-folder>
npm install
