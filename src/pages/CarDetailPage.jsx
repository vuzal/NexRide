import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import cars from '../data/cars'
import './CarDetailPage.css'

function CarDetailPage() {
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

  const totalPrice = totalDays * car.pricePerDay

  if (!car) {
    return <div className="not-found">Car not found.</div>
  }

  if (submitted) {
    return (
      <div className="detail-page">
        <div className="success-box">
          <h2>Booking Confirmed!</h2>
          <p>Thank you, {form.name}!</p>
          <p>{car.brand} {car.model} — {totalDays} days — ${totalPrice}</p>
          <button onClick={() => navigate('/cars')}>Back to Cars</button>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-page">

      <div className="detail-top">
        <img src={car.image} alt={car.model} />
        <div className="detail-info">
          <h2>{car.brand} {car.model}</h2>
          <p>{car.year} • {car.category} • {car.transmission}</p>
          <p>{car.seats} seats</p>
          <p className="detail-price">${car.pricePerDay}/day</p>
          <span className={car.available ? 'available' : 'unavailable'}>
            {car.available ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>

      {car.available && (
        <div className="booking-section">
          <h3>Book this car</h3>
          <form onSubmit={handleSubmit} className="booking-form">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@email.com"
                required
              />
            </div>

            <div className="form-group">
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

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
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
              <div className="summary">
                <p>Days: {totalDays}</p>
                <p>Total: ${totalPrice}</p>
              </div>
            )}

            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      )}

    </div>
  )
}

export default CarDetailPage