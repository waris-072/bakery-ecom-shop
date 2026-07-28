import { Routes, Route } from "react-router-dom";
// Layout components
import CustomerLayout from "../components/layout/customer/CustomerLayout";
import AdminLayout from "../components/layout/admin/AdminLayout";
// Auth Components
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
// Admin Components
import Dashboard from "../pages/admin/Dashboard";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminProducts from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
// Customer Components
import Home from "../pages/customer/Home";
import Profile from "../pages/customer/Profile";
import Products from "../pages/customer/Products";
import Categories from "../pages/admin/AdminCategories";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import About from "../pages/customer/About";
import Contact from "../pages/customer/Contact";
// Protected Components
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Public Layout */}
      <Route element={<CustomerLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Protected */}
        <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* Admin */}
        <Route element={
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
          }
        >

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<Orders />} />

        </Route>

      </Route>

      

    </Routes>
  );
}

export default AppRoutes;