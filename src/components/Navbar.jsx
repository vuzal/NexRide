import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">NexRide</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/list-car">List Your Car</Link>
      </div>
    </nav>
  )
}

export default Navbar