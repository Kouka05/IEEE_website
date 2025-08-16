import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import React from 'react';

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;