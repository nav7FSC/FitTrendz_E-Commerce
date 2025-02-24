import { useState } from 'react'
//import './App.css'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Women from './pages/womens-page'
import Men from './pages/mens-page'
import SignIn from './pages/sign-in'
import Checkout from './pages/check-out'
import About from './pages/about'
import SignUpPage from './pages/signup-page';

function App() {
  

  return (
    <div>
      
      
      <Routes>
        <Route path = "/" index element = {<Home />} />
        <Route path = "/about" index element = {<About />} />
        <Route path = "/womens-page" index element = {<Women />} />
        <Route path = "/mens-page" index element = {<Men />} />
        <Route path = "/sign-in" index element = {<SignIn />} />
        <Route path = "/check-out" index element = {<Checkout />} />
        <Route path ="/signup-page" element={<SignUpPage />} />
      </Routes>
      
      
      
    </div>
  )
}

export default App
