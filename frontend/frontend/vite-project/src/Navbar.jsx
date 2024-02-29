// TopBar.js

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';

function NavBar() {
  // Fetch user data from your data source (e.g., localStorage)
  const profileImg = "./img/jungle.png"; // Update with your actual default profile image path
  const userName = "John Doe"; // Update with the user's name fetched from your data source

  return (
    <Navbar className='w-auto p-1 navbar' style={{ marginTop: '0' }} bg="white" variant="light" expand="lg">
      <Navbar.Brand href="/">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div>
            <img
              src="/img/logo-removebg-preview.png" // Update with your actual logo path
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
            {' BlackMamba'}
          </div>
          <div className="d-flex align-items-center">
            <div style={{ fontWeight: 'bold', marginRight: '8px' }}>{userName}</div>
            <img
              src={profileImg}
              width="30"
              height="30"
              className="d-inline-block align-top rounded-circle ml-auto"
              alt="Profile"
            />
            {/* Add any additional user information or actions here */}
          </div>
        </div>
      </Navbar.Brand>
    </Navbar>
  );
}

export default NavBar;
