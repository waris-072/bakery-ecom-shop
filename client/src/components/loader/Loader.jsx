import { FaBreadSlice } from "react-icons/fa";
import "./Loader.css";

function Loader({
  title = "BakeryShop",
  message = "Freshly baking your experience...",
}) {
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="loader-circle"></div>

        <div className="bread-wrapper">
          <FaBreadSlice className="bread-icon" />
        </div>
      </div>

      <h2 className="loader-title">{title}</h2>

      <p className="loader-text">{message}</p>
    </div>
  );
}

export default Loader;