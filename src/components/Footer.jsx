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

        <div className="footer-column footer-contact">
          <h4>Contact Us</h4>
          <div className="contact-info-list">
            <p className="contact-item">
              <span className="contact-icon">✉</span>
              <span>NexRide@gmail.com</span>
            </p>
            <p className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+994 50 000 00 00</span>
            </p>
            <p className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Baku, Azerbaijan</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer