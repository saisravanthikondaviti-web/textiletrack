import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(list);
    };
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <p>Order ID: {order.id}</p>
              <p>Total: ${order.total}</p>
              <p>Status: {order.status}</p>
              <p>Items:</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} x {item.quantity} (${item.price})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}