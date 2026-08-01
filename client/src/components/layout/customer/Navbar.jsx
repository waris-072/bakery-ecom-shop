import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";

import { PiBreadFill } from "react-icons/pi";
import { FaSearch, FaShoppingCart, FaUserCircle, FaChevronDown, FaBars, FaTimes, FaTimesCircle } from "react-icons/fa";

import Loader from "./../../loader/Loader";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../context/CartContext";
import "./CustomerLayout.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const categories = ["All", "Bread", "Cakes", "Cookies", "Pastries", "Donuts"];

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  
  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "A → Z", value: "az" },
    { label: "Z → A", value: "za" },
    { label: "Price: Low → High", value: "price-low" },
    { label: "Price: High → Low", value: "price-high" },
  ];

  // Get search params from URL to sync state
  const [searchParams] = useSearchParams();

  // Sync state with URL params on mount and when URL changes
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    const categoryParam = searchParams.get("category") || "All";
    const sortParam = searchParams.get("sort") || "newest";
    
    setSearch(searchParam);
    setCategory(categoryParam);
    setSort(sortParam);
  }, [searchParams]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    goToProducts();
  };

  const clearSearch = () => {
    setSearch("");
    // Remove search from URL while keeping other filters
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (sort !== "newest") params.set("sort", sort);
    navigate(`/products?${params.toString()}`);
  };

  const goToProducts = (
    newSearch = search,
    newCategory = category,
    newSort = sort
  ) => {
    const params = new URLSearchParams();

    if (newSearch.trim()) params.set("search", newSearch);
    if (newCategory !== "All") params.set("category", newCategory);
    if (newSort !== "newest") params.set("sort", newSort);

    navigate(`/products?${params.toString()}`);
    setMenuOpen(false);
  };


  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
  );


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
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <nav className={menuOpen ? "navbar-links mobile-open" : "navbar-links"}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink
          to={`/products?search=${search}&category=${category}&sort=${sort}`}
          onClick={() => setMenuOpen(false)}
        >
          Products
        </NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>

        {/* Categories dropdown */}
        <div className="category-menu">
          <button
            className={`category-btn ${categoryOpen ? 'active' : ''}`}
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <span>Categories</span>
            <FaChevronDown className={categoryOpen ? 'rotated' : ''} />
          </button>

          {categoryOpen && (
            <div className={`category-dropdown ${categoryOpen ? 'open' : ''}`}>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/products?category=${cat}`}
                  className={category === cat ? 'active-category' : ''}
                  onClick={() => {
                    setCategory(cat);
                    setCategoryOpen(false);
                    setMenuOpen(false);
                    goToProducts(search, cat, sort);
                  }}
                >
                  {cat}
                  {category === cat && <span className="check-mark">✓</span>}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="category-menu">
          <button
            className={`category-btn ${sortOpen ? "active" : ""}`}
            onClick={() => setSortOpen(!sortOpen)}
          >
            <span>Sort</span>
            <FaChevronDown className={sortOpen ? "rotated" : ""} />
          </button>

          {sortOpen && (
            <div className="category-dropdown open">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`dropdown-item ${sort === option.value ? 'active-sort' : ''}`}
                  onClick={() => {
                    setSort(option.value);
                    setSortOpen(false);
                    setMenuOpen(false);
                    goToProducts(search, category, option.value);
                  }}
                >
                  {option.label}
                  {sort === option.value && <span className="check-mark">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Search */}
      <form className={menuOpen ? "navbar-search mobile-search" : "navbar-search"} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button type="button" className="clear-search-btn" onClick={clearSearch}>
            <FaTimesCircle />
          </button>
        )}
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {/* Actions */}
      <div className="navbar-actions">
        {/* Cart */}
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart />
          <span>{cartCount}</span>
        </Link>

        {/* User */}
        {!user ? (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div className="profile-menu" onClick={() => setProfileOpen(!profileOpen)}>
            <FaUserCircle className="user-icon" />
            <span>{user.name.split(" ")[0]}</span>
            <FaChevronDown />

            {profileOpen && (
              <div className="profile-dropdown">
                <Link to="/profile">Profile</Link>
                <Link to="/orders">My Orders</Link>
                <button onClick={handleLogout} >Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;