import React from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useCart } from "../context/CartContext";
import "../styles/checkout.css";

const Checkout = () => {
  const { cartItems = [], clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate total
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,
        items: cartItems,
        total: totalAmount,
        status: "Processing",
        createdAt: serverTimestamp(),
      });

      alert("Order placed successfully ✅");

      clearCart(); // clear cart after order

      navigate("/user/orders"); // redirect to orders page
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="checkout-container">
      <h2>🛍 Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <p>{item.title}</p>
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            ))}
          </div>

          <h3>Total: ₹{totalAmount}</h3>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;