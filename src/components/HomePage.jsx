import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function HomePage() {
  const [contact, setContact] = useState({ email: "", phone: "", address: "" });

  // Fetch contact info from Firestore
  useEffect(() => {
    const fetchContact = async () => {
      const ref = doc(db, "appInfo", "contact"); // Firestore: collection "appInfo", doc "contact"
      const snap = await getDoc(ref);
      if (snap.exists()) setContact(snap.data());
    };
    fetchContact();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          height: "400px",
          background: "url('https://source.unsplash.com/1600x400/?textile') center/cover no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <h1>Welcome to TextileTrack</h1>
        <p>Empowering your textile experience with ease and innovation</p>
        <a
          href="/user/products"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Explore Products
        </a>
      </section>

      {/* About Section */}
      <section style={{ padding: "50px 20px", backgroundColor: "#f9f9f9" }}>
        <h2>About TextileTrack</h2>
        <p>
          Our mission is to simplify the textile industry by providing a digital
          platform for products, orders, and seamless user experience.  
          We connect manufacturers, retailers, and users in one place.
        </p>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: "50px 20px" }}>
        <h2>Frequently Asked Questions</h2>
        <div>
          <details style={{ marginBottom: "10px" }}>
            <summary>How do I place an order?</summary>
            <p>Add products to your cart, go to checkout, and place the order.</p>
          </details>
          <details style={{ marginBottom: "10px" }}>
            <summary>Can I track my order?</summary>
            <p>Yes! You can see all your orders in the Orders page.</p>
          </details>
          <details style={{ marginBottom: "10px" }}>
            <summary>How can I contact support?</summary>
            <p>Use the contact section below to reach out to us directly.</p>
          </details>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: "50px 20px", backgroundColor: "#f9f9f9" }}>
        <h2>Contact Us</h2>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Address: {contact.address}</p>
      </section>
    </div>
  );
}