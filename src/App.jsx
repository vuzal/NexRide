import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CarsPage from './pages/CarsPage'
import CarDetailPage from './pages/CarDetailPage'
import ListCarPage from './pages/ListCarPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/list-car" element={<ListCarPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App