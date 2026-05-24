import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cars from '../data/cars'
import CurrencySelector from '../components/CurrencySelector'
import './CarsPage.css'

function CarsPage() {
  const [category, setCategory] = useState('All')
  const [currency, setCurrency] = useState('USD')
  const [rate, setRate] = useState(1)
  const navigate = useNavigate()

  function handleRateChange(selectedCurrency, selectedRate) {
    setCurrency(selectedCurrency)
    setRate(selectedRate)
  }

  const filtered = category === 'All'
    ? cars
    : cars.filter(car => car.category === category)

  return (
    <div className="cars-page">

      <CurrencySelector onRateChange={handleRateChange} />

      <div className="filters">
        <button onClick={() => setCategory('All')}>All</button>
        <button onClick={() => setCategory('Sedan')}>Sedan</button>
        <button onClick={() => setCategory('SUV')}>SUV</button>
      </div>

      <div className="cars-grid">
        {filtered.map(car => (
          <div
            className="car-card"
            key={car.id}
            onClick={() => navigate(`/cars/${car.id}`)}
          >
            <img src={car.image} alt={car.model} />
            <div className="car-info">
              <h3>{car.brand} {car.model}</h3>
              <p>{car.year} • {car.category} • {car.transmission}</p>
              <p>{car.seats} seats</p>
              <div className="car-bottom">
                <span className="price">
                  {currency} {(car.pricePerDay * rate).toFixed(2)}/day
                </span>
                <span className={car.available ? 'available' : 'unavailable'}>
                  {car.available ? 'Available' : 'Not Available'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default CarsPage