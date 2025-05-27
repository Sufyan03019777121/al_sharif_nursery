import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar as BSNavbar, Offcanvas } from 'react-bootstrap';
import {
  FaHome, FaPhone, FaInfoCircle, FaSignInAlt,
  FaShoppingCart, FaList, FaUser, FaCreditCard
} from 'react-icons/fa';
import alsharif_nav_logo from "../asset/logo/alsharifnursery_logo.png";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <BSNavbar bg="success" variant="dark" expand="lg" className="navbar-custom mb-3">
        <Container fluid className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <BSNavbar.Brand as={Link} to="/" className="navbar-logo me-2 shadow rounded-5">
              <img style={{ height: 40 }} src={alsharif_nav_logo} alt="logo" />
            </BSNavbar.Brand>
            <span className="text-white shadow fw-bold d-lg-none d-inline fs-6">Al Sharif Nursery</span>
          </div>

          <BSNavbar.Toggle aria-controls="offcanvasNavbar " onClick={handleShow} />
        </Container>

        <BSNavbar.Offcanvas
          show={show}
          onHide={handleClose}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton className='shadow rounded-3 m-3'>
            <Offcanvas.Title id="offcanvasNavbarLabel" className="text-center w-100 fw-bold fs-5  text-success">
              Al Sharif Nursery
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end shadow rounded-3 bg-success text-center flex-grow-1 p-2 navbar-links">
              <Nav.Link as={Link} to="/" onClick={handleClose} className="navbar-link shadow mb-3">
                <FaHome className="icon icon-1" /> Home
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={handleClose} className="navbar-link shadow mb-3">
                <FaPhone className="icon icon-2" /> Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/AboutUs" onClick={handleClose} className="navbar-link shadow mb-3">
                <FaInfoCircle className="icon icon-3" /> About_Us
              </Nav.Link>
              <Nav.Link as={Link} to="/login" onClick={handleClose} className="navbar-link shadow mb-3">
                <FaSignInAlt className="icon icon-4" /> Login
              </Nav.Link>
              <Nav.Link as={Link} to="/userdashboard" onClick={handleClose} className="navbar-link shadow mb-3">
                <FaUser className="icon icon-5" /> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/checkoutpage" onClick={handleClose} className="navbar-link shadow mb-3">
                <FaCreditCard className="icon icon-6" /> Checkout
              </Nav.Link>
              <Nav.Link as={Link} to="/ProductList" onClick={handleClose} className="navbar-link shadow mb-3">
                <FaList className="icon icon-7" /> Products
              </Nav.Link>
              <Nav.Link as={Link} to="/CartPage" onClick={handleClose} className="navbar-link shadow mb-3">
                <FaShoppingCart className="icon icon-8" /> Cart
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </BSNavbar.Offcanvas>
      </BSNavbar>

      {/* 🔸 CSS Styling */}
      <style jsx>{`
        .navbar-custom {
          background-color: #2a7d2e;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .navbar-logo img {
          transition: transform 0.3s ease;
        }
        .navbar-logo img:hover {
          transform: scale(1.05);
        }

        .navbar-link {
          color: #fff !important;
          font-size: 13.5px;
          font-weight: 500;
          margin-right: 10px;
          text-transform: uppercase;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
        }

        .navbar-link:hover {
          color: #f7c900 !important;
        }

        .icon {
          margin-right: 8px;
          font-size: 16px;
        }

        /* 🔸 Orange shades for each icon */
        .icon-1 { color: #ff5722; } /* Home */
        .icon-2 { color: #ff6f00; } /* Contact */
        .icon-3 { color: #ffa000; } /* About Us */
        .icon-4 { color: #ff8f00; } /* Login */
        .icon-5 { color: #f57c00; } /* Dashboard */
        .icon-6 { color: #ff7043; } /* Checkout */
        .icon-7 { color: #ff9800; } /* Products */
        .icon-8 { color: #ffc107; } /* Cart */
      `}</style>
    </>
  );
};

export default Navbar;
