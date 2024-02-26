// TopBar.js

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
function TopBar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const email = localStorage.getItem('email');
  const userId = localStorage.getItem('userid');
  
  const Logout = async () => {
    
    try {
      const response = await fetch('http://localhost:8081/logout', {
        method: 'POST',
        credentials: 'include', // Include credentials for cross-origin requests
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('userid');
        navigate('/');

        // Logout successful, perform any additional actions (e.g., redirect)
        console.log('Logout successful');
      } else {
        // Logout failed, handle the error
        console.error('Error during logout:', data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };


  return (
    <Navbar className='w-auto p-1' style={{ marginTop: '0' }} bg="white" variant="light" expand="lg">
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
