import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import React from 'react';
import './Layout.css'; 

const Layout: React.FC = () => {
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