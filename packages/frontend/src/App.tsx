import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="bg-red-400">
    <Routes>
      <Route path="/" element={<h1>Home</h1>}/>
      <Route path="/about" element={<h1>About</h1>}/>
      <Route path="*" element={<h1>Page not found</h1>}/>
    </Routes>
    </div>
  )
}

export default App
