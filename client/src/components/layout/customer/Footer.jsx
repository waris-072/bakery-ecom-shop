import "./CustomerLayout.css";
import { Link } from "react-router-dom";
import { PiBreadFill } from "react-icons/pi";
import { 
  FaGithub, 
  FaLinkedin, 
  FaCode, 
  FaHeart,
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaCoffee
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer Grid */}
        <div className="footer-grid">
          
          {/* Brand & Developer Section */}
          <div className="footer-section brand-section">
            <h2 className="footer-brand">
              <PiBreadFill className="brand-icon" />
              <span className="brand-name">Ecommerce</span>
              <span className="brand-sub">Shop</span>
            </h2>
            <p className="footer-description">
              A full-stack bakery e-commerce platform built with React, Node.js, and MongoDB.
            </p>
            <div className="developer-badge">
              <FaCode className="dev-icon" />
              <span>Developed with <FaHeart className="heart-icon" /> by Waris</span>
            </div>
            <div className="social-links">
              <a href="https://github.com/waris-072" className="social-link github" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/waris-hakro-webdev" className="social-link linkedin" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://github.com/waris-072/bakery-ecom-shop" className="social-link code" aria-label="Code" target="_blank" rel="noopener noreferrer">
                <FaCode />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-heading">Categories</h3>
            <ul className="footer-links">
              <li><Link to="/products?category=Bread">🍞 Bread</Link></li>
              <li><Link to="/products?category=Cakes">🎂 Cakes</Link></li>
              <li><Link to="/products?category=Cookies">🍪 Cookies</Link></li>
              <li><Link to="/products?category=Pastries">🥐 Pastries</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3 className="footer-heading">Get in Touch</h3>
            <ul className="contact-info">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>Available for work</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>warishakrow3@gmail.com</span>
              </li>
              <li>
                <FaClock className="contact-icon" />
                <span>Development in Progress</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <div className="tech-stack-section">
          <div className="tech-stack">
            <span className="tech-badge">React</span>
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge">Express</span>
            <span className="tech-badge">MongoDB</span>
            <span className="tech-badge">JWT Auth</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} Muhammad Waris | 
              <span className="intern-badge">🚀 Internship Project</span>
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <span className="dev-credit">
                Made with <FaHeart className="heart-icon" /> for learning
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;