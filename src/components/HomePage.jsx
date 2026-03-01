// src/components/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function HomePage() {
  const featuredTextiles = [
    {
      name: "Kanchipuram Silk",
      image:
        "https://i.pinimg.com/474x/8a/23/e5/8a23e5b45c22b1ebcef3347670a7bb7c.jpg",
    },
    {
      name: "Banarasi Brocade",
      image:
        "https://akrithi.com/cdn/shop/files/IMG_1205.jpg?v=1725695680&width=2000",
    },
    {
      name: "Chanderi Cotton",
      image:
        "https://www.sarojfabrics.com/pub/media/catalog/product/cache/e461f6a7c3abe4058405e5b51e40efd3/s/f/sf20616d.jpg",
    },
    {
      name: "Phulkari Embroidery",
      image:
        "https://chhotisiasha.org/cdn/shop/files/IMG_1875_8e79c743-1178-4236-8426-9bd788e89ed7.jpg?crop=center&height=2048&v=1684566948&width=2048",
    },
  ];

  const aboutCards = [
    {
      title: "Discover Regional Textiles",
      desc: "Explore traditional textiles from every state of India – silks, handlooms, and cottons.",
    },
    {
      title: "Manage Your Cart",
      desc: "Add your favorite textiles to your cart and keep track of your selections easily.",
    },
    {
      title: "Track Orders & Delivery",
      desc: "Know when your precious textiles arrive safely at your doorstep.",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Explore India’s Finest Textiles</h1>
            <p>
              From Kanchipuram silks to Banarasi brocades, discover, shop, and
              manage your textile collections seamlessly.
            </p>
            <Link to="/user/products" className="hero-btn">
              Browse Textiles
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About TextileTrack India</h2>
        <div className="about-cards">
          {aboutCards.map((card, i) => (
            <div className="glass-card" key={i}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <h2>Featured Textiles Across India</h2>
        <div className="featured-cards">
          {featuredTextiles.map((textile, i) => (
            <div className="glass-card featured-card" key={i}>
              <img src={textile.image} alt={textile.name} />
              <h4>{textile.name}</h4>
              <p>Authentic, traditional Indian textile</p>
              {/* Pass the textile name/type as query parameter */}
              <Link
                to={`/user/products?type=${encodeURIComponent(textile.name.split(" ")[0])}`}
                className="view-btn"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-card">
            <h3>How do I order regional textiles?</h3>
            <p>
              Browse the featured textiles, add to cart, and checkout easily.
            </p>
          </div>
          <div className="faq-card">
            <h3>Do you deliver nationwide?</h3>
            <p>
              Yes! We deliver authentic Indian textiles across all states in
              India.
            </p>
          </div>
          <div className="faq-card">
            <h3>Are the textiles authentic?</h3>
            <p>
              All our products are sourced directly from certified local
              artisans and weavers.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-cards">
          <div className="contact-card">
            <h3>Email</h3>
            <p>support@textiletrack.in</p>
          </div>
          <div className="contact-card">
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div className="contact-card">
            <h3>Address</h3>
            <p>123 Textile Street, India</p>
          </div>
        </div>
      </section>
    </div>
  );
}
