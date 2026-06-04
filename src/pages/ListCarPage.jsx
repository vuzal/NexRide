import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ListCarPage.css'

function ListCarPage({ addCar }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: '',
    category: '',
    transmission: '',
    seats: '',
    pricePerDay: '',
    image: '',
    fuel: '',
    horsepower: '',
    description: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('nexride_active_user'))
    if (activeUser) {
      setUser(activeUser)
    }
  }, [])

  function handleChange(e) {
  const inputName = e.target.name;
  const inputValue = e.target.value; 
  const updatedForm = { ...form };
  updatedForm[inputName] = inputValue;
  setForm(updatedForm);
}

  function handleSubmit(e) {
    e.preventDefault()
    addCar({
      ...form,
      id: Date.now(),
      year: parseInt(form.year),
      seats: parseInt(form.seats),
      pricePerDay: parseInt(form.pricePerDay),
      horsepower: parseInt(form.horsepower),
      available: true,
      ownerId: user.email 
    })
    setSubmitted(true)
  }

  if (!user) {
    return (
      <div className="auth-check">
        <div className="auth-check-card">
          <span className="auth-check-icon">🔒</span>
          <h2>Sign In Required</h2>
          <p>You need to be signed in to rent out your car.</p>
          <div className="auth-check-btns">
            <button onClick={() => navigate('/login')} className="auth-check-btn-signIn">
              Sign In
            </button>
            <button onClick={() => navigate('/signup')} className="auth-check-btn-createAccount">
              Create Account
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="listcar-page-container">
        <div className="success-preview-wrapper">
          <div className="success-icon">✓</div>
          <h2>Listing Successfully Submitted!</h2>

          <div className="preview-card">
            <div className="preview-car-image">
              <img src={form.image || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80'} alt="Car Preview" />
            </div>
            <div className="preview-car-details">
              <div className="preview-title-row">
                <h3>{form.brand} <span>{form.model}</span></h3>
              </div>
              <div className="preview-price">
                <strong>${form.pricePerDay}</strong><span>/day</span>
              </div>
            </div>
          </div>

          <div className="success-buttons">
            <button className="go-all-cars" onClick={() => navigate('/cars')}>
              Go to Cars
            </button>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="listcar-page-container">
      <div className="form-card-wrapper">
        <div className="form-header-title">
          <h2>Vehicle Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="car-list-form">
          <div className="form-fields-list">

            <div className="form-input-group">
              <label>Car Brand</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="e.g. Porsche"
                required
              />
            </div>

            <div className="form-input-group">
              <label>Car Model</label>
              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="e.g. Taycan 4S"
                required
              />
            </div>

            <div className="form-input-group">
              <label>Production Year</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="e.g. 2024"
                max="2026"
                required
              />
            </div>

            <div className="form-input-group">
              <label>Body Category</label>
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select category...</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            <div className="form-input-group">
              <label>Transmission</label>
              <select name="transmission" value={form.transmission} onChange={handleChange} required>
                <option value="">Select transmission...</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="form-input-group">
              <label>Seats Capacity</label>
              <input
                type="number"
                name="seats"
                value={form.seats}
                onChange={handleChange}
                placeholder="e.g. 4"
                min="2"
                max="8"
                required
              />
            </div>

            <div className="form-input-group">
              <label>Daily Price Target ($)</label>
              <input
                type="number"
                name="pricePerDay"
                value={form.pricePerDay}
                onChange={handleChange}
                placeholder="e.g. 150"
                min="10"
                required
              />
            </div>

            <div className="form-input-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>

            <div className="form-input-group">
              <label>Fuel Type</label>
              <select name="fuel" value={form.fuel} onChange={handleChange} required>
                <option value="">Select fuel type...</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-input-group">
              <label>Horsepower (hp)</label>
              <input
                type="number"
                name="horsepower"
                value={form.horsepower}
                onChange={handleChange}
                placeholder="e.g. 250"
                min="50"
                required
              />
            </div>

          </div>

          <div className="form-textarea-group">
            <label>What's Included (separate with commas)</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. GPS Navigation, Full Insurance, Sunroof, Apple CarPlay"
              rows="4"
              required
            />
          </div>

          <button type="submit" className="submit-listing-btn">
            Rent out your car
          </button>
        </form>
      </div>
    </div>
  )
}

export default ListCarPage