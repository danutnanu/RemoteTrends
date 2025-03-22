import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Offcanvas } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <BootstrapNavbar expand="lg" className="navbar-cus d-lg-none fixed-top">
        <BootstrapNavbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} className="navbar-toggler mt-4 ms-2" />
        <div className="navigation-bar pb-3 mt-4 me-5">
          <img src="/trend.ico" alt="RemoteTrends Logo" style={{ width: '30px', height: '40px', marginRight: '15px', marginLeft: '30px', paddingTop: '10px' }} />
          <span style={{ color: '#fff', fontSize: '1.7em', fontWeight: 'bold', borderBottom: '2px solid #fff', paddingTop: '10px' }}>RemoteTrends</span>
        </div>
      </BootstrapNavbar>

      <Offcanvas show={show} onHide={handleClose} placement="start" id="offcanvasNavbar" className="offcanvas-custom" style={{ width: '250px', height: '100%', paddingTop: '30px' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='ms-2 p-2' style={{ width: '200px', borderBottom: '1px solid #fff'}}>Jobs</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column fs-6">
            <Nav.Link as={Link} to="/" onClick={handleClose} className={location.pathname === '/' ? 'active-link' : ''}>📍 by Location</Nav.Link>
            <Nav.Link as={Link} to="/salary" onClick={handleClose} className={location.pathname === '/salary' ? 'active-link' : ''}>💰 by Salary</Nav.Link>
            <Nav.Link as={Link} to="/number" onClick={handleClose} className={location.pathname === '/number' ? 'active-link' : ''}>〄 by Industry</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="sidebar d-none d-lg-block pt-5 px-2" style={{ width: '250px', height: '100%', borderRight: '1px solid #fff'}}>
        <div className="sidebar-header ms-3 mb-5 p-2 fs-3 border-bottom">
          Jobs
        </div>
        <Nav className="flex-column fs-6">
          <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active-link' : ''}>📍 by Location</Nav.Link>
          <Nav.Link as={Link} to="/salary" className={location.pathname === '/salary' ? 'active-link' : ''}>💰 by Salary</Nav.Link>
          <Nav.Link as={Link} to="/number" className={location.pathname === '/number' ? 'active-link' : ''}>〄 by Industry</Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
