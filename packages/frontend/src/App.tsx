import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'

// pages
import { Home } from './pages/home'

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<h1>About</h1>}/>
      <Route path="*" element={<h1>Page not found</h1>}/>
    </Routes>
    </Suspense>
  )
}

export default App
