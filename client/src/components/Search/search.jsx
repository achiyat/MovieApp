// client/src/components/Search/search.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./search.css";

export const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults] = useState([]);
  //   const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-flex">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        {searchResults.length > 0 && (
          <ul className="search-results">
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
      <button className="search-sign">Sign up</button>
    </div>
  );
};
