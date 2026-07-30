import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "../../components/admin/ProductForm";
import { createProduct } from "../../services/productService";

function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);

      await createProduct(formData);

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductForm
      mode="create"
      loading={loading}
      onSubmit={handleCreate}
    />
  );
}

export default AddProduct;