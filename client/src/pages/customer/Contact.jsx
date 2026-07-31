import { Link } from "react-router-dom";
import "./customer-styling/Contact.css";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";

function Contact() {
  const contactInfo = [
    { 
      icon: <FaMapMarkerAlt />, 
      title: "Visit Us", 
      detail: "123 Bakery Street, Food City, FC 12345" 
    },
    { 
      icon: <FaPhone />, 
      title: "Call Us", 
      detail: "+92 300 1234567", 
      sub: "Mon-Fri 8am - 8pm" 
    },
    { 
      icon: <FaEnvelope />, 
      title: "Email Us", 
      detail: "hello@bakery.com", 
      sub: "We respond within 24 hours" 
    },
    { 
      icon: <FaClock />, 
      title: "Working Hours", 
      detail: "Mon-Sat: 8am - 8pm", 
      sub: "Sunday: 9am - 5pm" 
    },
  ];

  const socialLinks = [
    { 
      icon: <FaFacebook />, 
      name: "Facebook", 
      url: "#",
      color: "#1877f2"
    },
    { 
      icon: <FaInstagram />, 
      name: "Instagram", 
      url: "#",
      color: "#e4405f"
    },
    { 
      icon: <FaTwitter />, 
      name: "Twitter", 
      url: "#",
      color: "#1da1f2"
    },
    { 
      icon: <FaYoutube />, 
      name: "YouTube", 
      url: "#",
      color: "#ff0000"
    },
  ];

  return (
    <main className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <span className="contact-hero-badge">Get in Touch</span>
          <h1>We'd Love to <br /><span className="contact-hero-highlight">Hear From You</span></h1>
          <p>Have questions, feedback, or want to place a special order? Reach out to us anytime.</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info section">
        <div className="contact-info-grid">
          {contactInfo.map((info, index) => (
            <div key={index} className="contact-info-card">
              <div className="contact-info-icon">{info.icon}</div>
              <h3>{info.title}</h3>
              <p>{info.detail}</p>
              {info.sub && <span className="contact-info-sub">{info.sub}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Map / Location */}
      <section className="contact-map-section section">
        <div className="section-header centered">
          <span className="section-subtitle">Find Us</span>
          <h2>Our <span className="section-highlight">Location</span></h2>
        </div>
        <div className="contact-map-container">
          <div className="map-placeholder">
            <div className="map-content">
              <span className="map-icon"><FaMapMarkerAlt /></span>
              <h3>123 Bakery Street</h3>
              <p>Food City, FC 12345</p>
              <div className="map-embed">
                <iframe 
                  title="Bakery Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.529153456789!2d73.047285!3d33.718151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQzJzA1LjMiTiA3M8KwMDInNDkuMCJF!5e0!3m2!1sen!2s!4v1234567890123" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Connect */}
      <section className="contact-social section">
        <div className="section-header centered">
          <span className="section-subtitle">Connect With Us</span>
          <h2>Follow Us on <span className="section-highlight">Social Media</span></h2>
        </div>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a 
              key={index}
              href={social.url} 
              className="social-link"
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--social-color': social.color }}
            >
              <span className="social-icon">{social.icon}</span>
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="contact-cta-content">
          <h2>Visit Our <span className="cta-highlight">Bakery</span></h2>
          <p>Experience the aroma of freshly baked goods at our location.</p>
          <Link to="/products" className="contact-cta-btn">Order Now</Link>
        </div>
      </section>

    </main>
  );
}

export default Contact;