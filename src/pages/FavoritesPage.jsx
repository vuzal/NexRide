import { useNavigate } from 'react-router-dom'
import './FavoritesPage.css'

function FavoritesPage({ favorites = [], toggleFavorite }) {
  const navigate = useNavigate()

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="favorites-empty">
          <span className="empty-icon">🤍</span>
          <h2>No Favorites Yet</h2>
          <p>Browse our fleet and save cars you love.</p>
          <button onClick={() => navigate('/cars')} className="browse-btn">
            Add Cars
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <div>
          <p className="favorites-eyebrow">Your Collection</p>
          <h2>Favorite Cars <span>({favorites.length})</span></h2>
        </div>
        <button onClick={() => navigate('/cars')} className="back-to-fleet-btn">
          ← Back to Fleet
        </button>
      </div>

      <div className="favorites-grid">
        {favorites.map(car => (
          <div className="fav-card" key={car.id}>
            <div className="fav-card-image">
              <img src={car.image} alt={car.model} />
              <button
                className="fav-remove-btn"
                onClick={() => toggleFavorite(car)}
              >
                ❤️
              </button>
            </div>

            <div className="fav-card-body">
              <span className="fav-category">{car.category}</span>
              <h3>{car.brand} {car.model}</h3>

              <div className="fav-specs">
                <div className="fav-spec">
                  <span>👥</span>
                  {car.seats} seats
                </div>
                <div className="fav-spec">
                  <span>⛽</span>
                  {car.fuel}
                </div>
                <div className="fav-spec">
                  <span>⚡</span>
                  {car.horsepower} hp
                </div>
              </div>

              <div className="fav-card-footer">
                <div className="fav-price">
                  <span className="fav-price-amount">${car.pricePerDay}</span>
                  <span className="fav-price-period">/day</span>
                </div>
                <button
                  className="fav-book-btn"
                  onClick={() => navigate(`/cars/${car.id}`)}
                >
                  Book Now →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage