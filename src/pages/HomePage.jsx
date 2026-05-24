import { useNavigate } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">

      <div className="hero">
        <h1>Find Your Perfect Ride</h1>
        <p>Browse hundreds of cars and book instantly at the best price.</p>
        <button onClick={() => navigate('/cars')}>Browse Cars</button>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Wide Selection</h3>
          <p>Choose from sedans, SUVs, and more to fit your needs.</p>
        </div>
        <div className="feature-card">
          <h3>Easy Booking</h3>
          <p>Book your car in minutes with our simple booking form.</p>
        </div>
        <div className="feature-card">
          <h3>Best Prices</h3>
          <p>Compare prices and find the best deal for your budget.</p>
        </div>
        <div className="feature-card">
          <h3>List Your Car</h3>
          <p>Have a car? List it on NexRide and start earning today.</p>
        </div>
      </div>

    </div>
  )
}

export default HomePage