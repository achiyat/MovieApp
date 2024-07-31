// headerCarousel.jsx
import React, { useState, useEffect } from "react";
import "./headerCarousel.css";
import { genresDict } from "../../dictionaries/genresDict";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

  const renderStars = (rating) => {
    const stars = Math.round(rating / 2);
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="headerCarousel-star">
        {index < stars ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <>
      <div className="headerCarousel-inner">
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`headerCarousel-item ${
              index === activeIndex ? "active" : ""
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="headerCarousel-movie-details">
              <h3 className="headerCarousel-title">{movie.title}</h3>
              <p className="headerCarousel-overview">{movie.overview}</p>
              <div className="headerCarousel-rating">
                {renderStars(movie.vote_average)}
              </div>
              <p className="headerCarousel-date">{movie.release_date}</p>
              <p className="headerCarousel-tags">
                {movie.genre_ids
                  .map((genreId) => genresDict[genreId])
                  .join(", ")}
              </p>
              <Link to={`/movie/${movies[activeIndex].id}`}>
                <button className="headerCarousel-trailer">
                  Watch Trailer
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div
        className="headerCarousel-arrow prev"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div
        className="headerCarousel-arrow next"
        onClick={handleNext}
        aria-label="Next"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </>
  );
};
