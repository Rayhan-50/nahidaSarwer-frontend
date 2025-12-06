import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';


const Main = () => {
  const location = useLocation();
  // Only hide Navbar and Footer for login and signup pages
  const noHeaderFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-100">
      {!noHeaderFooter && <Navbar />}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

    </div>
  );
};

export default Main;