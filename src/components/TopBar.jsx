import React from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function TopBar() {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div className="top-bar">
      <h3>Welcome to TexTrack!</h3>
      <button className="top-btn danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}