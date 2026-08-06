# 🍰 Bakery Shop

A modern **full-stack MERN Bakery E-Commerce application** built with a customer-first shopping experience and a complete admin management system. The application enables customers to browse bakery products, manage their cart, place orders securely, and track their purchases, while administrators can manage products, customers, and orders through a dedicated dashboard.

> 🔥 **Bakery shop (Live):** https://bakeriesshop.netlify.app/

---

# 📖 Table of Contents

* Overview
* Features
* Tech Stack
* Project Structure
* Installation
* Environment Variables
* Application Workflow
* Authentication & Authorization
* Customer Features
* Admin Features
* API Overview
* Future Improvements
* Author

---

# 🚀 Overview

Bakery Shop is a complete bakery e-commerce platform developed using the **MERN Stack**.

The project focuses on building a real-world shopping experience while following clean architecture, reusable components, secure authentication, and scalable backend practices.

The application includes:

* Customer storefront
* Shopping cart
* Order placement
* User profile management
* Role-based authentication
* Admin Dashboard
* Product Management
* Customer Management
* Order Management
* Cloudinary image uploads

---

# ✨ Features

## 👤 Customer Features

* User Registration
* Secure Login & Logout
* JWT Authentication
* HTTP-only Cookie Authentication
* Protected Routes
* Profile Management
* Update Name
* Update Phone Number
* Update Shipping Address
* Browse Products
* Product Search
* Category Filtering
* Product Sorting
* Product Detail Page
* Add to Cart
* Update Cart Quantity
* Remove Cart Items
* Checkout
* Shipping Address Validation
* Place Orders
* View Order History
* Responsive UI

---

## 👨‍💼 Admin Features

* Secure Admin Dashboard
* Protected Admin Routes
* Dashboard Statistics
* Product Management

  * Create Product
  * Edit Product
  * Delete Product
* Cloudinary Image Upload
* Customer Management

  * View Customers
  * Delete Customers
* Order Management

  * View Orders
  * Update Order Status
  * Pending
  * Confirmed
  * Preparing
  * Out for Delivery
  * Delivered
  * Cancelled

---

# 🛠 Tech Stack

## Frontend

* React
* React Router DOM
* React Hook Form
* Axios
* Context API
* CSS3
* React Icons

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cookie Parser
* Multer
* Cloudinary

---

## Database

* MongoDB Atlas / MongoDB

---

# 📂 Project Structure

```
bakery-ecom-shop
│
├── client
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── assets
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── server.js
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/waris-072/bakery-ecom-shop.git

cd bakery-ecom-shop
```

---

## Install Dependencies

### Frontend

```bash
cd client

npm install
```

---

### Backend

```bash
cd server

npm install
```

---

## Run Development Server

### Backend

```bash
npm run dev
```

---

### Frontend

```bash
npm run dev
```

---

# 🔐 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🔒 Authentication & Authorization

The application uses:

* JWT Authentication
* HTTP-only Cookies
* Password Hashing using bcrypt
* Protected Routes
* Admin Authorization
* Role-Based Access Control

---

# 🛍 Customer Workflow

1. Register Account
2. Login
3. Browse Products
4. Search & Filter Products
5. View Product Details
6. Add Products to Cart
7. Update Cart
8. Complete Shipping Information
9. Place Order
10. View Order History

---

# 👨‍💼 Admin Workflow

1. Login as Admin
2. View Dashboard
3. Manage Products
4. Upload Product Images
5. Manage Customers
6. View Orders
7. Update Order Status
8. Monitor Sales Activity

---

# 📦 API Overview

## Authentication

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/logout
* GET /api/auth/profile
* PUT /api/auth/profile

---

## Products

* GET /api/products
* GET /api/products/:id
* POST /api/products
* PUT /api/products/:id
* DELETE /api/products/:id

---

## Orders

* POST /api/orders
* GET /api/orders/my-orders
* GET /api/orders
* PATCH /api/orders/:id/status

---

## Customers

* GET /api/users/customers
* DELETE /api/users/:id

---

# ☁ Cloudinary Integration

Product images are uploaded directly to Cloudinary.

Features include:

* Automatic Upload
* Optimized Image URLs
* Public ID Storage
* Image Replacement on Update
* Automatic Deletion when Product is Removed

---

# 📱 Responsive Design

The application is fully responsive across:

* Desktop
* Laptop
* Tablet
* Mobile

---

# 🏗 Architecture Highlights

* Service Layer Architecture
* Controller-Service Separation
* Reusable Components
* Protected Routes
* Context API State Management
* Custom Hooks
* Clean Folder Structure
* Reusable Admin Layout
* Shared Topbar Configuration
* Modular API Services

---

# 🔮 Future Improvements

* Online Payment Gateway (Stripe)
* Wishlist
* Product Reviews & Ratings
* Inventory Analytics
* Email Notifications
* Forgot Password
* Reset Password
* Order Tracking Timeline
* Coupon System
* Sales Reports
* Dashboard Charts
* Product Pagination
* Product Reviews Moderation
* Multi-image Products

---

# 👨‍💻 Author

**Muhammad Waris**

GitHub:
https://github.com/waris-072

LinkedIn:
https://www.linkedin.com/in/waris-hakro/

---

⭐ If you found this project helpful, consider giving the repository a star.
