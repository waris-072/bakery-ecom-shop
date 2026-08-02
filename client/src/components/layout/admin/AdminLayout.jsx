import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./AdminLayout.css";
import { useState, useEffect, useCallback } from "react";

function AdminLayout() {
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 992;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  let title = "Dashboard";

  if (pathname === "/admin/products") title = "Manage Products";
  else if (pathname === "/admin/products/add") title = "Add Product";
  else if (pathname.startsWith("/admin/products/edit")) title = "Edit Product";
  else if (pathname === "/admin/orders") title = "Manage Orders";
  else if (pathname === "/admin/customers") title = "Manage Customers";
  else if (pathname === "/admin/profile") title = "Profile";

  const [topbarConfig, setTopbarConfig] = useState({
    title: title,
    search: "",
    setSearch: null,
    sort: "newest",
    setSort: null,
    placeholder: "",
    onMenuToggle: toggleSidebar,
    isSidebarOpen: isSidebarOpen,
    isMobile: isMobile
  });

  useEffect(() => {
    setTopbarConfig(prev => ({
      ...prev,
      title: title,
      isMobile: isMobile,
      isSidebarOpen: isSidebarOpen,
      onMenuToggle: toggleSidebar
    }));
  }, [pathname, isMobile, isSidebarOpen, toggleSidebar]);

  return (
    <div className="admin-layout">
      {isMobile && isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        isOpen={isSidebarOpen} 
        isMobile={isMobile}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className={`admin-main ${isMobile ? 'mobile' : ''}`}>
        <Topbar {...topbarConfig} />
        <div className="admin-page">
          <Outlet context={{ setTopbarConfig }} />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;