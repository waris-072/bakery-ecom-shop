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

            <h1>My Orders</h1>

            {
                orders.length === 0 ? (

                    <div className="empty-orders">

                        <h2>No Orders Yet</h2>

                        <p>
                            Start shopping to place your first order.
                        </p>

                    </div>

                ) : (

                    orders.map(order => (

                        <div
                            key={order._id}
                            className="order-card"
                        >

                            <div className="order-header">

                                <div>

                                    <h3>
                                        Order #
                                        {order._id.slice(-6).toUpperCase()}
                                    </h3>

                                    <p>
                                        {
                                            new Date(
                                                order.createdAt
                                            ).toLocaleDateString()
                                        }
                                    </p>

                                </div>

                                <span
                                    className={`status ${order.status.toLowerCase()}`}
                                >
                                    {order.status}
                                </span>

                            </div>

                            <div className="order-products">

                                {
                                    order.products.map(item => (

                                        <div
                                            key={item.product}
                                            className="order-product"
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />

                                            <div>

                                                <h4>{item.name}</h4>

                                                <p>

                                                    Qty:
                                                    {" "}
                                                    {item.quantity}

                                                </p>

                                            </div>

                                            <strong>

                                                Rs.
                                                {" "}
                                                {item.price}

                                            </strong>

                                        </div>

                                    ))
                                }

                            </div>

                            <div className="order-footer">

                                <strong>

                                    Total:

                                    {" "}

                                    Rs.
                                    {" "}
                                    {order.total}

                                </strong>

                            </div>

                        </div>

                    ))

                )
            }

        </section>

    );

}

export default MyOrders;