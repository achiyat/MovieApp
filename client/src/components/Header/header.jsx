import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search/search";
import { FaBars } from "react-icons/fa";
import "./header.css";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header-header">
      <nav>
        <div className="header-links">
          <Link to="/" className="header-app-name">
            Movie App
          </Link>
          <button className="header-menu-icon" onClick={toggleMenu}>
            <FaBars />
          </button>
          <ul className={`header-nav-links ${menuOpen ? "open" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link>Series</Link>
            </li>
            <li>
              <Link>Movies</Link>
            </li>
            <li>
              <Link>Contact</Link>
            </li>
          </ul>
        </div>
        <Search />
      </nav>
    </header>
  );
};
