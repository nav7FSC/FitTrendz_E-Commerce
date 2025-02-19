import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'

function App() {
  

  return (
    <div>
      
      <BrowserRouter>
      <Routes>
        <Route path = "/" index element = {<Home />} />
      </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App
