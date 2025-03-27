import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/aboutUs.css'; // Import the updated CSS

export default function AboutUs() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About <span>RentEase</span></h1>
        <p>Redefining rentals with convenience and affordability.</p>
      </div>

      {/* Content Wrapper */}
      <div className="about-content">
        {/* Who We Are */}
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            <strong>RentEase</strong> is a modern rental platform designed to make renting easy, affordable, and hassle-free. Whether it's home essentials, gadgets, or vehicles, we help you access what you need without the burden of ownership.
          </p>
        </section>

        {/* Our Mission */}
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are on a mission to <strong>eliminate unnecessary ownership costs</strong> by offering a seamless rental experience. Our goal is to make high-quality products accessible to everyone while promoting a culture of sharing and sustainability.
          </p>
        </section>

        {/* Key Features */}
        <section className="about-section features-section">
          <h2>Why Choose RentEase?</h2>
          <div className="features-grid">
            <div className="feature-card">💸 <strong>Zero Deposit</strong><br /> No hefty security deposits, pay as you go.</div>
            <div className="feature-card">📅 <strong>Flexible Rentals</strong><br /> Rent for a day, a week, or a month.</div>
            <div className="feature-card">🔒 <strong>Secure & Trusted</strong><br /> Verified users & safe transactions.</div>
            <div className="feature-card">🌍 <strong>Eco-Friendly</strong><br /> Reduce waste, rent instead of buying.</div>
          </div>
        </section>

        {/* Vision */}
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where ownership is a choice, not a necessity. By fostering a peer-to-peer rental economy, we’re making life easier, reducing financial strain, and helping the environment.
          </p>
        </section>

        {/* Call to Action */}
        <section className="about-footer">
          <h2>Join the RentEase Community!</h2>
          <p>Discover a smarter way to rent today.</p>
          <Link to="/rentals">
            <button className="explore-btn">🚀 Explore Rentals</button>
          </Link>
        </section>
      </div>
    </div>
  );
}
