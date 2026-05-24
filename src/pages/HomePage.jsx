import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()
  
  // Axtarış üçün sadə state-lər
  const [searchParams, setSearchParams] = useState({
    location: '',
    pickupDate: '',
    dropoffDate: ''
  })

  const handleSearch = (e) => {
    e.preventDefault()
    // Axtarış parametrlərini /cars səhifəsinə query string kimi ötürə bilərik
    navigate(`/cars?location=${searchParams.location}&pickup=${searchParams.pickupDate}&dropoff=${searchParams.dropoffDate}`)
  }

  return (
    <div className="home-page">
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Premium Cars.<br /><span>Instant Booking.</span></h1>
          <p>Unleash the ultimate driving experience. Choose from our elite fleet and hit the road in minutes.</p>
          <button className="hero-cta" onClick={() => navigate('/cars')}>Explore Fleet</button>
        </div>
        <div className="hero-image-container">
          {/* Bura qəşəng, tünd arxa fona uyğun bir idman və ya lüks maşın şəkli qoyulacaq */}
          <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80" alt="Luxury Car" className="hero-car-img" />
        </div>
      </div>

      {/* Booking Search Bar Section */}
      <div className="search-container">
        <form className="search-bar" onSubmit={handleSearch}>
          <div className="search-group">
            <label>Pick-up Location</label>
            <select 
              value={searchParams.location} 
              onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
              required
            >
              <option value="">Select City...</option>
              <option value="baku">Baku</option>
              <option value="ganja">Ganja</option>
              <option value="gabala">Gabala</option>
            </select>
          </div>
          
          <div className="search-group">
            <label>Pick-up Date</label>
            <input 
              type="date" 
              value={searchParams.pickupDate}
              onChange={(e) => setSearchParams({...searchParams, pickupDate: e.target.value})}
              required
            />
          </div>

          <div className="search-group">
            <label>Drop-off Date</label>
            <input 
              type="date" 
              value={searchParams.dropoffDate}
              onChange={(e) => setSearchParams({...searchParams, dropoffDate: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="search-btn">Find a Car</button>
        </form>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">Why Choose <span>NexRide</span></h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3>Wide Selection</h3>
            <p>From track-ready sports cars to spacious luxury SUVs, find the perfect match for your vibe.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3>Easy Booking</h3>
            <p>No endless paperwork. Smart interfaces mean you are approved and ready to roll in minutes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3>Best Prices</h3>
            <p>Transparent pricing with zero hidden fees. Premium experience that respects your budget.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3>List Your Car</h3>
            <p>Turn your idle asset into a cash machine. List on NexRide and let your car work for you.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage