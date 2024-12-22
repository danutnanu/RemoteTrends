import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Offcanvas } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <BootstrapNavbar expand="lg" className="navbar-cus d-lg-none fixed-top">
        <BootstrapNavbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} className="navbar-toggler" />
        <div className="navigation-bar pb-5 justify-content-end">
          <img src="/public/favic.ico" alt="RemoteTrends Logo" style={{ width: '30px', height: '30px', marginRight: '10px', marginLeft: '30px' }} />
          <span style={{ color: '#fff', fontSize: '1.6em', fontWeight: 'bold' }}>RemoteTrends</span>
        </div>
      </BootstrapNavbar>

      <Offcanvas show={show} onHide={handleClose} placement="start" id="offcanvasNavbar" className="offcanvas-custom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Location Page</Nav.Link>
            <Nav.Link as={Link} to="/salary" onClick={handleClose}>Salary Page</Nav.Link>
            <Nav.Link as={Link} to="/number" onClick={handleClose}>Number Page</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="sidebar d-none d-lg-block">
        <div className="sidebar-header mb-5 p-2 fs-5 border-bottom">
          Menu
        </div>
        <Nav className="flex-column ms-2 fs-5">
          <Nav.Link as={Link} to="/">Location Page</Nav.Link>
          <Nav.Link as={Link} to="/salary">Salary Page</Nav.Link>
          <Nav.Link as={Link} to="/number">Number Page</Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
