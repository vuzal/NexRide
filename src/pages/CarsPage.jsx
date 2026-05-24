import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CurrencySelector from '../components/CurrencySelector'
import './CarsPage.css'

function CarsPage({ cars = [] }) {
  const [category, setCategory] = useState('All Cars')
  const [currency, setCurrency] = useState('USD')
  const [rate, setRate] = useState(1)
  const [sortBy, setSortBy] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const carsPerPage = 6
  const navigate = useNavigate()

  function handleRateChange(selectedCurrency, selectedRate) {
    setCurrency(selectedCurrency)
    setRate(selectedRate)
  }

  function handleCategoryChange(cat) {
    setCategory(cat)
    setCurrentPage(1)
  }

  const categories = [
    { label: 'All Cars', icon: '🚗' },
    { label: 'Sedan', icon: '🚙' },
    { label: 'SUV', icon: '🛻' },
    { label: 'Hatchback', icon: '🚘' },
    { label: 'Electric', icon: '⚡' },
  ]

  const filtered = cars.filter(car => {
    if (category === 'All Cars') return true
    return car.category === category
  })
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay
    if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay
    if (sortBy === 'popular') return b.horsepower - a.horsepower
    return 0
  })

  const totalPages = Math.ceil(sorted.length / carsPerPage)
  const startIndex = (currentPage - 1) * carsPerPage
  const currentCars = sorted.slice(startIndex, startIndex + carsPerPage)
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }


  return (
    <div className="cars-page-container">
      <div className="cars-page-header">
        <div>
          <p className="header-eyebrow">Our Collection</p>
          <h2>Find Your <span>Perfect Car</span></h2>
        </div>
        <div className="header-actions">
          <CurrencySelector onRateChange={handleRateChange} />
        </div>
      </div>

      <div className="cars-layout">

        <aside className="filter-sidebar">
          <div className="sidebar-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <h2>Filters</h2>
          </div>

          <div className="filter-section">
            <h3>Category</h3>
            <div className="filter-buttons-stack">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  className={`filter-sidebar-btn ${category === cat.label ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.label)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  {cat.label}
                  <span className="cat-count">
                    {cat.label === 'All Cars'
                      ? cars.length
                      : cars.filter(c => c.category === cat.label).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Sort By</h3>
            <div className="filter-buttons-stack">
              <button
                className={`filter-sidebar-btn ${sortBy === 'default' ? 'active' : ''}`}
                onClick={() => { setSortBy('default'); setCurrentPage(1) }}
              >
                <span className="cat-icon">🔀</span>
                Default
              </button>
              <button
                className={`filter-sidebar-btn ${sortBy === 'popular' ? 'active' : ''}`}
                onClick={() => { setSortBy('popular'); setCurrentPage(1) }}
              >
                <span className="cat-icon">🔥</span>
                Most Popular
              </button>
              <button
                className={`filter-sidebar-btn ${sortBy === 'price-asc' ? 'active' : ''}`}
                onClick={() => { setSortBy('price-asc'); setCurrentPage(1) }}
              >
                <span className="cat-icon">↑</span>
                Price: Low to High
              </button>
              <button
                className={`filter-sidebar-btn ${sortBy === 'price-desc' ? 'active' : ''}`}
                onClick={() => { setSortBy('price-desc'); setCurrentPage(1) }}
              >
                <span className="cat-icon">↓</span>
                Price: High to Low
              </button>
            </div>
          </div>
        </aside>

        <main className="cars-main-content">
          <div className="results-bar">
            <span>{filtered.length} cars found</span>
          </div>

          <div className="cars-grid-pro">
            {currentCars.map(car => (
              <div
                className="car-card-pro"
                key={car.id}
                onClick={() => navigate(`/cars/${car.id}`)}
              >
                <div className="car-card-hero">
                  <div className="hero-badges">
                    <span className={car.available ? 'badge-avail available' : 'badge-avail unavailable'}>
                      {car.available ? '● Available' : '● Not Available'}
                    </span>
                    <span className="badge-rating">⭐ 4.9</span>
                  </div>
                  <img src={car.image} alt={car.model} className="car-img" />
                  <div className="card-hero-gradient"></div>
                </div>

                <div className="car-card-body">
                  <span className="car-category-label">{car.category}</span>
                  <h3 className="car-title">{car.brand} {car.model}</h3>

                  <div className="car-specs-row">
                    <div className="spec">
                      <span className="spec-icon">👥</span>
                      {car.seats} seats
                    </div>
                    <div className="spec">
                      <span className="spec-icon">⛽</span>
                      {car.fuel}
                    </div>
                    <div className="spec">
                      <span className="spec-icon">⚡</span>
                      {car.horsepower} hp
                    </div>
                  </div>

                  <div className="car-card-footer">
                    <div className="price-block">
                      <div className="price-amount">
                        {(car.pricePerDay * rate).toFixed(0)}
                        <span className="currency"> {currency}</span>
                      </div>
                      <span className="price-period">per day</span>
                    </div>
                    <button className="view-details-btn">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="no-results">
              <p>No cars found in this category.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 1}
              >
                ← Prev
              </button>

              {pageNumbers.map(page => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="page-btn"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default CarsPage