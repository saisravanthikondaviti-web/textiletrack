// src/components/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";
import "../styles.css";

function Modal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <h2>{product.title}</h2>
        <img src={product.imageURL} alt={product.title} />
        <p>{product.description}</p>

        {/* Additional details */}
        <p><strong>Fabric Type:</strong> {product.type}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Care:</strong> {product.care}</p>
        <p><strong>Pattern:</strong> {product.pattern}</p>

        <p className="price-stock">
          <span>Price: ₹{product.price}</span>
          <span>Stock: {product.stock}</span>
        </p>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeFromQuery = queryParams.get("type"); // Read type from URL query

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(typeFromQuery || "All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const fabricTypes = ["Cotton", "Silk", "Wool", "Linen"];

  useEffect(() => {
    const fetchProductsByType = async (type) => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${type}+fabric&per_page=5&client_id=pNnM32pfVS32O67pIJn_fOFNs8kmSMT4oDe0mCOikSU`
      );
      const data = await response.json();
      return data.results.map((img) => ({
        id: img.id,
        title: img.alt_description || `${type} Fabric`,
        description: `High-quality ${type} textile fabric`,
        imageURL: img.urls.small,
        price: Math.floor(Math.random() * 500) + 100,
        stock: Math.floor(Math.random() * 50) + 1,
        type: type,
        category: "Textile",
        care: "Hand wash or gentle machine wash",
        pattern: ["Plain", "Striped", "Checked", "Polka"][Math.floor(Math.random() * 4)],
      }));
    };

    const fetchAllProducts = async () => {
      try {
        const allProductsArrays = await Promise.all(
          fabricTypes.map((type) => fetchProductsByType(type))
        );
        setProducts(allProductsArrays.flat());
      } catch (error) {
        console.error("Error fetching Unsplash images:", error);
      }
    };

    fetchAllProducts();
  }, []);

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((p) => p.type.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      {/* Filter Bar */}
      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === "All" ? "active-filter" : ""}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        {fabricTypes.map((type) => (
          <button
            key={type}
            className={`filter-btn ${filter === type ? "active-filter" : ""}`}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="homepage-products-grid">
        {filteredProducts.length === 0 && <p>Loading products...</p>}

        {filteredProducts.map((p) => (
          <div className="glass-card" key={p.id}>
            <img src={p.imageURL} alt={p.title} />
            <h4>{p.title}</h4>
            <p>{p.description}</p>

            <div className="meta-info">
              <span>Type: {p.type}</span>
              <span>Category: {p.category}</span>
            </div>

            <p className="price-stock">
              <span>Price: ₹{p.price}</span>
              <span>Stock: {p.stock}</span>
            </p>

            <div className="card-buttons">
              <button
                disabled={p.stock === 0}
                onClick={() => addToCart(p)}
                className={`add-btn ${p.stock === 0 ? "disabled-btn" : ""}`}
              >
                {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                onClick={() => setSelectedProduct(p)}
                className="read-more-btn"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}