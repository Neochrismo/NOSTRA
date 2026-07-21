import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';

function Navbar() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
         {/* Logo */}
        <Link to="/" className="text-md font-bold text-green-300">
          Logo
        </Link>
        <div className="md:hidden mt-3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 placeholder:text-gray-500 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
         <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 border border-gray-300 placeholder:text-gray-500 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
        />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/about" className="hover:text-green-600">About</Link>
          <Link to="/contact" className="hover:text-green-600">Contact</Link>
          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Signup/Login
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-2">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="bg-green-600 text-white px-4 py-2 rounded text-center"
          >
            Signup/Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;