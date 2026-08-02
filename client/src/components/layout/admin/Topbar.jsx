import { Link } from "react-router-dom";
import { FaUserCircle, FaSearch, FaBars } from "react-icons/fa";
import "./AdminLayout.css";

function Topbar({
  title,
  search = "",
  setSearch,
  sort = "newest",
  setSort,
  sortOptions = [],
  placeholder = "",
  actionButton = null,
  clearFilters,
  onMenuToggle,
  isSidebarOpen = false,
  isMobile = false,
}) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        {isMobile && (
          <button 
            className="menu-toggle-btn" 
            onClick={onMenuToggle}
            aria-label="Toggle menu"
            type="button"
          >
            <FaBars />
          </button>
        )}

        <h2>{title}</h2>

        {setSearch && (
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              value={search}
              placeholder={placeholder || "Search..."}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="topbar-right">
        {setSort && (
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sort-select"
          >
            {(sortOptions.length ? sortOptions : [
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
              { value: "az", label: "A → Z" },
              { value: "za", label: "Z → A" }
            ]).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {clearFilters && (
          <button className="clear-filter-btn" onClick={clearFilters}>
            Clear
          </button>
        )}

        {actionButton && (
          <Link to={actionButton.to} className="topbar-action-btn">
            {actionButton.label}
          </Link>
        )}

        <button className="user-icon-btn" type="button">
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
}

export default Topbar;