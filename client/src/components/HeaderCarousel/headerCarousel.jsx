import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { imgUrl, renderStars } from "../../Utils/movieUtils";
import { genresDict } from "../../dictionaries/genresDict";
import "./headerCarousel.css";

export const HeaderCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="headerCarousel-container">
      {movies.length > 0 && (
        <div className="headerCarousel-slide">
          <img
            src={`${imgUrl}${movies[currentIndex].backdrop_path}`}
            alt={movies[currentIndex].title}
            className="headerCarousel-image"
          />
          <div className="headerCarousel-movie-details">
            <h3 className="headerCarousel-title">
              {movies[currentIndex].title}
            </h3>
            <div className="headerCarousel-overview">
              {movies[currentIndex].overview}
            </div>
            <div className="headerCarousel-details-row">
              <div className="headerCarousel-rating">
                {renderStars(
                  movies[currentIndex].vote_average,
                  "headerCarousel-star"
                )}
              </div>
              <p className="headerCarousel-tags">
                {movies[currentIndex].genre_ids
                  ?.map((genreId) => genresDict[genreId])
                  .join(", ")}
              </p>
              <p className="headerCarousel-date">
                {movies[currentIndex].release_date}
              </p>
            </div>
            <Link to={`/movie/${movies[currentIndex].id}`}>
              <button className="headerCarousel-trailer">Watch Trailer</button>
            </Link>
          </div>
          <button className="headerCarousel-arrow prev" onClick={handlePrev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button className="headerCarousel-arrow next" onClick={handleNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </div>
  );
};
