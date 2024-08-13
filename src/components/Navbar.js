// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">SOL NFT Data Dash</Link>
        <div className="hidden md:flex space-x-4">
          <Link to="https://heyimsteve.com" target='_blank' className="hover:text-blue-200">Made by heyimsteve</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
