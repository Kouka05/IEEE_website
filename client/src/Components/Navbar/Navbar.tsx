import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import './Navbar.css';

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

const Navbar: React.FC = () => {
  const [openMenuPath, setOpenMenuPath] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems: MenuItem[] = [
    { title: 'Home', href: '/' },
    {
      title: 'About',
      href: '#',
      submenu: [
        { title: 'Our Story', href: '/about' },
        { title: 'Our Team', href: '/team' },
        { title: 'Our Programs', href: '/programs' },
        { title: 'Who we are', href: '/who-we-are' }
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
            { title: 'Events', href: '/events' },
            { title: 'Mega-Events', href: '/mega-events' },
            { title: 'Chipions', href: '/chipions' }
          ],
        },
        { title: 'Media', href: '/media' },
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
        { title: 'Topics', href: '/topics' },
        { title: 'Projects', href: '/projects' },
        { title: 'Publications', href: '/publications' },
        { title: 'Facilities', href: '/facilities' },
      ],
    }
  ];

  const handleMenuToggle = (path: string) => {
    setOpenMenuPath(openMenuPath === path ? null : path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuPath(null);
        setIsMobileMenuOpen(false);
      }
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav 
      ref={menuRef} 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="navbar-content">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo-circle">
            <img 
              src="/SSCS-Mini-Logo.png" 
              alt="IEEE SSCS" 
              className="logo" 
              width="36" 
            />
          </div>
          <span className="logo-text">
            <span className="logo-main">SSCS</span>
            <span className="logo-sub">Alex Branch</span>
          </span>
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
          <a href="/join" className="join-button">
            <span className="join-button-span">Join IEEE</span>
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="mobile-menu-button">
          <button onClick={toggleMobileMenu} className="mobile-menu-toggle">
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
            <a href="/join" className="join-button">
              <span className="join-button-span">Join IEEE</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;