import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CarsPage from './pages/CarsPage'
import CarDetailPage from './pages/CarDetailPage'
import ListCarPage from './pages/ListCarPage'
import carsData from './data/cars'
import './App.css'

function App() {
  const [cars, setCars] = useState(carsData)

  // Yeni maşın əlavə etmə məntiqi
  function addCar(newCar) {
    // ListCarPage-dən gələn obyekti birbaşa state-ə yayırıq. 
    // ID artıq ListCarPage daxilində Date.now() ilə unikal olaraq yaradılıb.
    setCars([...cars, newCar])
  }

  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        {/* Ana səhifəyə də maşınları göndəririk ki, "Latest Cars" bölməsi düzgün işləsin */}
        <Route path="/" element={<HomePage cars={cars} />} />
        
        {/* Maşınların siyahısı səhifəsi */}
        <Route path="/cars" element={<CarsPage cars={cars} />} />
        
        {/* Avtomobilin detalları səhifəsi */}
        <Route path="/cars/:id" element={<CarDetailPage cars={cars} />} />
        
        {/* Yeni maşın elanı yerləşdirmə səhifəsi */}
        <Route path="/list-car" element={<ListCarPage addCar={addCar} />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  )
}

export default App