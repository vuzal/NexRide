import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './CarDetailPage.css'

function CarDetailPage({ cars = [] }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const car = cars.find(car => car.id === parseInt(id))

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: '',
    startDate: '',
    endDate: '',
  })

  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  const totalDays =
    form.startDate && form.endDate
      ? Math.ceil(
        (new Date(form.endDate) - new Date(form.startDate)) /
        (1000 * 60 * 60 * 24)
      )
      : 0

  const totalPrice = totalDays * car?.pricePerDay

  if (!car) {
    return <div className="not-found">Car not found.</div>
  }

  if (submitted) {
    return (
      <div className="success-container">
        <div className="receipt-card">
          <div className="success-icon">✓</div>
          <h2>Booking Confirmed</h2>
          <p className="success-subtitle">Your ride is reserved and ready.</p>
          <div className="receipt-divider"></div>
          <div className="receipt-details">
            <div className="receipt-row">
              <span>Driver</span>
              <strong>{form.name}</strong>
            </div>
            <div className="receipt-row">
              <span>Vehicle</span>
              <strong>{car.brand} {car.model}</strong>
            </div>
            <div className="receipt-row">
              <span>Pickup</span>
              <strong>{form.pickupLocation}</strong>
            </div>
            <div className="receipt-row">
              <span>Duration</span>
              <strong>{totalDays} days</strong>
            </div>
            <div className="receipt-row total-highlight">
              <span>Total</span>
              <strong>${totalPrice}</strong>
            </div>
          </div>
          <button className="back-fleet-btn" onClick={() => navigate('/cars')}>
            Back to Fleet
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-page-wrapper">

      <button className="back-link-btn" onClick={() => navigate('/cars')}>
        ← Back to fleet
      </button>

      <div className="detail-main-grid">

        {/* Sol tərəf */}
        <div className="detail-left">

          <div className="car-image-block">
            <img src={car.image} alt={car.model} className="car-main-image" />
          </div>

          <div className="car-info-block">
            <div className="car-info-top">
              <div>
                <span className="car-category-tag">{car.category} CAR</span>
                <h1>{car.brand} {car.model}</h1>
                <p className="car-description">
                  The {car.brand} {car.model} delivers an exceptional driving experience
                  combining comfort, performance and style. Perfect for any journey
                  with {car.transmission.toLowerCase()} transmission and {car.horsepower}hp engine.
                </p>
              </div>
              <div className="car-price-tag">
                <span className="price-big">${car.pricePerDay}</span>
                <span className="price-sub">per day</span>
              </div>
            </div>

            <div className="specs-row">
              <div className="spec-item">
                <span className="spec-icon">👥</span>
                <span>{car.seats} Seats</span>
              </div>
              <div className="spec-item">
                <span className="spec-icon">⚙️</span>
                <span>{car.transmission}</span>
              </div>
              <div className="spec-item">
                <span className="spec-icon">⛽</span>
                <span>{car.fuel}</span>
              </div>
              <div className="spec-item">
                <span className="spec-icon">⚡</span>
                <span>{car.horsepower} hp</span>
              </div>
            </div>
          </div>

          <div className="detail-bottom-grid">
            <div className="amenities-card">
              <h3>What's Included</h3>
              <ul className="amenities-list">
                <li>Full Insurance (CDW)</li>
                <li>GPS Navigation</li>
                <li>Apple CarPlay & Android Auto</li>
                <li>Premium Audio System</li>
                <li>24/7 Roadside Assistance</li>
                <li>Free Cancellation</li>
              </ul>
            </div>

            <div className="policy-card">
              <h3>Rental Policy</h3>
              <ul className="policy-list">
                <li>
                  <span className="policy-icon">🪪</span>
                  <div>
                    <strong>Valid Driver's License</strong>
                    <p>Must be 21+ with valid license</p>
                  </div>
                </li>
                <li>
                  <span className="policy-icon">💳</span>
                  <div>
                    <strong>Credit Card Required</strong>
                    <p>For security deposit authorization</p>
                  </div>
                </li>
                <li>
                  <span className="policy-icon">⏱️</span>
                  <div>
                    <strong>Free Cancellation</strong>
                    <p>Cancel up to 24 hours before pickup</p>
                  </div>
                </li>
                <li>
                  <span className="policy-icon">⛽</span>
                  <div>
                    <strong>Full to Full Fuel Policy</strong>
                    <p>Return the car with a full tank</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="detail-right">
          <div className="booking-card">

            <h3>Book This Car</h3>

            {car.available ? (
              <form onSubmit={handleSubmit} className="booking-form">

                <div className="input-group">
                  <label>📍 Pickup Location</label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={form.pickupLocation}
                    onChange={handleChange}
                    placeholder="City or Airport"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>📅 Pickup Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>📅 Return Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>👤 Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>✉️ Email</label>
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
                  <label>📞 Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+994 50 000 00 00"
                    required
                  />
                </div>

                <div className="invoice-box">
                  <div className="invoice-row">
                    <span>${car.pricePerDay} × {totalDays > 0 ? totalDays : 1} day</span>
                    <span>${totalDays > 0 ? totalPrice : car.pricePerDay}</span>
                  </div>
                  <div className="invoice-row">
                    <span>Insurance & fees</span>
                    <span className="included-tag">Included</span>
                  </div>
                  <div className="invoice-total">
                    <strong>Total</strong>
                    <strong className="total-price">${totalDays > 0 ? totalPrice : car.pricePerDay}</strong>
                  </div>
                </div>

                <button type="submit" className="confirm-btn">
                  Reserve Now →
                </button>

                <p className="cancel-note">🛡 Free cancellation up to 24 hours before pickup</p>

              </form>
            ) : (
              <div className="unavailable-box">
                <p>This car is currently unavailable.</p>
                <button onClick={() => navigate('/cars')} className="browse-btn">
                  Browse Other Cars
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}

export default CarDetailPage