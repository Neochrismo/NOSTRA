import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './navbar/NavBar'
import Signup from './navbar/Signup-login/Signup'
import Login from './navbar/Signup-login/Login'
import CerealsPage from './ProductCards/FoodCrops/Cereals'
import Home from './Home/Home'


function App() {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/category/food-crops" element={<CerealsPage />} />
    </Routes>
    </>
  )
}

export default App
