// client/src/components/ScrollGallery/scrollGallery.jsx
import React, { useEffect, useRef } from "react";
import { genresDict } from "../../dictionaries/genresDict";
import "./scrollGallery.css";
import { Link } from "react-router-dom";
import { imgUrl, renderStars } from "../../Utils/movieUtils";

export const ScrollGallery = ({ movies, images }) => {
  const moviesGalleryRef = useRef(null);
  const imagesGalleryRef = useRef(null);

  const scrollLeft = (refMovies) => {
    const ref = refMovies?.current ? refMovies : imagesGalleryRef;
    const scrollAmount = refMovies ? scrollAmountImages(ref) : 286;
    ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = (refMovies) => {
    const ref = refMovies?.current ? refMovies : imagesGalleryRef;
    const scrollAmount = refMovies?.current ? scrollAmountImages(ref) : 286;
    ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollAmountImages = (ref) => {
    const count = calculateVisibleCount(ref);
    return count * 215;
  };

  const calculateVisibleCount = (ref) => {
    const containerWidth = ref.current.offsetWidth;
    const imageWidth = ref.current.children[0]?.offsetWidth + 15 || 215;
    return Math.floor(containerWidth / imageWidth);
  };

  useEffect(() => {
    if (moviesGalleryRef.current) {
      const interval = setInterval(() => {
        moviesGalleryRef.current.scrollBy({ left: 215, behavior: "smooth" });
      }, 5000);
      return () => clearInterval(interval);
    }

    if (imagesGalleryRef.current) {
      const interval = setInterval(() => {
        imagesGalleryRef.current.scrollBy({ left: 286, behavior: "smooth" });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [movies, images, moviesGalleryRef, imagesGalleryRef]);

  const getGenres = (genreIds) => {
    const genres = genreIds.map((id) => genresDict[id]).slice(0, 3);
    return genres.join(", ");
  };

  return (
    <section className="scrollGallery-container">
      <button
        className="scrollGallery-arrow"
        onClick={() => scrollLeft(moviesGalleryRef)}
        aria-label="Scroll left"
      >
        <span>◀</span>
      </button>

      {movies && (
        <div className="scrollGallery-gallery-container">
          <div className="scrollGallery-gallery" ref={moviesGalleryRef}>
            {movies.map((movie, index) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div key={index} className="scrollGallery-image-wrapper">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="scrollGallery-overlay">
                    <div className="scrollGallery-genres">
                      {getGenres(movie.genre_ids)}
                    </div>
                    <div className="scrollGallery-rating">
                      {renderStars(movie.vote_average, "scrollGallery-star")}
                    </div>
                    <button className="scrollGallery-trailer">
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {images && (
        <div className="scrollGallery-gallery-container">
          <div className="scrollGallery-gallery" ref={imagesGalleryRef}>
            {images.map((image, index) => (
              <img
                key={index}
                src={`${imgUrl}${image.file_path}`}
                alt={`Backdrop ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      <button
        className="scrollGallery-arrow"
        onClick={() => scrollRight(moviesGalleryRef)}
        aria-label="Scroll right"
      >
        <span>▶</span>
      </button>
    </section>
  );
};
