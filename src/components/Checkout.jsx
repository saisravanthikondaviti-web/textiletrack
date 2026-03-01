import React from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,
        items: cart,
        total: totalAmount,
        status: "Processing",
        createdAt: serverTimestamp(),
      });

      alert("Order placed successfully ✅");

      clearCart();

      navigate("/user/orders");
    } catch (error) {
      console.error("FULL ERROR:", error);
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "10px" }}>
              <p>
                {item.title} — ₹{item.price} × {item.quantity}
              </p>
            </div>
          ))}

          <h3>Total: ₹{totalAmount}</h3>

          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
