import {
  FaChartPie,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaBreadSlice,
  FaUserCircle,
  FaTimes
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./AdminLayout.css";
import { useState } from "react";
import Loader from "./../../loader/Loader";

function Sidebar({ isOpen = true, isMobile = false, onClose }) {
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
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="signing out..." />;
  }

  // Force sidebar to be visible on desktop
  const sidebarClasses = `sidebar ${isMobile ? 'mobile' : 'desktop'} ${isOpen ? 'open' : 'closed'}`;

  return (
    <aside className={sidebarClasses}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <FaBreadSlice />
          <span>BakeryShop</span>
        </div>
        
        {isMobile && (
          <button 
            className="sidebar-close-btn" 
            onClick={onClose}
            aria-label="Close menu"
            type="button"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        <NavLink 
          to="/admin/profile"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
          onClick={() => {
            if (isMobile && onClose) onClose();
          }}
        >
          <FaUserCircle />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
          onClick={() => {
            if (isMobile && onClose) onClose();
          }}
        >
          <FaChartPie />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
          onClick={() => {
            if (isMobile && onClose) onClose();
          }}
        >
          <FaBoxOpen />
          <span>Manage Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
          onClick={() => {
            if (isMobile && onClose) onClose();
          }}
        >
          <FaShoppingCart />
          <span>Manage Orders</span>
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
          onClick={() => {
            if (isMobile && onClose) onClose();
          }}
        >
          <FaUsers />
          <span>Manage Customers</span>
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout} type="button">
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;