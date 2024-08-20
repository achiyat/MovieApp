// client/src/components/Header/header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Search } from "../Search/search";
import "./header.css";

export const Header = () => {
  return (
    <header className="header-header">
      <nav>
        <div className="header-left-nav">
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
        <div className="header-right-nav">
          <Search />
          <button className="header-sign-up-btn">Sign up now</button>
        </div>
      </nav>
    </header>
  );
};
