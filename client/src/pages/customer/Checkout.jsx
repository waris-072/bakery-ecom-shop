import { useNavigate } from "react-router-dom";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";
import useCart from "../../context/CartContext";
import { Link } from "react-router-dom";
import { createOrder } from "../../services/orderService";

import { FaArrowLeft, FaTruck, FaShoppingBag, FaCheckCircle, FaUser, FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

import "./customer-styling/Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const shippingComplete = user?.phone?.trim() && user?.address?.trim();

  const [placingOrder, setPlacingOrder] = useState(false);

  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 2000 ? 0 : 250;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
  try {
    setPlacingOrder(true);

    const orderProducts = cartItems.map((item) => ({
      product: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));

    await createOrder({
      phone: user.phone,
      address: user.address,
      products: orderProducts,
      subtotal,
      shipping,
      total,
    });

    clearCart();

    navigate("/orders");

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to place order."
    );
  } finally {
    setPlacingOrder(false);
  }
};

  return (
    <section className="checkout-page">
      {/* Header */}
      <div className="checkout-header">
        <button className="back-to-cart" onClick={() => navigate('/cart')}>
          <FaArrowLeft /> Back to Cart
        </button>
        <h1>Checkout</h1>
        
      </div>

      <div className="checkout-container">
        <div className="checkout-left">
          <div className="checkout-card">
            <h2>
              <FaTruck className="section-icon" />
              Shipping Details
            </h2>

            <div className="field">
              <label><FaUser className="field-icon" /> Full Name</label>
              <input
                value={user?.name || "Not Added"}
                readOnly
                className={user?.name ? 'filled' : 'empty'}
              />
            </div>

            <div className="field">
              <label><FaPhone className="field-icon" /> Phone Number</label>
              <input
                value={user?.phone || "Not Added"}
                readOnly
                className={user?.phone ? 'filled' : 'empty'}
              />
            </div>

            <div className="field">
              <label><FaMapMarkerAlt className="field-icon" /> Delivery Address</label>
              <textarea
                value={user?.address || "Not Added"}
                readOnly
                className={user?.address ? 'filled' : 'empty'}
                rows={3}
              />
            </div>

            {shippingComplete ? (
              <Link
                to="/profile"
                state={{ from: "/checkout" }}
                className="update-shipping-btn"
              >
                <FaEdit /> Update Shipping
              </Link>
            ) : (
              <>
                <div className="shipping-warning">
                  <span className="warning-icon">⚠️</span>
                  <span>Please complete your shipping information before placing an order.</span>
                </div>
                <Link
                  to="/profile"
                  state={{ from: "/checkout" }}
                  className="complete-profile-btn"
                >
                  Complete Shipping Information →
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="checkout-right">
          <div className="summary-card">
            <h2>
              <FaShoppingBag className="section-icon" />
              Order Summary
            </h2>

            <div className="summary-items">
              {cartItems.map(item => (
                <div className="summary-item" key={item._id}>
                  <div className="summary-item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">× {item.quantity}</span>
                  </div>
                  <strong>Rs. {(item.price * item.quantity).toLocaleString()}</strong>
                </div>
              ))}
            </div>

            <hr className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free' : ''}>
                {shipping === 0 ? '🎉 Free' : `Rs. ${shipping.toLocaleString()}`}
              </span>
            </div>

            {shipping > 0 && (
              <div className="shipping-notice">
                <span>🛒</span>
                <span>Add Rs. {(2000 - subtotal).toLocaleString()} more for free shipping!</span>
              </div>
            )}

            {shipping === 0 && (
              <div className="free-shipping-banner">
                <span>🎉</span>
                <span>Free Shipping Applied!</span>
              </div>
            )}

            <hr className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <strong>Rs. {total.toLocaleString()}</strong>
            </div>

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={!shippingComplete || placingOrder}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Placing Order...
                </>
              ) : (
                <>
                  <FaCheckCircle /> Place Order
                </>
              )}
            </button>

            <p className="secure-checkout">
              🔒 Secure checkout - Your information is safe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;