// NavBar.js

import React from 'react';
import './NavBar.css';
import UserPanel from './UserPanel';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const name = localStorage.getItem('name');
  // Fetch user data from your data source (e.g., localStorage)
  const profileImg = "./img/jungle.png"; // Update with your actual default profile image path
  const userName = name; // Update with the user's name fetched from your data source

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img
          src="/img/logo-removebg-preview.png" // Update with your actual logo path
          width="30"
          height="30"
          className="navbar-logo"
          alt="Logo"
        />
        <span className="navbar-brand-text">BlackMamba</span>
      </div>
      <div>
        <a href='/UserPanel' className='acolor'>
        <span className="navbar-brand-text">{name}</span>
        <img
          src="./img/jungle.png" // Update with your actual logo path
          width="30"
          height="30"
          className="navbar-logo rounded-circle"
          alt="Logo"
        />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
