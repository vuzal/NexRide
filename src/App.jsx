import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CarsPage from './pages/CarsPage'
import CarDetailPage from './pages/CarDetailPage'
import ListCarPage from './pages/ListCarPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/list-car" element={<ListCarPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App