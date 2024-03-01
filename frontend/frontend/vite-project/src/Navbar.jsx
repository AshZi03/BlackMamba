// NavBar.js

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './NavBar.css';

function NavBar() {
  // Fetch user data from your data source (e.g., localStorage)
  const profileImg = "./img/jungle.png"; // Update with your actual default profile image path
  const userName = "John Doe"; // Update with the user's name fetched from your data source

  return (
    <Navbar className='w-auto p-1 navbar' style={{ marginTop: '0' }} bg="white" variant="light" expand="lg">
      <Row className="w-100">
        <Col sm={6} className="d-flex align-items-center">
          {/* Left side content */}
          <div className="logo-container">
            <img
              src="/img/logo-removebg-preview.png" // Update with your actual logo path
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
            <span>{' BlackMamba'}</span>
          </div>
        </Col>
        <Col sm={6} className="d-flex align-items-center justify-content-end">
          {/* Right side content */}
          <div className="user-info-container">
            <div className="user-name" style={{ fontWeight: 'bold', marginRight: '8px' }}>{userName}</div>
            <img
              src={profileImg}
              width="30"
              height="30"
              className="d-inline-block align-top rounded-circle"
              alt="Profile"
            />
            {/* Add any additional user information or actions here */}
          </div>
        </Col>
      </Row>
    </Navbar>
  );
}

export default NavBar;
