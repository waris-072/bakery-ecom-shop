import { FaEdit, FaTrash } from "react-icons/fa";
import "./AdminComponents.css";

function ProductTable({
  products = [],
  onEdit,
  onDelete,
}) {
  if (!products.length) {
    return (
      <div className="empty-products">
        <span>📦</span>
        <h3>No Products Found</h3>
        <p> Start by adding your first bakery product. </p>
      </div>
    );
  }
  return (
    <div className="product-table-container">
      <table className="product-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-thumb"
                />
              </td>

              <td> <strong>{product.name}</strong> </td>
              <td> {product.category} </td>
              <td> Rs {Number(product.price).toLocaleString()} </td>
              <td> {product.stock} </td>
              <td>
                <span className={`status-badge ${product.status}`}>
                    {product.status}
                </span>
              </td>
              <td>{ new Date(product.createdAt).toLocaleDateString() }</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      onEdit(product._id)
                    }
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(product) }
                  >
                    <FaTrash />
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

export default ProductTable;