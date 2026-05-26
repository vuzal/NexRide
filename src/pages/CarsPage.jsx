import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import CurrencySelector from '../components/CurrencySelector'
import './CarsPage.css'

function CarsPage({ cars = [], favorites = [], toggleFavorite, deleteCar, bookings = [] }) {
  const [category, setCategory] = useState('All Cars')
  const [currency, setCurrency] = useState('USD')
  const [rate, setRate] = useState(1)
  const [sortBy, setSortBy] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const carsPerPage = 6
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  function handleRateChange(selectedCurrency, selectedRate) {
    setCurrency(selectedCurrency)
    setRate(selectedRate)
  }

  function handleCategoryChange(cat) {
    setCategory(cat)
    setCurrentPage(1)
  }

  const categories = [
    { label: 'All Cars' },
    { label: 'Sedan'},
    { label: 'SUV' },
    { label: 'Hatchback' },
  ]

  const filtered = cars.filter(car => {
    const matchCategory = category === 'All Cars' || car.category === category
    const matchSearch = car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
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
          <div className="search-box">
            <input
              type="text"
              placeholder="Search brand or model..."
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            />
          </div>
          <CurrencySelector onRateChange={handleRateChange} />
        </div>
      </div>

      <div className="cars-layout">
        <aside className="filter-sidebar">
          <div className="sidebar-header">
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
                Default
              </button>
              <button
                className={`filter-sidebar-btn ${sortBy === 'popular' ? 'active' : ''}`}
                onClick={() => { setSortBy('popular'); setCurrentPage(1) }}
              >
                Most Popular
              </button>
              <button
                className={`filter-sidebar-btn ${sortBy === 'price-asc' ? 'active' : ''}`}
                onClick={() => { setSortBy('price-asc'); setCurrentPage(1) }}
              >
                ↑ Price: Low to High
              </button>
              <button
                className={`filter-sidebar-btn ${sortBy === 'price-desc' ? 'active' : ''}`}
                onClick={() => { setSortBy('price-desc'); setCurrentPage(1) }}
              >
               ↓ Price: High to Low
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
              >
                <div className="car-card-hero">
                  <div className="hero-badges">
                    <span className={
                      bookings.find(b => b.carId === car.id && b.status === 'active')
                        ? 'badge-avail unavailable'
                        : car.available
                          ? 'badge-avail available'
                          : 'badge-avail unavailable'
                    }>
                      {bookings.find(b => b.carId === car.id && b.status === 'active')
                        ? '● Not Available'
                        : car.available
                          ? '● Available'
                          : '● Not Available'
                      }
                    </span>
                  </div>
                  <img src={car.image} alt={car.model} className="car-img" />
                  <div className="card-hero-gradient"></div>
                  <button
                    className={`fav-btn ${favorites.find(f => f.id === car.id) ? 'fav-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!user) {
                        navigate('/login')
                        return
                      }
                      toggleFavorite(car)
                    }}
                  >
                    {favorites.find(f => f.id === car.id) ? '❤️' : '🤍'}
                  </button>
                </div>

                <div className="car-card-body" onClick={() => navigate(`/cars/${car.id}`)}>
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
                      {car.horsepower} Hp
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
                  {user && car.ownerId === user.uid && (
                    <button
                      className="delete-car-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteCar(car.id)
                      }}
                    >
                      Delete
                    </button>
                  )}
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