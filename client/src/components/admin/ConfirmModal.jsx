import "./AdminComponents.css";

function ConfirmModal({
    selectedProduct,
    onConfirm,
    onCancel,
    loading = false,
}) {
    return (
        <div className="modal-overlay">
            <div className="confirm-modal">
                <h3>Delete Product?</h3>
                <p>
                    Are you sure you want to delete
                    <strong> {selectedProduct?.name}</strong>?
                </p>
                <div className="modal-actions">
                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="confirm-delete-btn"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;