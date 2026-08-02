import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { getMyOrders } from "../../services/orderService";
import "./customer-styling/MyOrders.css";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data.orders);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading)
        return <Loader message="Loading orders..." />;

    return (
        <section className="orders-page">
            <div className="orders-header">
                <h1>My Orders</h1>
                {orders.length > 0 && (
                    <span className="order-count">
                        {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                    </span>
                )}
            </div>

            {orders.length === 0 ? (
                <div className="empty-orders">
                    <div className="empty-icon">🛒</div>
                    <h2>No Orders Yet</h2>
                    <p>Start shopping to place your first order.</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h3>
                                        Order #{order._id.slice(-6).toUpperCase()}
                                    </h3>
                                    <p className="order-date">
                                        {new Date(order.createdAt).toLocaleDateString(
                                            'en-US', 
                                            { 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            }
                                        )}
                                    </p>
                                </div>
                                <div className="order-status-wrapper">
                                    <span className={`status ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="order-products">
                                {order.products.map(item => (
                                    <div key={item.product} className="order-product">
                                        <img src={item.image} alt={item.name} />
                                        <div className="product-details">
                                            <h4>{item.name}</h4>
                                            <p className="product-quantity">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <strong className="product-price">
                                            Rs. {item.price}
                                        </strong>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="order-total">
                                    <span>Total Amount</span>
                                    <strong>
                                        Rs. {order.total}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default MyOrders;