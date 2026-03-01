import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import "../styles/orders.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "orders"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(list);
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-title">📦 Your Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>No orders placed yet.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h4>Order #{order.id.slice(0, 6)}</h4>
                  <p className="order-date">
                    {order.createdAt?.toDate().toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`status-badge ${
                    order.status === "Completed"
                      ? "completed"
                      : order.status === "Processing"
                      ? "processing"
                      : "pending"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-body">
                <p className="order-total">Total: ₹{order.total}</p>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div>
                      <p>{item.title}</p>
                      <small>
                        ₹{item.price} × {item.quantity}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}