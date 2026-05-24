import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        
        <div className="footer-column footer-brand">
          <h3>Nex<span>Ride</span></h3>
          <p className="brand-description">
            Experience the ultimate convenience in car rentals. Elite vehicles, transparent pricing, and instant booking at your fingertips.
          </p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <div className="footer-links-list">
            <Link to="/">Home</Link>
            <Link to="/cars">Explore Fleet</Link>
            <Link to="/list-car">List Your Car</Link>
          </div>
        </div>

        <div className="footer-column">
          <h4>Our Fleet</h4>
          <div className="footer-links-list">
            <Link to="/cars?category=Sedan">Sedans</Link>
            <Link to="/cars?category=SUV">Luxury SUVs</Link>
            <Link to="/cars?category=Electric">Electric / Hybrid</Link>
            <Link to="/cars?category=Convertible">Convertibles</Link>
          </div>
        </div>

        <div className="footer-column footer-contact">
          <h4>Contact Us</h4>
          <div className="contact-info-list">
            <p className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>info@nexride.com</span>
            </p>
            <p className="contact-item">
              <i className="fas fa-phone-alt"></i>
              <span>+994 50 000 00 00</span>
            </p>
            <p className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Baku, Azerbaijan</span>
            </p>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="copyright">© 2026 NexRide. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <span className="divider">•</span>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer