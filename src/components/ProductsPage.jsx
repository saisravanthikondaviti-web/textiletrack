import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

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
    <div style={{ padding: "20px" }}>
      {/* Header: Profile, Orders, Cart */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          padding: "10px 0",
          zIndex: 100,
          borderBottom: "1px solid #ccc",
        }}
      >
        <h2>Products</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          <Link
            to="/user/profile"
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "bold",
            }}
          >
            Profile
          </Link>
          <Link
            to="/user/orders"
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "bold",
            }}
          >
            Orders
          </Link>
          <Link
            to="/user/cart"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "#007bff",
              padding: "8px 12px",
              borderRadius: "4px",
            }}
          >
            Cart ({cart.length})
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              borderRadius: "8px",
            }}
          >
            <img
              src={p.imageURL}
              alt={p.title}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <p>Price: ${p.price}</p>
            <p>Stock: {p.stock}</p>
            <button
              disabled={p.stock === 0}
              onClick={() => addToCart(p)}
              style={{
                padding: "8px 12px",
                backgroundColor: p.stock === 0 ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: p.stock === 0 ? "not-allowed" : "pointer",
              }}
            >
              {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}