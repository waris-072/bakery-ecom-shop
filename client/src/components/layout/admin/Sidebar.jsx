import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <NavLink to="/admin/products"> Manage Products </NavLink>
  );
}

export default Sidebar;