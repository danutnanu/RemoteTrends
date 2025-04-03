import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import LocationPage from './components/pages/LocationPage/LocationPage'
import SalaryPage from './components/pages/SalaryPage/SalaryPage'
import NumberPage from './components/pages/NumberPage/NumberPage'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from './components/Topbar/Topbar'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <Sidebar />
      <Topbar />
      <Routes>
        <Route path="/" element={<LocationPage />} />
        <Route path="/salary" element={<SalaryPage />} />
        <Route path="/number" element={<NumberPage />} />
        <Route path="/location" element={<LocationPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
