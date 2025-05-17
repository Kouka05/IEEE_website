import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
<div className="navbar-container">
  <div className="navbar-left">
    <div className="navbar-logo">
      <img src="./SSCS_small.jpg" alt="IEEE SSCS" className="logo" />
    </div>

    <ul className="navbar-links">
      <li><a href="#" className="nav-link">Training</a></li>
      <li><a href="#" className="nav-link">Events</a></li>
      <li><a href="#" className="nav-link">Committee</a></li>
      <li><a href="#" className="nav-link">News</a></li>
    </ul>
  </div>

  <div className="navbar-buttons">
    <button className="btn-outline">Sign in</button>
    <button className="btn-filled">Join IEEE</button>
  </div>
</div>

    </nav>
  );
};

export default Navbar;
