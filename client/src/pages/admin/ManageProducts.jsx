import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../components/admin/ProductTable";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { getProducts, deleteProduct } from "../../services/productService";

function ManageProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);  
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);  

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProduct(selectedProduct._id);
      await fetchProducts();
      setSelectedProduct(null);
      setShowModal(false)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div>
      <div className="page-header">
        <h2>Manage Products</h2>
        <button onClick={() => navigate("/admin/products/add")}>
          + Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={(id) => navigate(`/admin/products/edit/${id}`)}
        onDelete={(product) => {
          setSelectedProduct(product);
          setShowModal(true);
        }}
      />

      {selectedProduct && showModal && (
        <ConfirmModal
          product={selectedProduct}  // ✅ Pass the full product object
          onConfirm={handleDelete}
          onCancel={() => {
            setSelectedProduct(null);
            setShowModal(false);
          }}
          loading={loading}
        />
      )}

      
    </div>
  );
}

export default ManageProducts;