import { useNavigate } from 'react-router-dom'
import './BookingsPage.css'

function BookingsPage({ bookings = [], cancelBooking }) {
  const navigate = useNavigate()

  if (bookings.length === 0) {
    return (
      <div className="bookings-page">
        <div className="bookings-empty">
          <h2>No Bookings Yet</h2>
          <p>You haven't booked any cars yet. Browse our fleet and find your perfect ride.</p>
          <button onClick={() => navigate('/cars')} className="browse-btn">
            Browse Cars
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <div>
          <h2>My Bookings <span>({bookings.length})</span></h2>
        </div>
        <button onClick={() => navigate('/cars')} className="back-to-fleet-btn">
          ← Back to Cars
        </button>
      </div>

      <div className="bookings-list">
        {bookings.map(booking => (
          <div className={`booking-card ${booking.status === 'cancelled' ? 'cancelled' : ''}`} key={booking.id}>

            <div className="booking-card-image">
              <img src={booking.carImage} alt={booking.carModel} />
              <span className={`booking-status ${booking.status === 'active' ? 'status-active' : 'status-cancelled'}`}>
                {booking.status === 'active' ? 'Active' : 'Cancelled'}
              </span>
            </div>

            <div className="booking-card-info">
              <div className="booking-car-name">
                <h3>{booking.carBrand} {booking.carModel}</h3>
                <span className="booking-payment">
                  {booking.paymentMethod === 'cash' ? '💵 Cash' : '💳 Card'}
                </span>
              </div>

              <div className="booking-details">
                <div className="booking-detail-item">
                  <span className="detail-label">Pickup</span>
                  <span className="detail-value">{booking.pickupLocation}</span>
                </div>
                <div className="booking-detail-item">
                  <span className="detail-label">Driver</span>
                  <span className="detail-value">{booking.name}</span>
                </div>
                <div className="booking-detail-item">
                  <span className="detail-label">Start Date</span>
                  <span className="detail-value">{booking.startDate}</span>
                </div>
                <div className="booking-detail-item">
                  <span className="detail-label">End Date</span>
                  <span className="detail-value">{booking.endDate}</span>
                </div>
                <div className="booking-detail-item">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{booking.totalDays} days</span>
                </div>
                <div className="booking-detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{booking.phone}</span>
                </div>
              </div>

              <div className="booking-card-footer">
                <div className="booking-price">
                  <span className="booking-price-amount">${booking.totalPrice}</span>
                </div>

                {booking.status === 'active' && (
                  <button
                    className="cancel-booking-btn"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage