import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import './Navbar.css'
import logoImg from '../assets/logo.png'

function Navbar({ favoritesCount }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  async function handleSignOut() {
    await signOut(auth)
    localStorage.removeItem('nexride_favorites')
    navigate('/')
    window.location.reload()
  }

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
        {user && (
          <NavLink to="/favorites" className="favorites-link">
            ❤️ Favorites
          </NavLink>
        )}
        <NavLink to="/list-car" className="list-car-btn">List Your Car</NavLink>
      </div>

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-username">{user.displayName || user.email}</span>
            <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-link">Sign In</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar