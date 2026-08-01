import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./AdminComponents.css";
import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const categories = ["Cakes", "Bread", "Cookies", "Pastries", "Donuts"];

function ProductForm({
  mode = "create",
  product = null,
  onSubmit,
  loading = false,
  onCancel = null,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState("");
  const image = watch("image");

  useEffect(() => {
    if (mode === "edit" && product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        status: product.status,
      });

      setPreview(product.image);
    }
  }, [mode, product, reset]);

  useEffect(() => {
    if (!image || !image.length) return;

    const file = image[0];
    setPreview(URL.createObjectURL(file));
    return () => URL.revokeObjectURL(file);
  }, [image]);

  const submitHandler = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("stock", data.stock);
    formData.append("status", data.status);

    if (data.image?.length) {
      formData.append("image", data.image[0]);
    }

    await onSubmit(formData);

    if (mode === "create") {
      reset();
      setPreview("");
    }
  };

  return (
    <div className="product-form-card">
      <div className="form-header">
        <Link to="/admin/products" className="back-link">
          <FaArrowLeft />
          <span>Back to Products</span>
        </Link>
        <h2>
          {mode === "create" ? "Add Product" : "Edit Product"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              type="text"
              placeholder="Product Name"
              {...register("name", {
                required: "Product name is required",
              })}
            />
            {errors.name && <small>{errors.name.message}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              id="price"
              type="number"
              placeholder="Price ($)"
              step="0.01"
              {...register("price", {
                required: "Price required",
                min: 1,
              })}
            />
            {errors.price && <small>Enter valid price.</small>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              {...register("category", {
                required: true,
              })}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              type="number"
              placeholder="Available stock count..."
              {...register("stock", {
                required: "Stock required",
                min: 0,
              })}
            />
            {errors.stock && <small>Enter valid stock.</small>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={3}
              placeholder="Product description..."
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && <small>{errors.description.message}</small>}
          </div>

          <div className="form-group status-field">
            <label htmlFor="status">Status</label>
            <select id="status" {...register("status")}>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="product-image">Product Image</label>
          <p className="upload-note">
            JPG • PNG • WEBP &nbsp; | &nbsp; Maximum 2MB
          </p>

          <input
            id="product-image"
            type="file"
            accept="image/*"
            hidden
            {...register("image", {
              required: mode === "create",
            })}
          />

          <label htmlFor="product-image" className="upload-box">
            {preview ? (
              <>
                <img src={preview} alt="Product Preview" className="preview-image" />
                <div className="preview-overlay">
                  <FaCloudUploadAlt className="upload-icon-overlay" />
                  <span>Change Image</span>
                </div>
              </>
            ) : (
              <>
                <FaCloudUploadAlt className="upload-icon" />
                <h4>Click or Drag Image Here</h4>
                <p>Upload product image</p>
              </>
            )}
          </label>

          {preview && !image?.length && (
            <div className="preview-filename">
              <small>{product?.image?.split('/').pop() || 'Current image'}</small>
            </div>
          )}

          {errors.image && <small>{errors.image.message}</small>}
        </div>

        <div className="form-actions">
          {mode === "edit" && onCancel && (
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
          )}
          <button type="submit" disabled={loading} className="submit-btn">
            {loading
              ? "Saving..."
              : mode === "create"
                ? "Create Product"
                : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;