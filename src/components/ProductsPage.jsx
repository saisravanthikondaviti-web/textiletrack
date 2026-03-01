import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="homepage-style">
      {/* Hero-like Header */}
      <div className="products-hero">
        <h1>Explore Our Textiles Across India</h1>
        <p>Traditional, authentic, and handcrafted fabrics for every style.</p>
      </div>

      {/* Sticky Header Links */}
      <div className="products-links-glass">
        <Link to="/user/profile" className="link-btn-glass">
          Profile
        </Link>
        <Link to="/user/orders" className="link-btn-glass">
          Orders
        </Link>
        <Link to="/user/cart" className="cart-btn-glass">
          Cart ({cart.length})
        </Link>
      </div>

      {/* Products Grid */}
      <div className="homepage-products-grid">
        {products.map((p) => (
          <div className="glass-card" key={p.id}>
            <img src={p.imageURL} alt={p.title} />
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <p className="price-stock">
              <span>Price: ${p.price}</span>
              <span>Stock: {p.stock}</span>
            </p>
            <button
              disabled={p.stock === 0}
              onClick={() => addToCart(p)}
              className={`add-btn ${p.stock === 0 ? "disabled-btn" : ""}`}
            >
              {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}