import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">TextileTrack</h2>

      <div className="nav-links">
        <NavLink to="/user" end>Home</NavLink>
        <NavLink to="/user/products">Products</NavLink>
        <NavLink to="/user/cart">Cart</NavLink>
        <NavLink to="/user/orders">Orders</NavLink>
        <NavLink to="/user/profile">Profile</NavLink>
      </div>
    </nav>
  );
}