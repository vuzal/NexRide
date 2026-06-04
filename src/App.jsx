import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CarsPage from './pages/CarsPage'
import CarDetailPage from './pages/CarDetailPage'
import ListCarPage from './pages/ListCarPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import FavoritesPage from './pages/FavoritesPage'
import BookingsPage from './pages/BookingsPage'
import carsData from './data/cars'
import './App.css'

function App() {
  const [cars, setCars] = useState(carsData)

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('nexride_favorites')
    return saved ? JSON.parse(saved) : []
  })

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('nexride_bookings')
    return saved ? JSON.parse(saved) : []
  })

  function addCar(newCar) {
    const carWithDetails = {
      ...newCar,
      id: Date.now(),
      available: true
    };

    setCars(previousCars => {
      return [...previousCars, carWithDetails];
    });
  }

  function deleteCar(id) {
    setCars(cars.filter(car => car.id !== id))
  }

  function toggleFavorite(car) {
    const isFav = favorites.find(f => f.id === car.id)
    let updated
    if (isFav) {
      updated = favorites.filter(f => f.id !== car.id)
    } else {
      updated = [...favorites, car]
    }
    setFavorites(updated)
    localStorage.setItem('nexride_favorites', JSON.stringify(updated))
  }
  function addBooking(newBooking) {
    const updatedBookings = [
      ...bookings,
      {
        ...newBooking,
        id: Date.now(),
        status: 'active'
      }
    ];
    setBookings(updatedBookings);
    localStorage.setItem('nexride_bookings', JSON.stringify(updatedBookings));
  }

function cancelBooking(bookingId) {
  const updatedBookings = bookings.map(currentBooking => {
    
    if (currentBooking.id === bookingId) {
      return { ...currentBooking, status: 'cancelled' };
    }
        return currentBooking;
  });
  setBookings(updatedBookings);
  localStorage.setItem('nexride_bookings', JSON.stringify(updatedBookings));
}

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage cars={cars} favorites={favorites} toggleFavorite={toggleFavorite} deleteCar={deleteCar} bookings={bookings} />} />
        <Route path="/cars/:id" element={<CarDetailPage cars={cars} addBooking={addBooking} />} />
        <Route path="/list-car" element={<ListCarPage addCar={addCar} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/bookings" element={<BookingsPage bookings={bookings} cancelBooking={cancelBooking} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App