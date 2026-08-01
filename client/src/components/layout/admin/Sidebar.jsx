import {
  FaChartPie,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaBreadSlice,
  FaUserCircle
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./AdminLayout.css";
import { useState } from "react";
import Loader from "./../../loader/Loader";

function Sidebar() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };
  if (loading) {
    return (
      <Loader
        message="signing out..."
      />
    );
  }

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <FaBreadSlice />
        <span>BakeryShop</span>
      </div>

      <nav className="sidebar-nav">

 

        <NavLink 
          to="/admin/Profile"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaUserCircle />
          Profile
        </NavLink>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaChartPie />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaBoxOpen />
          Manage Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaShoppingCart />
          Manage Orders
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaUsers />
          Customers
        </NavLink>

      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;