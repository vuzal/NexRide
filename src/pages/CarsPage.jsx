import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CurrencySelector from '../components/CurrencySelector'
import './CarsPage.css'

function CarsPage({ cars = [], favorites = [], toggleFavorite, deleteCar, bookings = [] }) {
  const [category, setCategory] = useState('All Cars')
  const [currency, setCurrency] = useState('USD')
  const [rate, setRate] = useState(1)
  const [sortBy, setSortBy] = useState('default')
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('nexride_active_user'))
    if (activeUser) {
      setUser(activeUser)
    }
  }, [])

  function handleRateChange(selectedCurrency, selectedRate) {
    setCurrency(selectedCurrency)
    setRate(selectedRate)
  }

  function handleCategoryChange(cat) {
    setCategory(cat)
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

  return (
    <div className="cars-page-container">
      <div className="cars-page-header">
        <div>
          <h2>Find Your <span>Perfect Car</span></h2>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search brand or model..."
              value={search}
              onChange={e => { setSearch(e.target.value) }}
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
            <div className="filter-buttons">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  className={`filter-sidebar-btn ${category === cat.label ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.label)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Sort By</h3>
            <div className="filter-buttons">
              <button
                className={`filter-sidebar-btn ${sortBy === 'default' ? 'active' : ''}`}
                onClick={() => { setSortBy('default') }}
              >
                Default
              </button>
              <button
                className={`filter-sidebar-btn ${sortBy === 'popular' ? 'active' : ''}`}
                onClick={() => { setSortBy('popular') }}
              >
                Most Popular
              </button>
              <button
                className={`filter-sidebar-btn ${sortBy === 'price-asc' ? 'active' : ''}`}
                onClick={() => { setSortBy('price-asc') }}
              >
                ↑ Price: Low to High
              </button>
              <button
                className={`filter-sidebar-btn ${sortBy === 'price-desc' ? 'active' : ''}`}
                onClick={() => { setSortBy('price-desc') }}
              >
               ↓ Price: High to Low
              </button>
            </div>
          </div>
        </aside>

        <main className="cars-main-content">
          <div className="cars-list">
            {sorted.map(car => (
              <div
                className="car-card"
                key={car.id}
              >
                <div className="car-card-hero">
                  <div className="hero-info">
                    <span className={
                      bookings.find(b => b.carId === car.id && b.status === 'active')
                        ? 'available-info unavailable'
                        : car.available
                          ? 'available-info available'
                          : 'available-info unavailable'
                    }>
                      {bookings.find(b => b.carId === car.id && b.status === 'active')
                        ? 'Not Available'
                        : car.available
                          ? 'Available'
                          : 'Not Available'
                      }
                    </span>
                  </div>
                  <img src={car.image} alt={car.model} className="car-img" />
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

                <div className="car-card-body">
                  <span className="car-category">{car.category}</span>
                  <h3 className="car-title">{car.brand} {car.model}</h3>
                  <div className="car-info">
                    <div className="info">
                      <span className="info-icon">👥</span>
                      {car.seats} seats
                    </div>
                    <div className="info">
                      <span className="info-icon">⛽</span>
                      {car.fuel}
                    </div>
                    <div className="info">
                      <span className="info-icon">⚡</span>
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
                    <button className="view-details-btn" onClick={() => navigate(`/cars/${car.id}`)}>
                      View Details →
                    </button>
                  </div>
                  
                  {user && car.ownerId === user.email && (
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
        </main>
      </div>
    </div>
  )
}

export default CarsPage