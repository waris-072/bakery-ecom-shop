import { Link } from "react-router-dom";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import "./AdminLayout.css";

function Topbar({
  title,
  search = "",
  setSearch,
  sort = "newest",
  setSort,
  placeholder = "",
  actionButton = null,
  clearFilters,
}) {
  return (
    <header className="topbar">

      <div className="topbar-left">
        <h2>{title}</h2>

        {setSearch && (
          <div className="search-box">
            <FaSearch />

            <input
              type="text"
              value={search}
              placeholder={placeholder}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {setSort && (
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        )}
      </div>

      {clearFilters && (
        <button
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      )}

      {actionButton && (
          <Link
              to={actionButton.to}
              className="topbar-action-btn"
          >
              {actionButton.label}
          </Link>
      )}

    </header>
  );
}

export default Topbar;