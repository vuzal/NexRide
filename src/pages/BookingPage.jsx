import { useState } from 'react'
import cars from '../data/cars'
import './BookingPage.css'

function BookingPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    carId: '',
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

  const selectedCar = cars.find(car => car.id === parseInt(form.carId))

  const totalDays =
    form.startDate && form.endDate
      ? Math.ceil(
          (new Date(form.endDate) - new Date(form.startDate)) /
            (1000 * 60 * 60 * 24)
        )
      : 0

  const totalPrice = selectedCar ? totalDays * selectedCar.pricePerDay : 0

  if (submitted) {
    return (
      <div className="booking-page">
        <div className="success-box">
          <h2>Booking Confirmed!</h2>
          <p>Thank you, {form.name}. We will contact you at {form.email}.</p>
          {selectedCar && (
            <p>
              Car: {selectedCar.brand} {selectedCar.model} — {totalDays} days —
              ${totalPrice}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page">
      <h2>Book a Car</h2>

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

        <div className="form-group">
          <label>Select Car</label>
          <select name="carId" value={form.carId} onChange={handleChange} required>
            <option value="">-- Choose a car --</option>
            {cars.filter(car => car.available).map(car => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model} — ${car.pricePerDay}/day
              </option>
            ))}
          </select>
        </div>

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

        {selectedCar && totalDays > 0 && (
          <div className="summary">
            <p>Car: {selectedCar.brand} {selectedCar.model}</p>
            <p>Days: {totalDays}</p>
            <p>Total: ${totalPrice}</p>
          </div>
        )}

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  )
}

export default BookingPage