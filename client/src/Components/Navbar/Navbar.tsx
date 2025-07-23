import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sun, Moon, Menu, X, ChevronRight } from 'lucide-react';
import './Navbar.css';

// --- Type Definitions for Nested Menus ---
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

// --- Main App Component ---
export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className={`app-container`}>
      <Navbar theme={theme} setTheme={setTheme} />
    </div>
  );
}

// --- Navbar Component ---
interface NavbarProps {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [openMenuPath, setOpenMenuPath] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems: MenuItem[] = [
    { title: 'Home', href: '#' },
    {
      title: 'About',
      href: '#',
      submenu: [
        { title: 'Our Story', href: '#' },
        { title: 'Our Team', href: '#' },
        { title: 'Our Programs', href: '#' },
        { title: 'Who we are', href: '#' }
      ],
    },
    {
      title: 'Activities',
      href: '#',
      submenu: [
        {
          title: 'Programs',
          href: '#',
          submenu: [
            { title: 'Events', href: '#' },
            { title: 'Mega-Events', href: '#' },
            { title: 'Chipions', href: '#' }
          ],
        },
        { title: 'Media', href: '#' },
      ],
    },
    {
      title: 'Contact',
      href: '#',
      submenu: [
        { title: 'Become a Partner', href: '/contact/partner' },
        { title: 'Become a Speaker', href: '/contact/speaker' },
      ],
    },
        {
      title: 'Hub',
      href: '#',
      submenu: [
        { title: 'Topics', href: '#' },
        { title: 'Projects', href: '#' },
        { title: 'Publications', href: '#' },
        { title: 'Facilities', href: '#' },
      ],
    }
  ];

  const handleMenuToggle = (path: string) => {
    setOpenMenuPath(openMenuPath === path ? null : path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuPath(null);
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav ref={menuRef} className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <div className="logo-container">
          <img src="./SSCS-Mini-Logo.png" alt="IEEE SSCS" className="logo" width="40px" />
          <span className="logo-text">SSCS Alex Branch</span>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          {navItems.map((item) => (
            <div key={item.title} className="menu-item">
              <button
                onClick={() => item.submenu && handleMenuToggle(item.title)}
                className={`menu-button ${item.title === 'Home' ? 'active' : ''}`}
              >
                {item.title}
                {item.submenu && <ChevronDown size={16} className="menu-icon" />}
              </button>
              
              {item.submenu && openMenuPath?.startsWith(item.title) && (
                <div className="submenu">
                  {item.submenu.map((subItem) => (
                    <div key={subItem.title} className="submenu-item">
                      <button
                        onClick={() => subItem.submenu && handleMenuToggle(`${item.title}>${subItem.title}`)}
                        className="submenu-button"
                      >
                        <a href={subItem.href}>{subItem.title}</a>
                        {subItem.submenu && <ChevronRight size={14} />}
                      </button>
                      
                      {subItem.submenu && openMenuPath === `${item.title}>${subItem.title}` && (
                        <div className="nested-submenu">
                          {subItem.submenu.map(nestedItem => (
                            <a
                              key={nestedItem.title}
                              href={nestedItem.href}
                              className="submenu-link"
                            >
                              {nestedItem.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side buttons */}
        <div className="right-buttons">
          <a href="#" className="join-button">
            <span className="join-button-span">Join IEEE</span>
          </a>
          <button onClick={handleThemeToggle} className="theme-button">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="mobile-menu-button">
          <button onClick={toggleMobileMenu} className="theme-button">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <div key={item.title} className="mobile-menu-item">
              <button 
                onClick={() => item.submenu && handleMenuToggle(item.title)} 
                className="mobile-menu-button-item"
              >
                <a href={item.href}>{item.title}</a>
                {item.submenu && (
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${openMenuPath?.startsWith(item.title) ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>
              
              {item.submenu && openMenuPath?.startsWith(item.title) && (
                <div className="mobile-submenu">
                  {item.submenu.map((subItem) => (
                    <div key={subItem.title} className="mobile-menu-item">
                      <button 
                        onClick={() => subItem.submenu && handleMenuToggle(`${item.title}>${subItem.title}`)} 
                        className="mobile-menu-button-item"
                      >
                        <a href={subItem.href}>{subItem.title}</a>
                        {subItem.submenu && (
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform ${openMenuPath === `${item.title}>${subItem.title}` ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </button>
                      
                      {subItem.submenu && openMenuPath === `${item.title}>${subItem.title}` && (
                        <div className="mobile-nested-submenu">
                          {subItem.submenu.map(nestedItem => (
                            <a 
                              key={nestedItem.title} 
                              href={nestedItem.href} 
                              className="submenu-link"
                            >
                              {nestedItem.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="mobile-menu-footer">
            <a href="#" className="join-button">
              <span className="join-button-span">Join IEEE</span>
            </a>
            <button onClick={handleThemeToggle} className="mobile-theme-button">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span>Toggle Theme</span>
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


