import React, { useEffect, useRef } from "react";
import "./scrollGallery.css";

export const ScrollGallery = ({ movies, images }) => {
  const moviesGalleryRef = useRef(null);
  const imagesGalleryRef = useRef(null);

  const scrollLeft = (refMovies) => {
    const ref = refMovies ? refMovies : imagesGalleryRef;
    if (ref && ref.current) {
      const scrollAmount = refMovies ? scrollAmountImages(ref) : 276;
      ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = (refMovies) => {
    const ref = refMovies?.current ? refMovies : imagesGalleryRef;
    const scrollAmount = refMovies?.current ? scrollAmountImages(ref) : 276;
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
  }, []);

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
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ))}
          </div>
        </div>
      )}

      {images && (
        <div className="gallery-container">
          <div className="gallery" ref={imagesGalleryRef}>
            {images.map((image, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/original${image.file_path}`}
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
