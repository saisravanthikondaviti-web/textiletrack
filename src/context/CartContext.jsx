import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ inside the component

  // Load cart when user logs in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const ref = doc(db, "users", user.uid);
          const snap = await getDoc(ref);
          const data = snap.data();
          if (data && data.cart) setCart(data.cart);
        } catch (error) {
          console.error("Error loading cart:", error);
        }
      } else {
        setCart([]); // clear cart if logged out
      }
      setLoading(false); // ✅ finished loading
    });

    return () => unsubscribe();
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const ref = doc(db, "users", user.uid);
          await setDoc(ref, { cart }, { merge: true });
        } catch (error) {
          console.error("Error saving cart:", error);
        }
      }
    };

    if (!loading) saveCart(); // only save after initial load
  }, [cart, loading]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.id === product.id);
      if (existing) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  };

  // Wait until cart is loaded before rendering children
  if (loading) return <p>Loading cart...</p>;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);