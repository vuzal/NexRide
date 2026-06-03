import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Navbar.css'
import cross from '../assets/cross.png'
import hamburger from '../assets/hamburger.png'
import nexRide_logo from '../assets/nexride_logo.png'

function Navbar({ favoritesCount, bookingsCount }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('nexride_active_user'))
    if (activeUser) {
      setUser(activeUser)
    }
  }, [])

  function handleSignOut() {
    localStorage.removeItem('nexride_active_user')
    localStorage.removeItem('nexride_favorites')
    localStorage.removeItem('nexride_bookings')
    
    navigate('/')
    window.location.reload()
  }

  function toggleMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  function closeMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          <img src={nexRide_logo} alt="NexRide Logo" className="logo-image" />
          <span className="logo-text">NexRide</span>
        </Link>
      </div>

      <div 
        className={`mobile-menu-icon ${isMobileMenuOpen ? 'active-icon' : ''}`} 
        onClick={toggleMenu}
      >
        <img 
          src={isMobileMenuOpen ? cross : hamburger} 
          className="menu-toggle-img"
        />
      </div>

      <div className={`navbar-content ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="navbar-links">
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/cars" onClick={closeMenu}>Cars</NavLink>
          {user && (
            <>
              <NavLink to="/favorites" className="favorites-link" onClick={closeMenu}>
                Favorites
              </NavLink>
              <NavLink to="/bookings" className="bookings-link" onClick={closeMenu}>
                My Bookings
              </NavLink>
            </>
          )}
          <NavLink to="/list-car" className="list-car-btn" onClick={closeMenu}>Rent Out Your Car</NavLink>
        </div>

        <div className="navbar-auth">
          {user ? (
            <>
              <span className="navbar-username">{user.fullName || user.email}</span>
              <button 
                className="signout-btn" 
                onClick={() => { handleSignOut(); closeMenu(); }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link" onClick={closeMenu}>Sign In</Link>
              <Link to="/signup" className="signup-btn" onClick={closeMenu}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar