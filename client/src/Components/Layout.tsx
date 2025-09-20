import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import React from 'react';
import './Layout.css'; 
import { useEffect } from 'react';

const Layout: React.FC = () => {
  useEffect(() => {
    const reveal = (el: Element) => (el as HTMLElement).classList.add('reveal-visible');

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    const mo = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;
          if (node.matches('.reveal') && !node.classList.contains('reveal-visible')) io.observe(node);
          node.querySelectorAll?.('.reveal:not(.reveal-visible)')?.forEach(el => io.observe(el));
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    requestAnimationFrame(() => {
      document.querySelectorAll('[data-reveal-on-load]')
        .forEach(el => (el as HTMLElement).classList.add('reveal-visible'));
    });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  return (
    <div>
      <Navbar />
      <main className='main-content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;