import { Link } from "react-router-dom";
import "./customer-styling/Home.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import images
import heroImage from "../../assets/images/hero-image.png";
import cake1 from "../../assets/images/cake1.jpeg";
import bread1 from "../../assets/images/bread1.jpeg";
import donut1 from "../../assets/images/donut1.jpeg";
import pastry1 from "../../assets/images/pastry1.jpeg";
import cookie1 from "../../assets/images/cookie1.jpeg";

import "swiper/css";
import "swiper/css/navigation";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products.slice(0, 12));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Category data with images
  const categories = [
    { name: "Cakes", image: cake1, path: "/products?category=Cakes" },
    { name: "Breads", image: bread1, path: "/products?category=Bread" },
    { name: "Pastries", image: pastry1, path: "/products?category=Pastries" },
    { name: "Cookies", image: cookie1, path: "/products?category=Cookies" },
    { name: "Donuts", image: donut1, path: "/products?category=Donuts" },
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "150+", label: "Delicious Recipes" },
    { number: "50+", label: "Awards Won" },
    { number: "100%", label: "Satisfaction Guaranteed" },
  ];

  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Freshly Baked Everyday
          </div>
          <h1>
            <span className="hero-gradient-text">Delicious</span> Cakes,
            <br />
            Breads & <span className="hero-highlight">Pastries</span>
          </h1>
          <p>
            Made with premium ingredients and baked fresh every morning.
            <br />
            <span className="hero-sub-text">Every bite tells a story of perfection.</span>
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="hero-btn-primary">
              Shop Now
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/about" className="hero-btn-secondary">
              <span className="play-icon">▶</span>
              Our Story
            </Link>
          </div>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="hero-stat">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line">
            <div className="scroll-circle"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section">
        <div className="section-header">
          <div>
            <span className="section-subtitle">Our Best Sellers</span>
            <h2>Featured <span className="section-highlight">Products</span></h2>
          </div>
          <Link to="/products" className="view-all-link">
            View All
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <div className="loading-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={25}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 15 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              900: { slidesPerView: 3, spaceBetween: 25 },
              1200: { slidesPerView: 4, spaceBetween: 25 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="home-product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-price">Rs. {product.price}</p>
                    <Link to={`/products/${product._id}`} className="view-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* Browse Categories - Single Row */}
      <section className="section categories-section">
        <div className="section-header">
          <div>
            <span className="section-subtitle">Shop by Category</span>
            <h2>Browse <span className="section-highlight">Categories</span></h2>
          </div>
        </div>

        <div className="category-grid single-row">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={category.path} 
              className="category-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-image-wrapper">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <div className="category-content">
                    <h3 className="category-name-overlay">{category.name}</h3>
                    <span className="category-shop-link">Shop Now →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="section-header centered">
          <span className="section-subtitle">Why Choose Us</span>
          <h2>What Makes Us <span className="section-highlight">Special</span></h2>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon-wrapper">
              <div className="why-icon-bg">
                <span className="why-icon">🚚</span>
              </div>
            </div>
            <h3>Fast Delivery</h3>
            <p>Fresh products delivered to your doorstep within hours.</p>
          </div>
          <div className="why-card">
            <div className="why-icon-wrapper">
              <div className="why-icon-bg">
                <span className="why-icon">🌾</span>
              </div>
            </div>
            <h3>Premium Ingredients</h3>
            <p>Only the finest quality ingredients in every recipe.</p>
          </div>
          <div className="why-card">
            <div className="why-icon-wrapper">
              <div className="why-icon-bg">
                <span className="why-icon">❤️</span>
              </div>
            </div>
            <h3>Made with Love</h3>
            <p>Baked fresh every morning with passion and care.</p>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;