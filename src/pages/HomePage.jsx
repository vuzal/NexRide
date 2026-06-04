import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <span className="home-hero-info">🏆 #1 Car Rental Platform</span>
          <h1>Premium Cars.<br /><span>Instant Booking.</span></h1>
          <p>Unleash the ultimate driving experience. Choose from our elite fleet and hit the road in minutes.</p>
          <div className="hero-btns">
            <button className="hero-btn" onClick={() => navigate('/cars')}>Explore Fleet</button>
            <button className="hero-btn-rent" onClick={() => navigate('/list-car')}>Rent Out Your Car</button>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="https://i.pinimg.com/1200x/d3/27/b5/d327b50debe40fd7d46ff654de794e6c.jpg"
            alt="Car"
            className="hero-car-img"
          />
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-list">
          <div className="stat-card">
            <h2>500+</h2>
            <p>Premium Cars</p>
          </div>
          <div className="stat-card">
            <h2>50K+</h2>
            <p>Happy Clients</p>
          </div>
          <div className="stat-card">
            <h2>4.9★</h2>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Choose <span>NexRide</span></h2>
        <div className="features-list">
          <div className="feature-card">
            <div className="feature-icon">🚗</div>
            <h3>Wide Selection</h3>
            <p>From track-ready sports cars to spacious luxury SUVs, find the perfect match for your vibe.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Easy Booking</h3>
            <p>No endless paperwork. Smart interfaces mean you are approved and ready to roll in minutes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Transparent pricing with zero hidden fees. Premium experience that respects your budget.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔑</div>
            <h3>List Your Car</h3>
            <p>Turn your idle asset into a cash machine. List on NexRide and let your car work for you.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage