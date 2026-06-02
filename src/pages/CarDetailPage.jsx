import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './CarDetailPage.css'

function CarDetailPage({ cars = [], addBooking }) {
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

  const [step, setStep] = useState('booking')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  })
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

  function handleCardChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const updatedCardForm = { ...cardForm };
    updatedCardForm[inputName] = inputValue;
    setCardForm(updatedCardForm);
  }

  function handleBookingSubmit(e) {
    e.preventDefault()
    setStep('payment')
  }

  function handlePaymentSubmit(e) {
    e.preventDefault()
    addBooking({
      carId: car.id,
      carBrand: car.brand,
      carModel: car.model,
      carImage: car.image,
      carPrice: car.pricePerDay,
      name: form.name,
      email: form.email,
      phone: form.phone,
      pickupLocation: form.pickupLocation,
      startDate: form.startDate,
      endDate: form.endDate,
      totalDays: totalDays,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
    })
    setStep('success')
  }

  const totalDays =
    form.startDate && form.endDate
      ? Math.ceil(
        (new Date(form.endDate) - new Date(form.startDate)) /
        (1000 * 60 * 60 * 24)
      )
      : 0

  const dailyPrice = car && car.pricePerDay || 0;
  const totalPrice = totalDays * dailyPrice;

  if (!car) {
    return <div className="not-found">Car not found.</div>
  }

 
  if (step === 'payment') {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <button className="back-link-btn" onClick={() => setStep('booking')}>
            ← Back to booking
          </button>

          <h2>Payment</h2>
          <div className="payment-summary">
            <div className="payment-summary-row">
              <span>{car.brand} {car.model}</span>
              <span>{totalDays} days</span>
            </div>
            <div className="payment-summary-total">
              <span>Total</span>
              <strong>${totalPrice}</strong>
            </div>
          </div>

          <div className="payment-methods">
            <div
              className={`payment-method-btn ${paymentMethod === 'cash' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('cash')}
            >
              <span>💵</span>
              <div>
                <strong>Cash</strong>
              </div>
              <div className={`${paymentMethod === 'cash' ? 'checked' : ''}`}></div>
            </div>

            <div
              className={`payment-method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <span>💳</span>
              <div>
                <strong>Credit / Debit Card</strong>
              </div>
              <div className={`${paymentMethod === 'card' ? 'checked' : ''}`}></div>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <form onSubmit={handlePaymentSubmit} className="card-form">
              <div className="input-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardForm.cardNumber}
                  onChange={handleCardChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                  required
                />
              </div>

              <div className="input-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={cardForm.cardName}
                  onChange={handleCardChange}
                  placeholder="Vusal Abbasov"
                  required
                />
              </div>

              <div className="card-form-row">
                <div className="input-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardForm.expiry}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardForm.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="confirm-btn">
                Pay ${totalPrice}
              </button>
            </form>
          )}

          {paymentMethod === 'cash' && (
            <button className="confirm-btn" onClick={handlePaymentSubmit}>
              Confirm Booking →
            </button>
          )}
        </div>
      </div>
    )
  }

   if (step === 'success') {
    return (
      <div className="success-container">
        <div className="receipt-card">
          <div className="success-icon">✓</div>
          <h2>Booking Confirmed</h2>
          <p className="success-subtitle">Your ride is reserved and ready.</p>
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
        ← Back to Cars
      </button>

      <div className="detail-main">
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

          <div className="detail-bottom">
            <div className="amenities-card">
              <h3>What's Included</h3>
              <ul className="amenities-list">
                {car.description
                  ? car.description.split(',').map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))
                  : (
                    <>
                      <li>Full Insurance</li>
                      <li>GPS Navigation</li>
                      <li>Apple CarPlay & Android Auto</li>
                      <li>Premium Audio System</li>
                      <li>24/7 Roadside Assistance</li>
                      <li>Free Cancellation</li>
                    </>
                  )
                }
              </ul>
            </div>

            <div className="policy-card">
              <h3>Rental Policy</h3>
              <ul className="policy-list">
                <li>
                  <div>
                    <strong>Valid Driver's License</strong>
                    <p>Must be 18+ with valid license</p>
                  </div>
                </li>
                <li>
                  <div>
                    <strong>Credit Card Required</strong>
                    <p>For security deposit authorization</p>
                  </div>
                </li>
                <li>
                  <div>
                    <strong>Free Cancellation</strong>
                    <p>Cancel up to 24 hours before pickup</p>
                  </div>
                </li>
                <li>
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
          <div className="detail-booking-card">
            <h3>Book This Car</h3>
            {!user ? (
              <div className="login-required-box">
                <span>🔒</span>
                <p>You need to sign in to book this car.</p>
                <div className="login-required-btns">
                  <button onClick={() => navigate('/login')} className="confirm-btn">
                    Sign In
                  </button>
                  <button onClick={() => navigate('/signup')} className="browse-btn">
                    Create Account
                  </button>
                </div>
              </div>
            ) : car.available ? (
              <form onSubmit={handleBookingSubmit} className="booking-form">

                <div className="input-group">
                  <label>Pickup Location</label>
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
                  <label>Pickup Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Return Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
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

                <div className="invoice-box">
                  <div className="invoice-row">
                    <span>${car.pricePerDay} × {totalDays > 0 ? totalDays : 1} day</span>
                    <span>${totalDays > 0 ? totalPrice : car.pricePerDay}</span>
                  </div>
                  <div className="invoice-total">
                    <strong>Total</strong>
                    <strong className="total-price">${totalDays > 0 ? totalPrice : car.pricePerDay}</strong>
                  </div>
                </div>

                <button type="submit" className="confirm-btn">
                  Continue to Payment
                </button>
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