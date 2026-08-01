import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import useCart from "../../context/CartContext";

import Loader from "../../components/loader/Loader";
import ProductDetailsModal from "./ProductDetailsModal";
import { getProducts } from "../../services/productService";

import "./customer-styling/Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const [searchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";
    const sort = searchParams.get("sort") || "newest";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.products);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product, 1);
    };

    const handleProductClick = (productId) => {
        setSelectedProductId(productId);
        // Update URL without page reload
        window.history.pushState(null, '', `/products/${productId}`);
    };

    const handleCloseModal = () => {
        setSelectedProductId(null);
        // Remove product ID from URL
        window.history.pushState(null, '', '/products');
    };

    // Close modal on popstate (back button)
    useEffect(() => {
        const handlePopState = () => {
            setSelectedProductId(null);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const filteredProducts = useMemo(() => {
        let filtered = [...products];
        if (search.trim()) {
            filtered = filtered.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }
        if (category !== "All") {
            filtered = filtered.filter(
                product => product.category === category
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
            case "price-low":
                filtered.sort((a, b) =>
                    a.price - b.price
                );
                break;
            case "price-high":
                filtered.sort((a, b) =>
                    b.price - a.price
                );
                break;
            case "oldest":
                filtered.sort((a, b) =>
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
                );
                break;
            default:
                filtered.sort((a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );
        }
        return filtered;
    }, [products, search, category, sort]);

    if (loading) {
        return (
            <Loader
                message="Loading delicious products..."
            />
        );
    }

    return (
        <>
            <section className="products-page">
                <div className="products-heading">
                    <h1>
                        Freshly Baked Every Day
                    </h1>
                    <p>
                        Browse our handcrafted bakery collection made with love.
                    </p>
                </div>

                {
                    filteredProducts.length === 0 && (
                        <div className="empty-products">
                            <span>🍩</span>
                            <h2>No Products Found</h2>
                            <p>
                                Try another search or category.
                            </p>
                        </div>
                    )
                }

                <div className="products-grid">
                    {
                        filteredProducts.map(product => (
                            <div
                                key={product._id}
                                className="product-card"
                            >
                                <div className="product-image-wrapper">
                                    <div className="product-image">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            loading="lazy"
                                        />
                                        <div className="image-overlay">
                                            <button
                                                className="quick-view"
                                                onClick={() => handleProductClick(product._id)}
                                            >
                                                Quick View
                                            </button>
                                        </div>
                                    </div>
                                    <span className="category-badge">
                                        {product.category}
                                    </span>
                                    {product.stock === 0 && (
                                        <span className="sold-out-badge">Sold Out</span>
                                    )}
                                </div>

                                <div className="product-info">
                                    <div className="product-header">
                                        <h3 onClick={() => handleProductClick(product._id)}>
                                            {product.name}
                                        </h3>
                                        <div className="rating">
                                            <span className="stars">★★★★★</span>
                                            <span className="rating-count">(24)</span>
                                        </div>
                                    </div>

                                    <p className="description">
                                        {
                                            product.description.length > 70
                                                ?
                                                product.description.slice(0, 70) + "..."
                                                :
                                                product.description
                                        }
                                    </p>

                                    <div className="product-footer">
                                        <div className="price-stock">
                                            <span className="price">
                                                Rs. {Number(product.price).toLocaleString()}
                                            </span>
                                            <span
                                                className={`stock ${product.stock > 0 ? "in" : "out"}`}
                                            >
                                                {
                                                    product.stock > 0
                                                        ?
                                                        "✓ In Stock"
                                                        :
                                                        "✕ Out of Stock"
                                                }
                                            </span>
                                        </div>

                                        <div className="product-actions">
                                            <button
                                                className="cart-btn"
                                                disabled={product.stock === 0}
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add To Cart
                                            </button>

                                            <button
                                                className="view-btn"
                                                onClick={() => handleProductClick(product._id)}
                                            >
                                                <span>View</span>
                                                <svg
                                                    className="arrow-icon"
                                                    viewBox="0 0 24 24"
                                                    width="18"
                                                    height="18"
                                                >
                                                    <path
                                                        d="M5 12h14M12 5l7 7-7 7"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* Product Details Modal */}
            {selectedProductId && (
                <ProductDetailsModal
                    productId={selectedProductId}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

export default Products;