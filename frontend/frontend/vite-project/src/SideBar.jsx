// Sidebar.js

import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ onOptionClick }) => {
  const options = ['Home', 'Alphabets', 'Setting', 'About us', 'Log Out'];

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      {options.map((option, index) => (
        <Nav.Link key={index} onClick={() => onOptionClick(option)}>
          {option}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;
