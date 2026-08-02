import { FaEye } from "react-icons/fa";
import "./AdminComponents.css";

function OrderTable({ orders = [], onView }) {

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "pending";

            case "Confirmed":
                return "confirmed";

            case "Preparing":
                return "preparing";

            case "Out for Delivery":
                return "out-for-delivery";

            case "Delivered":
                return "delivered";

            case "Cancelled":
                return "cancelled";

            default:
                return "";
        }
    };

    if (!orders.length) {
        return (
            <div className="empty-products">
                <span>📦</span>
                <h3>No Orders Found</h3>
                <p>No customer orders available.</p>
            </div>
        );
    }

    return (

        <div className="table-container">

            <table className="table">

                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {orders.map((order) => (

                        <tr key={order._id}>

                            <td>
                                <strong>
                                    #{order._id.slice(-6).toUpperCase()}
                                </strong>
                            </td>

                            <td>

                                <div className="customer-info">

                                    <strong>
                                        {order.customer.name}
                                    </strong>

                                </div>

                            </td>

                            <td>
                                {order.products.length}
                            </td>

                            <td>
                                Rs. {Number(order.total).toLocaleString()}
                            </td>

                            <td>

                                <span
                                    className={`status-badge ${getStatusClass(order.status)}`}
                                >
                                    {order.status}
                                </span>

                            </td>

                            <td>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>

                            <td>

                                <div className="action-buttons">

                                    <button
                                        className="edit-btn"
                                        onClick={() => onView(order)}
                                    >
                                        <FaEye />
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default OrderTable;