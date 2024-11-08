import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'

// pages
import { Home } from './pages/home'
import { Create } from './pages/create'
import { ShowNote } from './pages/note'

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/note/new" element={<Create />}/>
      <Route path="/notes/:noteId" element={<ShowNote/>} />
      <Route path="*" element={<h1>Page not found</h1>}/>
    </Routes>
    </Suspense>
  )
}

export default App
