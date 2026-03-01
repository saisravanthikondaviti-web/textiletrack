// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">TextileTrack</h2>

      <div className="nav-links">
        <NavLink to="/user" end>Home</NavLink>
        <NavLink to="/user/products">Products</NavLink>
        <NavLink to="/user/cart">Cart</NavLink>
        <NavLink to="/user/orders">Orders</NavLink>
        <NavLink to="/user/profile">Profile</NavLink>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}