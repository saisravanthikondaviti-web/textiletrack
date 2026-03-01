import React from "react";

export default function Sidebar({ setActivePage }) {
  return (
    <div className="sidebar">
      <h2>TexTrack</h2>
      <button onClick={() => setActivePage("home")}>Home</button>
      <button onClick={() => setActivePage("cart")}>Cart</button>
      <button onClick={() => setActivePage("orders")}>My Orders</button>
      <button onClick={() => setActivePage("profile")}>Profile</button>
    </div>
  );
}