import { Link, useNavigate } from "react-router-dom";
import useCart from "../../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from "react-icons/fa";

import "./customer-styling/Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const shipping = subtotal > 2000 ? 0 : 250;
  const total = subtotal + shipping;

  if (!cartItems.length) {
    return (
      <section className="cart-page empty-cart">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h1>Your Cart is Empty</h1>
          <p>Looks like you haven't added any delicious bakery items yet.</p>
          <p className="empty-cart-sub">Start exploring our fresh collection!</p>
          <Link to="/products" className="shop-btn">
            <FaShoppingBag /> Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <div className="cart-header-left">
          <button className="back-to-shop" onClick={() => navigate('/products')}>
            <FaArrowLeft /> Continue Shopping
          </button>
          <h1>Shopping Cart</h1>
        </div>
        <div className="cart-header-right">
          <span className="cart-item-count">{totalItems} items</span>
          {cartItems.length > 1 && (
            <button className="clear-cart-header-btn" onClick={clearCart}>
              <FaTrash /> Clear Cart
            </button>
          )}
        </div>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
                {item.quantity > 1 && (
                  <span className="item-quantity-badge">{item.quantity}x</span>
                )}
              </div>

              <div className="cart-item-info">
                <div className="cart-item-header">
                  <h3>{item.name}</h3>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <p className="cart-item-price">Rs. {Number(item.price).toLocaleString()}</p>
                
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="item-total">
                    <span>Total:</span>
                    <strong>Rs. {(item.price * item.quantity).toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Items ({totalItems})</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</span>
          </div>
          
          {shipping > 0 && (
            <div className="shipping-notice">
              <span>🛒</span>
              <span>Add Rs. {Math.ceil(2000 - subtotal)} more for free shipping!</span>
            </div>
          )}

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>Rs. {total.toLocaleString()}</strong>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
          
          <Link to="/products" className="continue-shopping-link">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;