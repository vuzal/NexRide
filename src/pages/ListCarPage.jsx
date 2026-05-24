import { useState } from 'react'
import './ListCarPage.css'

function ListCarPage() {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: '',
    category: '',
    transmission: '',
    seats: '',
    pricePerDay: '',
    image: '',
    description: '',
  })

  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="listcar-page">
        <div className="success-box">
          <h2>Listing Submitted!</h2>
          <p>Your {form.brand} {form.model} has been listed successfully.</p>
          <button onClick={() => setSubmitted(false)}>Add Another Car</button>
        </div>
      </div>
    )
  }

  return (
    <div className="listcar-page">
      <h2>List Your Car</h2>
      <p className="subtitle">Fill in the details below to list your car for rent.</p>

      <form onSubmit={handleSubmit} className="listcar-form">

        <div className="form-row">
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Toyota"
              required
            />
          </div>

          <div className="form-group">
            <label>Model</label>
            <input
              type="text"
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="Camry"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="2022"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Convertible">Convertible</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Transmission</label>
            <select name="transmission" value={form.transmission} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div className="form-group">
            <label>Seats</label>
            <input
              type="number"
              name="seats"
              value={form.seats}
              onChange={handleChange}
              placeholder="5"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Price Per Day ($)</label>
          <input
            type="number"
            name="pricePerDay"
            value={form.pricePerDay}
            onChange={handleChange}
            placeholder="45"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell us about your car..."
            rows="4"
            required
          />
        </div>

        <button type="submit">Submit Listing</button>

      </form>
    </div>
  )
}

export default ListCarPage