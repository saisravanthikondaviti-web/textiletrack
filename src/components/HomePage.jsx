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
    link: "https://en.wikipedia.org/wiki/Kanchipuram_silk_sari"
  },
  {
    name: "Banarasi Brocade",
    image:
      "https://akrithi.com/cdn/shop/files/IMG_1205.jpg?v=1725695680&width=2000",
    link: "https://en.wikipedia.org/wiki/Banarasi_sari"
  },
  {
    name: "Chanderi Cotton",
    image:
      "https://akrithi.com/cdn/shop/files/61BA01C7-6A27-4A97-922B-123F1B37C139.jpg?v=1711209062&width=2000",
    link: "https://en.wikipedia.org/wiki/Chanderi_sari"
  },
  {
    name: "Phulkari Embroidery",
    image:
      "https://static.wixstatic.com/media/229a21_1c04470654db4ba49f18f46e497ad460~mv2.jpg/v1/fill/w_290,h_386,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/229a21_1c04470654db4ba49f18f46e497ad460~mv2.jpg",
    link: "https://en.wikipedia.org/wiki/Phulkari"
  }
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

     <section className="about-section">
  <div className="about-container">

    <div className="about-text">
      <h2>About TextileTrack India</h2>
      <p>
        TextileTrack India helps textile businesses manage inventory,
        track production, and improve efficiency with smart technology.
        Our goal is to modernize the textile industry with simple and
        powerful digital tools.
      </p>
      <p>
        Built for manufacturers, wholesalers, and retailers — we bring
        real-time tracking and data-driven insights to your business.
      </p>
    </div>

    <div className="about-image">
      <img
        src="https://sewing.com/wp-content/uploads/2025/11/young-woman-fabric-samples-curtains-table-fabric-types-ss-FEATURED.jpg"
        alt="Textile Industry"
      />
    </div>

  </div>
</section>

      <section className="featured-section">
  <h2>Featured Textiles Across India</h2>

  <div className="featured-cards">
    {featuredTextiles.map((textile, i) => (
      <div className="featured-card" key={i}>
        <img src={textile.image} alt={textile.name} />

        <h4>{textile.name}</h4>
        <p>Authentic, traditional Indian textile</p>

        {/* External link or custom link */}
        <a
          href={textile.link}
          target="_blank"
          rel="noopener noreferrer"
          className="view-btn"
        >
          View
        </a>
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

      <section className="contact-section">
  <h2>Contact Us</h2>
  <p className="contact-subtitle">
    We’re here to help. Reach out anytime.
  </p>

  <div className="contact-list">

    <div className="contact-row">
      <div className="icon">✉️</div>
      <div>
        <h3>Email</h3>
        <p>support@textiletrack.in</p>
      </div>
    </div>

    <div className="contact-row">
      <div className="icon">📞</div>
      <div>
        <h3>Phone</h3>
        <p>+91 98765 43210</p>
      </div>
    </div>

    <div className="contact-row">
      <div className="icon">📍</div>
      <div>
        <h3>Address</h3>
        <p>123 Textile Street, India</p>
      </div>
    </div>

  </div>
</section>
    </div>
  );
}
