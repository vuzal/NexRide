import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import logoImg from '../assets/logo.png'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logoImg} alt="NexRide Logo" className="logo-image" />
                    <span className="logo-text">NexRide</span>
                </Link>
            </div>

            <div className="navbar-links">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/cars">Cars</NavLink>
                <NavLink to="/list-car" className="list-car-btn">List Your Car</NavLink>
            </div>

            <div className="navbar-auth">
                <Link to="/login" className="login-link">Sign In</Link>
            </div>
        </nav>
    )
}

export default Navbar