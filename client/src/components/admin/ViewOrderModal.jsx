import { useState } from "react";
import Loader from "./../loader/Loader";
import { updateOrderStatus } from "../../services/orderService";
import "./AdminComponents.css";

function ViewOrderModal({
    order,
    onClose,
    refreshOrders,
}) {
    const [status, setStatus] = useState(order.status);
    const [saving, setSaving] = useState(false);

    const statuses = [
        "Pending",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
    ];

    const handleSave = async () => {
        try {
            setSaving(true);
            await updateOrderStatus(order._id, status);
            await refreshOrders();
            onClose();
        } catch (error) {
            console.log(error);
            alert("Failed to update order.");
        } finally {
            setSaving(false);
        }
    };

    if (saving) {
        return <Loader message="Updating order..." />;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>
                        Order #{order._id.slice(-6).toUpperCase()}
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    {/* Customer */}
                    <div className="details-section compact">
                        <h3>Customer</h3>
                        <div className="customer-grid">
                            <p><strong>Name:</strong> {order.customer.name}</p>
                            <p><strong>Email:</strong> {order.customer.email}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="details-section compact">
                        <h3>Products</h3>
                        <div className="products-list">
                            {order.products.map((item) => (
                                <div key={item.product} className="order-product compact">
                                    <img src={item.image} alt={item.name} />
                                    <div className="product-info">
                                        <strong>{item.name}</strong>
                                        <span>Qty: {item.quantity}</span>
                                        <span>Rs. {item.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary & Status Grid */}
                    <div className="details-grid">
                        <div className="details-section compact summary-section">
                            <h3>Summary</h3>
                            <div className="summary-items">
                                <p><strong>Subtotal:</strong> Rs. {order.subtotal.toLocaleString()}</p>
                                <p><strong>Shipping:</strong> Rs. {order.shipping.toLocaleString()}</p>
                                <p className="total"><strong>Total:</strong> Rs. {order.total.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="details-section compact status-section">
                            <h3>Status</h3>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="status-select"
                            >
                                {statuses.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        Close
                    </button>
                    <button 
                        className="save-btn" 
                        onClick={handleSave} 
                        disabled={saving}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewOrderModal;