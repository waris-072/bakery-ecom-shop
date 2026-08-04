import "./AdminComponents.css";

function ViewCustomerModal({
    customer,
    onClose,
}) {

    if (!customer) return null;

    return (

        <div className="modal-overlay">

            <div className="confirm-modal">

                <h3>Customer Details</h3>

                <p><strong>Name:</strong> {customer.name || "Deleted User"}</p>

                <p><strong>Email:</strong> {customer.email || "-"}</p>

                <p><strong>Phone:</strong> {customer.phone || "-"}</p>

                <p><strong>Address:</strong> {customer.address || "-"}</p>

                <p><strong>Joined:</strong> {new Date(customer.createdAt).toLocaleDateString()}</p>

                <button
                    className="submit-btn"
                    onClick={onClose}
                >
                    Close
                </button>

            </div>

        </div>

    );
}

export default ViewCustomerModal;