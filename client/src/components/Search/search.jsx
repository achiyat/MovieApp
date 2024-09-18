// client/src/components/Search/search.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./search.css";
import { getYear, imgUrl } from "../../Utils/movieUtils";
import { fetchSearchMovies } from "../../services/services";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const closeMenu = () => {
    setSearchResults([]);
    setSearchTerm("");
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Only search when there are 3 or more characters
    if (term.length >= 3) {
      const data = await fetchSearchMovies(term);
      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
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
            {searchResults.slice(0, 10).map((movie) => (
              <li key={movie?.id}>
                <Link to={`/movie/${movie?.id}`} onClick={closeMenu}>
                  <img src={`${imgUrl}${movie?.poster_path}`} alt="" />
                  <div className="search-content">
                    <span className="search-title">{movie?.title}</span>
                    <span className="search-year">
                      {getYear(movie?.release_date)}
                    </span>
                  </div>
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
