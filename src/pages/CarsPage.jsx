import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CurrencySelector from '../components/CurrencySelector'
import './CarsPage.css'

function CarsPage({ cars = [] }) {
  const [category, setCategory] = useState('All')
  const [priceRange, setPriceRange] = useState(500) // Maksimum qiymət filteri üçün
  const [currency, setCurrency] = useState('USD')
  const [rate, setRate] = useState(1)
  const navigate = useNavigate()

  function handleRateChange(selectedCurrency, selectedRate) {
    setCurrency(selectedCurrency)
    setRate(selectedRate)
  }

  // Filtrasiya məntiqi (Həm kateqoriya, həm də konvertasiya olunmuş qiymətə görə)
  const filtered = cars.filter(car => {
    const matchesCategory = category === 'All' || car.category === category
    const currentPrice = car.pricePerDay * rate
    const matchesPrice = currentPrice <= priceRange * rate // Valyutaya uyğunlaşdırılmış filter
    return matchesCategory && matchesPrice
  })

  return (
    <div className="cars-page-container">
      
      {/* Üst Başlıq və Valyuta Seçimi */}
      <div className="cars-page-header">
        <div>
          <h2>Explore Our <span>Elite Fleet</span></h2>
          <p>Find the perfect ride tailored for your next journey.</p>
        </div>
        <div className="header-actions">
          <CurrencySelector onRateChange={handleRateChange} />
        </div>
      </div>

      <div className="cars-layout">
        
        {/* Sol Tərəf - Müasir Filter Paneli */}
        <aside className="filter-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-buttons-stack">
              {['All', 'Sedan', 'SUV', 'Hatchback'].map((cat) => (
                <button
                  key={cat}
                  className={`filter-sidebar-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Max Price Per Day</h3>
            <div className="price-slider-wrapper">
              <input 
                type="range" 
                min="30" 
                max="500" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="custom-slider"
              />
              <div className="price-slider-labels">
                <span>{currency} {(30 * rate).toFixed(0)}</span>
                <span className="current-filter-price">{currency} {(priceRange * rate).toFixed(0)}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Sağ Tərəf - Maşın Şəbəkəsi */}
        <main className="cars-main-content">
          <div className="results-count">
            Showing {filtered.length} cars available for rent
          </div>

          <div className="cars-grid-modern">
            {filtered.map(car => (
              <div
                className="car-card-modern"
                key={car.id}
                onClick={() => navigate(`/cars/${car.id}`)}
              >
                <div className="car-card-hero">
                  <img src={car.image} alt={car.model} className="car-img" />
                  <span className={`status-badge ${car.available ? 'available' : 'unavailable'}`}>
                    {car.available ? '• Available' : '• Rented'}
                  </span>
                </div>

                <div className="car-card-details">
                  <div className="car-title-row">
                    <h3>{car.brand} <span>{car.model}</span></h3>
                    <span className="car-year-tag">{car.year}</span>
                  </div>

                  {/* Müasir İkon formalı detallar (CSS ilə qəşəng bəzəyəcəyik) */}
                  <div className="car-specs-grid">
                    <div className="spec-item">
                      <span className="spec-icon">⚙</span>
                      <span>{car.transmission}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">💺</span>
                      <span>{car.seats} Seats</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-icon">📁</span>
                      <span>{car.category}</span>
                    </div>
                  </div>

                  <div className="car-card-footer">
                    <div className="price-block">
                      <span className="currency-symbol">{currency}</span>
                      <span className="price-amount">{(car.pricePerDay * rate).toFixed(0)}</span>
                      <span className="price-period">/ day</span>
                    </div>
                    <button className="book-now-btn">Rent Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="no-results">
              <p>No cars found matching your selected criteria.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  )
}

export default CarsPage