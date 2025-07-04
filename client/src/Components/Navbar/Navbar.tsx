import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src="./SSCS-Mini-Logo.png" alt="IEEE SSCS" className="logo" />
          </div>

          {/* Desktop Navigation */}
          <ul className="navbar-links">
            <li>
              <a
                href="#"
                className="nav-link"
                onClick={(e) => {
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
                onClick={(e) => {
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
                onClick={(e) => {
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
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/news');
                }}
              >
                News
              </a>
            </li>
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="navbar-buttons">
          <button className="btn-outline" onClick={() => navigate('/login')}>
            Sign in
          </button>
          <button className="btn-filled" onClick={() => navigate('/signup')}>
            Join IEEE
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <ul>
            <li>
              <button onClick={() => handleNavigation('/training')}>Training</button>
            </li>
            <li>
              <button onClick={() => handleNavigation('/events')}>Events</button>
            </li>
            <li>
              <button onClick={() => handleNavigation('/committee')}>Committee</button>
            </li>
            <li>
              <button onClick={() => handleNavigation('/news')}>News</button>
            </li>
          </ul>
          
          <div className="mobile-buttons">
            <button 
              className="mobile-btn-outline" 
              onClick={() => handleNavigation('/login')}
            >
              Sign in
            </button>
            <button 
              className="mobile-btn-filled" 
              onClick={() => handleNavigation('/signup')}
            >
              Join IEEE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;