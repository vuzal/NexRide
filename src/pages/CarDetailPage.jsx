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
    return <div className="not-found">Car not found or loading...</div>
  }

  if (submitted) {
    return (
      <div className="success-container">
        <div className="receipt-card">
          <div className="success-icon">✓</div>
          <h2>Booking Confirmed</h2>
          <p className="success-subtitle">Your premium ride is ready for the road.</p>
          
          <div className="receipt-divider"></div>
          
          <div className="receipt-details">
            <div className="receipt-row">
              <span>Driver:</span>
              <strong>{form.name}</strong>
            </div>
            <div className="receipt-row">
              <span>Vehicle:</span>
              <strong>{car.brand} {car.model}</strong>
            </div>
            <div className="receipt-row">
              <span>Duration:</span>
              <strong>{totalDays} Days</strong>
            </div>
            <div className="receipt-row total-highlight">
              <span>Total Paid:</span>
              <strong>${totalPrice}</strong>
            </div>
          </div>
          
          <button className="back-fleet-btn" onClick={() => navigate('/cars')}>
            Return to Fleet
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="car-detail-container">
      
      {/* Sol Sütun - Maşın Məlumatları və Qalereya */}
      <div className="detail-main-content">
        <button className="back-link-btn" onClick={() => navigate('/cars')}>
          ← Back to fleet
        </button>
        
        <div className="car-hero-header">
          <span className="car-brand-label">{car.brand}</span>
          <h1>{car.model}</h1>
          <span className={`status-pill ${car.available ? 'online' : 'offline'}`}>
            {car.available ? '• Available Now' : '• Fully Booked'}
          </span>
        </div>

        <div className="car-large-image-wrapper">
          <img src={car.image} alt={car.model} className="car-main-view" />
        </div>

        {/* Lüks Performans Göstəriciləri (Dashboard Specs) */}
        <div className="performance-dashboard">
          <div className="dash-card">
            <span className="dash-icon">⚡</span>
            <div className="dash-info">
              <span className="dash-value">{car.transmission}</span>
              <span className="dash-label">Gearbox</span>
            </div>
          </div>
          <div className="dash-card">
            <span className="dash-icon">💺</span>
            <div className="dash-info">
              <span className="dash-value">{car.seats} Persons</span>
              <span className="dash-label">Capacity</span>
            </div>
          </div>
          <div className="dash-card">
            <span className="dash-icon">🔥</span>
            <div className="dash-info">
              <span className="dash-value">{car.category}</span>
              <span className="dash-label">Class</span>
            </div>
          </div>
        </div>

        {/* Maşın Təchizatı - Premium Amenities */}
        <div className="car-features-description">
          <h3>Premium Amenities Included</h3>
          <ul className="amenities-list">
            <li>✦ Full Insurance (CDW)</li>
            <li>✦ Real-time GPS Navigation</li>
            <li>✦ Apple CarPlay & Android Auto</li>
            <li>✦ Premium Audio System</li>
            <li>✦ 24/7 Roadside Assistance</li>
          </ul>
        </div>
      </div>

      {/* Sağ Sütun - Sabit Qalan Rezervasiya Kartı (Sticky Sidebar) */}
      <div className="detail-booking-sidebar">
        <div className="sticky-booking-card">
          <div className="sidebar-price-header">
            <div>
              <span className="sidebar-amount">${car.pricePerDay}</span>
              <span className="sidebar-period">/ day</span>
            </div>
            <span className="tax-label">Taxes incl.</span>
          </div>

          {car.available ? (
            <form onSubmit={handleSubmit} className="premium-booking-form">
              <div className="input-field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Vüsal Abbasov"
                  required
                />
              </div>

              <div className="input-field-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="vusal@example.com"
                  required
                />
              </div>

              <div className="input-field-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+994 50 000 00 00"
                  required
                />
              </div>

              <div className="date-fields-row">
                <div className="input-field-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-field-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {totalDays > 0 && (
                <div className="dynamic-checkout-invoice">
                  <div className="invoice-row">
                    <span>{car.brand} x {totalDays} days</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="invoice-row">
                    <span>Security Deposit</span>
                    <span className="free-tag">$0.00</span>
                  </div>
                  <div className="invoice-total-row">
                    <span>Total Amount</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              )}

              <button type="submit" className="confirm-checkout-btn">
                Reserve This Ride
              </button>
            </form>
          ) : (
            <div className="locked-booking-state">
              <p>This car is currently unavailable for rent. Please browse other active elite cars in our fleet.</p>
              <button type="button" className="locked-btn-cta" onClick={() => navigate('/cars')}>
                Browse Other Cars
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default CarDetailPage