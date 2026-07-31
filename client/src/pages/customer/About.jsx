import { Link } from "react-router-dom";
import "./customer-styling/About.css";
import { 
  FaHeart, 
  FaLeaf, 
  FaStar, 
  FaTrophy,
  FaUsers,
  FaUtensils,
  FaAward,
  FaQuoteLeft,
  FaQuoteRight,
  FaUserCircle,
  FaBirthdayCake,
  FaBreadSlice
} from "react-icons/fa";
import { GiBread, GiCakeSlice, GiCroissant } from "react-icons/gi";

function About() {
  const teamMembers = [
    { 
      name: "Sarah Johnson", 
      role: "Head Baker", 
      icon: <FaHeart />,
      experience: "15 years",
      description: "Passionate baker with 15 years of experience"
    },
    { 
      name: "Michael Chen", 
      role: "Pastry Chef", 
      icon: <GiCakeSlice />,
      experience: "10 years",
      description: "Creative pastry artist and innovator"
    },
    { 
      name: "Emily Rodriguez", 
      role: "Bread Specialist", 
      icon: <GiBread />,
      experience: "8 years",
      description: "Master of traditional bread-making techniques"
    },
  ];

  const values = [
    { 
      icon: <FaLeaf />, 
      title: "Quality Ingredients", 
      description: "We source only the finest, freshest ingredients for every recipe." 
    },
    { 
      icon: <FaHeart />, 
      title: "Passion for Baking", 
      description: "Every item is crafted with love and dedication to perfection." 
    },
    { 
      icon: <FaStar />, 
      title: "Customer First", 
      description: "Your satisfaction is our top priority in everything we do." 
    },
    { 
      icon: <FaLeaf />, 
      title: "Sustainable Practices", 
      description: "Committed to eco-friendly and sustainable baking methods." 
    },
  ];

  const achievements = [
    { icon: <FaTrophy />, number: "10+", label: "Years of Excellence" },
    { icon: <FaUsers />, number: "15K+", label: "Happy Customers" },
    { icon: <FaUtensils />, number: "500+", label: "Recipes Created" },
    { icon: <FaAward />, number: "50+", label: "Awards Won" },
  ];

  return (
    <main className="about-page">
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="about-hero-badge">Our Story</span>
          <h1>Baking Dreams <br /><span className="about-hero-highlight">Since 2010</span></h1>
          <p>We believe that great food brings people together. Every recipe tells a story, and we're here to share ours with you.</p>
          <Link to="/products" className="about-hero-btn">Explore Our Products</Link>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-story section">
        <div className="story-grid">
          <div className="story-image-placeholder">
            <div className="story-icon-wrapper">
              <div className="story-main-icon">
                <FaBirthdayCake />
              </div>
              <div className="story-floating-icons">
                <span className="float-icon"><FaBreadSlice /></span>
                <span className="float-icon"><GiCakeSlice /></span>
                <span className="float-icon"><GiCroissant /></span>
              </div>
            </div>
            <div className="story-experience-badge">
              <span className="experience-number">10+</span>
              <span className="experience-label">Years of Excellence</span>
            </div>
          </div>
          <div className="story-content">
            <span className="section-subtitle">Our Journey</span>
            <h2>Crafting Memories <span className="section-highlight">Through Baking</span></h2>
            <p>Founded in 2010, our bakery started with a simple dream - to create delicious, high-quality baked goods that bring joy to people's lives. What began as a small kitchen operation has grown into a beloved local institution.</p>
            <p>We're committed to using traditional techniques passed down through generations, combined with innovative recipes that push the boundaries of baking. Every cake, bread, and pastry is made with the same care and attention to detail that our founder insisted upon.</p>
            <div className="story-stats">
              {achievements.map((item, index) => (
                <div key={index} className="story-stat">
                  <span className="stat-icon">{item.icon}</span>
                  <span className="stat-number">{item.number}</span>
                  <span className="stat-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values section">
        <div className="section-header centered">
          <span className="section-subtitle">What We Stand For</span>
          <h2>Our Core <span className="section-highlight">Values</span></h2>
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon-wrapper">
                <div className="value-icon-bg">
                  <span className="value-icon">{value.icon}</span>
                </div>
              </div>
              <h3>{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section - Hidden on Mobile */}
      <section className="about-team section desktop-only">
        <div className="section-header centered">
          <span className="section-subtitle">Meet Our Team</span>
          <h2>Our Passionate <span className="section-highlight">Bakers</span></h2>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-icon-wrapper">
                <div className="team-icon-circle">
                  {member.icon}
                </div>
                <div className="team-experience-badge">{member.experience}</div>
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <span className="team-description">{member.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="about-testimonial section">
        <div className="testimonial-container">
          <div className="testimonial-content">
            <FaQuoteLeft className="quote-icon left" />
            <p>"The best bakery in town! Every item is fresh, delicious, and made with so much love. The cakes are absolutely divine!"</p>
            <FaQuoteRight className="quote-icon right" />
            <div className="testimonial-author">
              <div className="author-avatar">
                <FaUserCircle />
              </div>
              <div>
                <h4>Maria Thompson</h4>
                <span className="author-role">Regular Customer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta-content">
          <h2>Ready to <span className="cta-highlight">Taste</span> the Difference?</h2>
          <p>Visit our bakery or order online to experience our delicious creations.</p>
          <div className="cta-buttons">
            <Link to="/products" className="cta-btn-primary">Explore Now</Link>
            <Link to="/contact" className="cta-btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default About;