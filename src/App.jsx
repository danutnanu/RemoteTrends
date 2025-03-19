import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import LocationPage from './components/pages/LocationPage/LocationPage'
import SalaryPage from './components/pages/SalaryPage/SalaryPage'
import NumberPage from './components/pages/NumberPage/NumberPage'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from './components/Topbar/Topbar'

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Topbar />
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
