import { useState, useEffect } from 'react'
import './CurrencySelector.css'

function CurrencySelector({ onRateChange }) {
  const [currency, setCurrency] = useState('USD')
  const [rates, setRates] = useState(null)

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        setRates(data.rates)
      })
  }, [])

  function handleChange(e) {
    const selected = e.target.value
    setCurrency(selected)
    if (rates) {
      onRateChange(selected, rates[selected])
    }
  }

  return (
    <div className="currency-selector">
      <label>Currency:</label>
      <select value={currency} onChange={handleChange}>
        <option value="USD">USD</option>
        <option value="AZN">AZN</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  )
}

export default CurrencySelector