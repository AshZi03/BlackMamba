// TopBar.js

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
const name = localStorage.getItem('name');
function TopBar() {

  return (
    <Navbar className='w-auto p-1' style={{ marginTop: '0' }} bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <img
          src="/img/logo-removebg-preview.png" // Update with your actual logo path
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logo"
        />
        {' BlackMamba'}
      </Navbar.Brand>
    </Navbar>
  );
}

export default TopBar;
