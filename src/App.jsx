import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CarsPage from './pages/CarsPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/booking" element={<h1>Booking Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App