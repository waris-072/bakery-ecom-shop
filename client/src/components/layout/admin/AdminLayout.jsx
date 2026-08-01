import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./AdminLayout.css";
import { useState } from "react";

function AdminLayout() {
  const { pathname } = useLocation();

  let title = "Dashboard";

  if (pathname === "/admin/products") title = "Manage Products";
  else if (pathname === "/admin/products/add") title = "Add Product";
  else if (pathname.startsWith("/admin/products/edit")) title = "Edit Product";

  const [topbarConfig, setTopbarConfig] = useState({
    title: title,
    search: "",
    setSearch: null,
    sort: "newest",
    setSort: null,
    placeholder: "",
  });

  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <Topbar {...topbarConfig }/>

        <div className="admin-page">
          <Outlet context={{ setTopbarConfig, }} />
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;