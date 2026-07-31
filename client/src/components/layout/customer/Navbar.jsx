import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {PiBreadFill,} from "react-icons/pi";
import { FaSearch, FaShoppingCart, FaUserCircle, FaChevronDown, FaBars, FaTimes} from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";
import "./CustomerLayout.css";

function Navbar() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [ "Bread", "Cakes", "Cookies", "Pastries", "Donuts", ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/products?search=${search}`);
  };

  const cartCount = 0;

  return (
    <header className="navbar">


      {/*Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <PiBreadFill className="logo-icon" />

          <div className="logo-text">
            <span className="brand-name"> Zenvyro </span>
            <span className="brand-subtitle"> Bakery </span>
          </div>

        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen  ? <FaTimes /> : <FaBars /> }
      </button>



      {/* Navigation Links */}
      <nav className={
          menuOpen 
          ? "navbar-links mobile-open"
          : "navbar-links"
        }
      >
        <NavLink to="/" onClick={()=>setMenuOpen(false)} > Home </NavLink>
        <NavLink to="/products" onClick={()=>setMenuOpen(false)} > Products </NavLink>
        
        {/* Categories dropdown */}

        <div className="category-menu">
          <button 
            className={`category-btn ${categoryOpen ? 'active' : ''}`}
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            Categories <FaChevronDown className={categoryOpen ? 'rotated' : ''}/>
          </button>

          {categoryOpen && (
            <div className={`category-dropdown ${categoryOpen ? 'open' : ''}`}>
              {categories.map((category)=>(
                <Link
                  key={category}
                  to={`/products?category=${category}`}
                  onClick={() => {
                    setCategoryOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>

        <NavLink to="/about" onClick={()=>setMenuOpen(false)} > About </NavLink>
        <NavLink to="/contact" onClick={()=>setMenuOpen(false)} > Contact </NavLink>

      </nav>

      {/* Search */}

      <form className={ menuOpen
        ? "navbar-search mobile-search"
        : "navbar-search"
        }
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button type="submit"> <FaSearch /> </button>
      </form>

      {/* Actions */}
      <div className="navbar-actions">

        {/* Cart */}
        <Link to="/cart" className="cart-icon" >
          <FaShoppingCart />
          <span> {cartCount} </span>
        </Link>

        {/* User */}
        {!user ? (
          <div className="auth-links">
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
          </div>
        ) : (
          <div className="profile-menu" 
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <FaUserCircle className="user-icon"/>
            <span> {user.name.split(" ")[0]} </span>
            <FaChevronDown />

            { profileOpen && (
              <div className="profile-dropdown">
                <Link to="/profile"> Profile </Link>
                <Link to="/orders"> My Orders </Link>

                { user.role === "admin" && (
                  <Link to="/admin"> Dashboard </Link>
                )}

                <button onClick={handleLogout} > Logout </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;