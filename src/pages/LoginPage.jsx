import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('') 
  }

  function handleSubmit(e) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('nexride_users')) || []

    const validUser = users.find(
      user => user.email === form.email && user.password === form.password
    )

    if (validUser) {
      localStorage.setItem('nexride_active_user', JSON.stringify(validUser))
      
      navigate('/')
      window.location.reload()
    } else {
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <h1>Welcome back to <span>NexRide</span></h1>
          <p>Sign in to manage your bookings, listings, and more.</p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <span>🚗</span>
              <p>Access your booked cars</p>
            </div>
            <div className="auth-feature-item">
              <span>📋</span>
              <p>Manage your listings</p>
            </div>
            <div className="auth-feature-item">
              <span>💳</span>
              <p>View payment history</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Sign In</h2>
          <p className="auth-subtitle">Enter your credentials to continue</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              Sign In
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage