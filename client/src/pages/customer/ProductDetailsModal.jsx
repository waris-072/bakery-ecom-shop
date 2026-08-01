// components/modals/ProductDetailsModal.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../context/CartContext";

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Loader from "./../../components/loader/Loader";
import { getProductById, getProducts } from "../../services/productService";
import { FaTimes } from "react-icons/fa";

import "./customer-styling/ProductDetailsModal.css";

function ProductDetailsModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentProductId, setCurrentProductId] = useState(productId);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  // Handle related product click - updates modal with new product
  const handleRelatedProductClick = (newProductId) => {
    // Update URL without page reload
    window.history.pushState(null, '', `/products/${newProductId}`);
    // Set new product ID to fetch
    setCurrentProductId(newProductId);
    // Reset quantity
    setQuantity(1);
    // Set loading to true to show loader while fetching
    setLoading(true);
  };

  // Fetch product data when currentProductId changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(currentProductId);
        setProduct(productData.product);

        const products = await getProducts();
        const related = products.products
          .filter(
            p => p.category === productData.product.category && p._id !== currentProductId
          );

        setRelatedProducts(related);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (currentProductId) {
      fetchProduct();
    }
  }, [currentProductId]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-loader-wrapper">
            <Loader message="Loading Product..." />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-scroll-content">
          {/* Product Details */}
          <div className="product-detail-container">
            <div className="product-detail-image">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="product-detail-info">
              <span className="detail-category">{product.category}</span>
              <h1>{product.name}</h1>
              <h2>Rs. {Number(product.price).toLocaleString()}</h2>
              <p>{product.description}</p>

              <span className={`detail-stock ${product.stock > 0 ? "in" : "out"}`}>
                {product.stock > 0 ? "In Stock" : "Out Of Stock"}
              </span>

              <div className="quantity-box">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <button className="add-cart-btn" onClick={handleAddToCart}>
                Add To Cart
              </button>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="related-products-modal">
              <h2>Related Products</h2>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: true,
                }}
                breakpoints={{
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
                className="related-swiper"
              >
                {relatedProducts.map((item) => (
                  <SwiperSlide key={item._id}>
                    <div 
                      className={`related-card ${currentProductId === item._id ? 'active' : ''}`}
                      onClick={() => handleRelatedProductClick(item._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="related-image-wrapper">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <h4>{item.name}</h4>
                      <p>Rs. {Number(item.price).toLocaleString()}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;