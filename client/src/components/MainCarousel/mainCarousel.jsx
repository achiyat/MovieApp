// mainCarousel.jsx
import React from "react";
import "./mainCarousel.css";

export const MainCarousel = ({ movies }) => {
  return (
    <div className="mainCarousel-container">
      {movies.map((movie) => (
        <div key={movie.id} className="mainCarousel-card">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="mainCarousel-image"
          />
          <div className="mainCarousel-info">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
