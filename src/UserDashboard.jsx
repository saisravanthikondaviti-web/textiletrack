import { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import "./styles.css";

function UserDashboard() {
  const [activePage, setActivePage] = useState("home"); // home, cart, orders, profile

  return (
    <div className="dashboard-container">
      <Sidebar setActivePage={setActivePage} />
      <div className="main-content">
        <TopBar />
        {activePage === "home" && <Products />}
        {activePage === "cart" && <Cart />}
        {activePage === "orders" && <Orders />}
        {activePage === "profile" && <Profile />}
      </div>
    </div>
  );
}

export default UserDashboard;