import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LocationPage from './components/pages/LocationPage/LocationPage'
import SalaryPage from './components/pages/SalaryPage/SalaryPage'
import NumberPage from './components/pages/NumberPage/NumberPage'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LocationPage />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route path="/number" element={<NumberPage />} />
          <Route path="/location" element={<LocationPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
