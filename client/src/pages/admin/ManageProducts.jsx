import { useEffect, useState, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProductTable from "../../components/admin/ProductTable";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { getProducts, deleteProduct } from "../../services/productService";
import Loader from "../../components/loader/Loader";


function ManageProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);  
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);  

  const { setTopbarConfig } = useOutletContext();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest")  

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      setTopbarConfig({
          title:"Manage Products",
          search,
          setSearch,
          sort,
          setSort,
          placeholder:"Search products...",
          actionButton: {
              label: "+",
              to: "/admin/products/add",
          },
          clearFilters,
      });
  },[ search, sort, ]);

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

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "az":
        filtered.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "za":
        filtered.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );
        break;

      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return filtered;
  }, [products, search, sort]);

  const clearFilters = () => {
    setSearch("");
    setSort("newest");
  };

  if (loading) {
    return <Loader message="Loading products..." />;
  }

  return (
    <div>
      <ProductTable
        products={filteredProducts}
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