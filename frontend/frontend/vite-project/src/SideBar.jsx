import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onOptionClick }) => {
  const navigate = useNavigate();

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
        navigate('/Login');

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

  const options = ['Home', 'Alphabets', 'Setting', 'About us', 'Log Out'];

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      {options.map((option, index) => (
        <Nav.Link key={index} onClick={option === 'Log Out' ? () => Logout() : () => onOptionClick(option)}>
          {option}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
