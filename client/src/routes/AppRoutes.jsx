import { Routes, Route } from "react-router-dom";
// Layout components
import CustomerLayout from "../components/layout/customer/CustomerLayout";
import AdminLayout from "../components/layout/admin/AdminLayout";
// Auth Components
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
// Admin Components
import Dashboard from "../pages/admin/Dashboard";
import AdminProfile from "../pages/admin/AdminProfile";
import ManageCategories from "../pages/admin/ManageCategories";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageOrders from "../pages/admin/ManageOrders";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import ManageCustomers from "../pages/admin/ManageCustomers"
// Customer Components
import Home from "../pages/customer/Home";
import Profile from "../pages/customer/Profile";
import Products from "../pages/customer/Products";
import MyOrders from "../pages/customer/MyOrders";
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
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<MyOrders />} />
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

        </Route>

        
        {/* Admin */}
        <Route element={
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
          }
        >

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/Profile" element={<AdminProfile />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
          <Route path="/admin/orders" element={<ManageOrders />} />

          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/customers" element={<ManageCustomers />} />



      </Route>

      

    </Routes>
  );
}

export default AppRoutes;