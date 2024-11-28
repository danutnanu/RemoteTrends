import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Button, Offcanvas } from 'react-bootstrap';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Button to toggle the Offcanvas menu on smaller screens */}
      <BootstrapNavbar bg="light" expand="lg" className="d-lg-none">
        <Button variant="primary" onClick={handleShow}>
          Menu
        </Button>
      </BootstrapNavbar>

      {/* Offcanvas for smaller screens */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/">Location Page</Nav.Link>
            <Nav.Link as={Link} to="/job-listings">Job Listings</Nav.Link>
            <Nav.Link as={Link} to="/job-counts">Job Counts</Nav.Link>
            {/* Add more links as needed */}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar for larger screens */}
      <div className="sidebar d-none d-lg-block" style={{ width: '250px', height: '100vh', position: 'fixed', backgroundColor: '#f8f9fa', padding: '20px' }}>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/">Location Page</Nav.Link>
          <Nav.Link as={Link} to="/job-listings">Job Listings</Nav.Link>
          <Nav.Link as={Link} to="/job-counts">Job Counts</Nav.Link>
          {/* Add more links as needed */}
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
