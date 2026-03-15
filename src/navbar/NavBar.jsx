import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar">
        <div className="navbar-logo">
            <img src="/logo.png" alt="Logo" />
        </div>
        <div className="search-bar">
            <input type="text" placeholder="Search..." />
        </div>
        <ul className="navbar-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/signup/login">Signup/login</a></li>
        </ul>
        <div className="cart-icon">
            <img src="/cart.png" alt="Cart" />
        </div>
    </nav>
  );
};

export default NavBar;