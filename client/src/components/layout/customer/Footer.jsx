import "./CustomerLayout.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <h2>BakeryShop</h2>

        <p>
          Fresh breads, cakes and pastries made with love every day.
        </p>

        <small>
          © {new Date().getFullYear()} BakeryShop. All rights reserved.
        </small>

      </div>

    </footer>
  );
}

export default Footer;