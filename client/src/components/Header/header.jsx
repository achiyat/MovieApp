// header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
  };

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
              <Link to="/movie/:1022789">Series</Link>
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
          <div className="header-search-container">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchResults.length > 0 && (
              <ul className="header-search-results">
                {searchResults.slice(0, 5).map((movie) => (
                  <li key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                      <img src={movie.poster} alt={movie.title} />
                      <span>{movie.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="header-sign-up-btn">Sign up now</button>
        </div>
      </nav>
    </header>
  );
};
