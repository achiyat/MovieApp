// client/src/components/Header/header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search/search";
import "./header.css";

export const Header = () => {
  return (
    <header className="header-header">
      <nav>
        <div className="header-links">
          <Link to="/" className="header-app-name">
            Movie App
          </Link>
          <ul>
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
