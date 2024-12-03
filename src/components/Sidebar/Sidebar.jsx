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
      <BootstrapNavbar bg="light" expand="lg" className="navbar-custom d-lg-none fixed-top">
        <BootstrapNavbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
      </BootstrapNavbar>

      <Offcanvas show={show} onHide={handleClose} placement="start" id="offcanvasNavbar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/">Location Page</Nav.Link>
            <Nav.Link as={Link} to="/salary">Salary Page</Nav.Link>
            <Nav.Link as={Link} to="/number">Number Page</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="sidebar d-none d-lg-block" style={{ width: '300px', height: '100vh', position: 'fixed', backgroundColor: '#24303f', padding: '20px', top: 0 }}>
        <div className="sidebar-header mb-5 p-1 border-bottom" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/public/favic.ico" alt="RemoteTrends Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          <span style={{ color: '#fff', fontSize: '1.7em', fontWeight: 'bold' }}>RemoteTrends</span>
        </div>
        <Nav className="flex-column ms-4 fs-5">
          <Nav.Link as={Link} to="/">Location Page</Nav.Link>
          <Nav.Link as={Link} to="/salary">Salary Page</Nav.Link>
          <Nav.Link as={Link} to="/number">Number Page</Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
