import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>NexRide</h3>
          <p>The easiest way to rent or list a car.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/list-car">List Your Car</Link>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>info@nexride.com</p>
          <p>+994 50 000 00 00</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 NexRide. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer