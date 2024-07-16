// HeaderCarousel.jsx
import React, { useState, useEffect } from "react";
import "./headerCarousel.css";
import { genresDict } from "../../dictionaries/genresDict";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export const HeaderCarousel = ({ movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(movies.length - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(activeIndex);
      setActiveIndex((activeIndex + 1) % movies.length);
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [activeIndex, movies.length]);

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + movies.length) % movies.length);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % movies.length);
  };

  return (
    <>
      <div id="headerCarousel" className="carousel-inner">
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="movie-details">
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
              <div className="rating">
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9734;</span> {/* Example for rating */}
              </div>
              <p>{movie.release_date}</p>
              <p className="tags">
                {movie.genre_ids
                  .map((genreId) => genresDict[genreId])
                  .join(", ")}
              </p>
              <button className="watch-trailer">Watch Trailer</button>
            </div>
          </div>
        ))}
      </div>
      <div
        className="carousel-control prev"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div
        className="carousel-control next"
        onClick={handleNext}
        aria-label="Next"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
};
