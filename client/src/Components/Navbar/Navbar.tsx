import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-container">
      <div className="navbar-left">
        <div className="navbar-logo">
        <img src="./SSCS-Mini-Logo.png" alt="IEEE SSCS" className="logo" />
        </div>

        <ul className="navbar-links">
        <li>
          <a
          href="#"
          className="nav-link"
          onClick={e => {
            e.preventDefault();
            navigate('/training');
          }}
          >
          Training
          </a>
        </li>
        <li>
          <a
          href="#"
          className="nav-link"
          onClick={e => {
            e.preventDefault();
            navigate('/events');
          }}
          >
          Events
          </a>
        </li>
        <li>
          <a
          href="#"
          className="nav-link"
          onClick={e => {
            e.preventDefault();
            navigate('/committee');
          }}
          >
          Committee
          </a>
        </li>
        <li>
          <a
          href="#"
          className="nav-link"
          onClick={e => {
            e.preventDefault();
            navigate('/news');
          }}
          >
          News
          </a>
        </li>
        </ul>
      </div>

      <div className="navbar-buttons">
        <button className="btn-outline" onClick={() => navigate('/login')}>
        Sign in
        </button>
        <button className="btn-filled" onClick={() => navigate('/signup')}>
        Join IEEE
        </button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
