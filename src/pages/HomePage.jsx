import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <span className="hero-eyebrow">🏆 #1 Car Rental Platform</span>
          <h1>Premium Cars.<br /><span>Instant Booking.</span></h1>
          <p>Unleash the ultimate driving experience. Choose from our elite fleet and hit the road in minutes.</p>
          <div className="hero-btns">
            <button className="hero-cta" onClick={() => navigate('/cars')}>Explore Fleet</button>
            <button className="hero-cta-outline" onClick={() => navigate('/list-car')}>Rent Out Your Car</button>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="https://i.pinimg.com/1200x/d3/27/b5/d327b50debe40fd7d46ff654de794e6c.jpg"
            alt="Premium Car"
            className="hero-car-img"
          />
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
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
        <div className="features-grid">
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

      <div className="testimonials-section">
        <div className="testimonials-header">
          <h2>What Our Clients Say</h2>
          <p>Real experiences from real customers</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="rating-stars">★★★★★</div>
            <p className="testimonial-text">
              "Absolutely flawless experience. The BMW X7 was immaculate, and the service was top-notch. Will definitely use again!"
            </p>
            <div className="client-profile">
              <div className="client-avatar color-s">S</div>
              <div className="client-info">
                <h4>Sarah Johnson</h4>
                <span>Business Executive</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="rating-stars">★★★★★</div>
            <p className="testimonial-text">
              "Booked a Porsche for a special weekend. Everything was seamless from booking to return. Highly recommend NexRide!"
            </p>
            <div className="client-profile">
              <div className="client-avatar color-m">M</div>
              <div className="client-info">
                <h4>Michael Chen</h4>
                <span>Entrepreneur</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="rating-stars">★★★★★</div>
            <p className="testimonial-text">
              "The Tesla Model S was incredible. Easy booking process and excellent customer service. Made my trip unforgettable!"
            </p>
            <div className="client-profile">
              <div className="client-avatar color-e">E</div>
              <div className="client-info">
                <h4>Emma Williams</h4>
                <span>Travel Blogger</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Hit the Road?</h2>
          <p>Join thousands of happy drivers. Book your dream car today.</p>
          <div className="cta-btns">
            <button onClick={() => navigate('/cars')} className="cta-primary">Browse Cars</button>
            <button onClick={() => navigate('/list-car')} className="cta-secondary">Rent Out Your Car</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage