import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Sun, Moon, Menu, X } from 'lucide-react';

// Page components
const HomePage = () => <div className="page">Home Page</div>;
const AboutPage = () => <div className="page">About Page</div>;
const WorkPage = () => <div className="page">Our Work Page</div>;
const ContactPage = () => <div className="page">Contact Page</div>;
const ToolsPage = () => <div className="page">Tools Page</div>;
const ProjectPage = () => <div className="page">Projects Page</div>;
const ProgramsPage = () => <div className="page">Programs Page</div>;
const EventsPage = () => <div className="page">Events Page</div>;
const JoinPage = () => <div className="page">Join IEEE Page</div>;

interface SubMenuItem {
  title: string;
  href: string;
  submenu?: SubMenuItem[];
}

interface MenuItem {
  title: string;
  href: string;
  submenu?: SubMenuItem[];
}

export default function App() {
  return (
    <Router>
      <Navbar />
    </Router>
  );
}

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isRotating, setIsRotating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: MenuItem[] = [
    { title: 'Home', href: '/' },
    {
      title: 'About',
      href: '/about',
      submenu: [
        { title: 'Our Story', href: '/about/story' },
        { title: 'Our Team', href: '/about/team' },
        { title: 'Careers', href: '/about/careers' },
      ],
    },
    {
      title: 'Our Work',
      href: '/our-work',
      submenu: [
        { 
          title: 'Projects', 
          href: '/projects',
          submenu: [
            { title: 'Programs', href: '/programs' },
            { title: 'Events', href: '/events' }
          ]
        },
        { title: 'Research', href: '/research' },
        { title: 'Publications', href: '/publications' },
      ],
    },
    {
      title: 'Contact',
      href: '/contact',
      submenu: [
        { title: 'Get in Touch', href: '/contact/touch' },
        { title: 'Locations', href: '/contact/locations' },
      ],
    },
    { title: 'Tools', href: '/tools' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleMenuToggle = (title: string) => {
    if (openMenu === title) {
    if (openMenu === title) {
      setOpenMenu(null);
    } else {
      setOpenMenu(title);
    }


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenMenu(null);
    setOpenMenu(null);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenMenu(null);
    setIsRotating(true);
    setTimeout(() => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      setIsRotating(false);
    }, 300);
  };

  const navigateTo = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
    setOpenMenu(null);
    navigate(href);
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
      if (event && menuRef.current && !menuRef.current.contains((event as MouseEvent).target as Node)) {
        setOpenMenu(null);
        setOpenMenu(null);
        setIsMobileMenuOpen(false);
      }
    };
        setOpenMenu(null);
        setIsMobileMenuOpen(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Render desktop menu items
  const renderDesktopMenu = (items: MenuItem[], level = 0) => (
    <>
      {items.map((item) => (
        <div key={`${level}-${item.title}`} className={`menu-item-container ${level > 0 ? 'submenu' : ''}`}>
          <div
            className={`menu-item ${isActive(item.href) ? 'active' : ''}`}
            onClick={() => {
              if (item.submenu) {
                handleMenuToggle(item.title);
              } else {
                navigateTo(item.href);
              }
            }}
          >
            {item.title}
            {item.submenu && (
              <ChevronDown 
                size={16} 
                className={`ml-1 transition-transform ${openMenu === item.title ? 'rotate-180' : ''}`} 
              />
            )}
          </div>
          
          {item.submenu && openMenu === item.title && (
            <div className={`submenu-container ${level > 0 ? 'nested' : ''}`}>
              {renderDesktopMenu(item.submenu, level + 1)}
            </div>
          )}
        </div>
      ))}
    </>
  );

  // Render mobile menu items
  const renderMobileMenu = (items: MenuItem[], level = 0) => (
    <>
      {items.map((item) => (
        <div key={`m-${level}-${item.title}`} className="mobile-menu-item">
          <div className="mobile-menu-link-container">
            <div
              className={`mobile-menu-link ${isActive(item.href) ? 'active' : ''}`}
              onClick={() => {
                if (!item.submenu) {
                  navigateTo(item.href);
                } else {
                  handleMenuToggle(item.title);
                }
              }}
            >
              {item.title}
            </div>
            
            {item.submenu && (
              <button
                className="mobile-menu-toggle"
                onClick={() => handleMenuToggle(item.title)}
              >
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${openMenu === item.title ? 'rotate-180' : ''}`} 
                />
              </button>
            )}
          </div>
          
          {item.submenu && openMenu === item.title && (
            <div className={`mobile-submenu ${level > 0 ? 'nested' : ''}`}>
              {renderMobileMenu(item.submenu, level + 1)}
            </div>
          )}
        </div>
      ))}
    </>
  );

      // Remove the unused toggleTheme stub, as the actual theme toggle logic is already implemented inline above.

  return (
    <nav ref={menuRef} className="navbar">
      <div className="navbar-inner">
        <div className="logo-container">
          <div className="logo-link" onClick={() => navigateTo('/')}>
            <svg width="40" height="40" viewBox="0 0 256 256" className="logo-svg">
              <path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm48-88a48 48 0 0 1-48 48V80a48 48 0 0 1 48 48Z"/>
            </svg>
            <span className="logo-text">IEEE Student Branch</span>
          </div>
        </div>

        <div className="desktop-menu">
          {renderDesktopMenu(navItems)}
        </div>

        <div className="desktop-buttons">
          <div className="join-button" onClick={() => navigateTo('/join')}>
            <span className="join-button-overlay"></span>
            <span className="join-button-border"></span>
            <span className="join-button-gradient"></span>
            <span className="join-button-text">Join IEEE</span>
          </div>
          <button 
            className={`theme-button ${isRotating ? 'rotating' : ''}`}
            
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="mobile-menu-button">
          <button 
            onClick={toggleMobileMenu} 
            className="mobile-toggle-button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {renderMobileMenu(navItems)}
          <div className="mobile-buttons">
            <div 
              className="mobile-join-button"
              onClick={() => navigateTo('/join')}
            >
              <span className="mobile-join-overlay"></span>
              <span className="mobile-join-text">Join IEEE</span>
            </div>
            <button 
              className="mobile-theme-button"
              
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span>Theme</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

{/* 
  Old NavBar
  
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const canCreateEvent = user && (user.role === 'Head' || user.role === 'Chairman');

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
            {canCreateEvent && (
              <li>
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/createevent');
                  }}
                >
                  Create Event
                </a>
              </li>
            )}
          </ul>
        </div>

        
        <div className="navbar-buttons">
          {user ? (
            <button className="btn-outline" onClick={() => { logout(); navigate('/'); }}>
              Sign out
            </button>
          ) : (
            <>
              <button className="btn-outline" onClick={() => navigate('/login')}>
                Sign in
              </button>
              <button className="btn-filled" onClick={() => navigate('/signup')}>
                Join IEEE
              </button>
            </>
          )}
        </div>

        
        <button className="mobile-menu-button" onClick={toggleMenu}>
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

     
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
            {canCreateEvent && (
              <li>
                <button onClick={() => handleNavigation('/createevent')}>Create Event</button>
              </li>
            )}
          </ul>
          
          <div className="mobile-buttons">
            {user ? (
              <button 
                className="mobile-btn-outline" 
                onClick={() => { logout(); handleNavigation('/'); }}
              >
                Sign out
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; */}


