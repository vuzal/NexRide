import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignUpPage.css'

function SignUpPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    const users = JSON.parse(localStorage.getItem('nexride_users')) || []
    const userExists = users.find(user => user.email === form.email)

    if (userExists) {
      setError('This email is already registered.')
      return
    }

    const newUser = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password
    }

    users.push(newUser)
    localStorage.setItem('nexride_users', JSON.stringify(users))
    localStorage.setItem('nexride_active_user', JSON.stringify(newUser))

    navigate('/')
    window.location.reload()
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <h1>Join <span>NexRide</span> Today</h1>
          <p>Create your account and start renting or listing cars in minutes.</p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <span>⚡</span>
              <p>Quick and easy registration</p>
            </div>
            <div className="auth-feature-item">
              <span>🔒</span>
              <p>Secure and private</p>
            </div>
            <div className="auth-feature-item">
              <span>🚗</span>
              <p>Access hundreds of cars</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Fill in your details to get started</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Vusal Abbasov"
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="vusal@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+994 50 000 00 00"
                required
              />
            </div>

            <div className="form-row-two">
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
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-btn">
              Create Account
            </button>

          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage