import "./AdminComponents.css";
import { FaEye, FaTrash } from "react-icons/fa";

function CustomerTable({ customers = [], onView, onDelete }) {

    if (!customers.length) {
        return (
            <div className="empty-products">
                <h3>No Customers Found</h3>
            </div>
        );
    }

    return (

        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined</th>
                        <th>Actions</th>

                    </tr>
                </thead>

                <tbody>
                    {customers.map(customer => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>
                                {
                                    new Date(
                                        customer.createdAt
                                    ).toLocaleDateString()
                                }
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button className="view-btn" onClick={() => onView(customer)} >
                                        <FaEye />
                                    </button>
                                    <button className="delete-btn" onClick={() => onDelete(customer)} >
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default CustomerTable;

