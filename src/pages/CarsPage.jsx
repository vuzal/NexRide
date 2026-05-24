import { useState } from 'react'
import cars from '../data/cars'
import './CarsPage.css'

function CarsPage() {
  const [category, setCategory] = useState('All')

  const filtered = category === 'All' 
    ? cars 
    : cars.filter(car => car.category === category)

  return (
    <div className="cars-page">

      <div className="filters">
        <button onClick={() => setCategory('All')}>All</button>
        <button onClick={() => setCategory('Sedan')}>Sedan</button>
        <button onClick={() => setCategory('SUV')}>SUV</button>
      </div>

      <div className="cars-grid">
        {filtered.map(car => (
          <div className="car-card" key={car.id}>
            <img src={car.image} alt={car.model} />
            <div className="car-info">
              <h3>{car.brand} {car.model}</h3>
              <p>{car.year} • {car.category} • {car.transmission}</p>
              <p>{car.seats} seats</p>
              <div className="car-bottom">
                <span className="price">${car.pricePerDay}/day</span>
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