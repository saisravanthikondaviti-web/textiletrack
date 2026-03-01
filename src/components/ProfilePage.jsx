import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
  const [orderCount, setOrderCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;

      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", auth.currentUser.uid)
        );

        const snapshot = await getDocs(q);
        setOrderCount(snapshot.size);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>👤 My Profile</h2>

        <div className="profile-info">
          <p><strong>Email:</strong> {auth.currentUser?.email}</p>
          <p><strong>User ID:</strong> {auth.currentUser?.uid}</p>
          <p><strong>Total Orders:</strong> {orderCount}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}