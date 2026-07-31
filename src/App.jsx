import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './navbar/NavBar'
import Signup from './navbar/Signup-login/Signup'
import Login from './navbar/Signup-login/Login'
import FoodCrops from './ProductCards/FoodCrops/FoodCrops'
import Home from './Home/Home'


function App() {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/category/food-crops" element={<FoodCrops />} />
    </Routes>
    </>
  )
}

export default App
