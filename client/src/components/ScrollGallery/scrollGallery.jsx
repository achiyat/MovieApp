import React, { useEffect, useRef } from "react";
import "./scrollGallery.css";

export const ScrollGallery = ({ movies }) => {
  const galleryRef = useRef(null);

  const scrollLeft = () => {
    const scrollAmount = calculateScrollAmount();
    galleryRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    const scrollAmount = calculateScrollAmount();
    galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const calculateScrollAmount = () => {
    const count = calculateVisibleCount();
    return count * 215;
  };

  const calculateVisibleCount = () => {
    const containerWidth = galleryRef.current.offsetWidth;
    const imageWidth = galleryRef.current.children[0]?.offsetWidth + 15 || 215;
    return Math.floor(containerWidth / imageWidth);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      galleryRef.current.scrollBy({ left: 215, behavior: "smooth" });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="scroll-gallery">
      <button
        className="scroll-nav"
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        <span>◀</span>
      </button>
      <div className="gallery-container">
        <div className="gallery" ref={galleryRef}>
          {movies.map((movie, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ))}
        </div>
      </div>
      <button
        className="scroll-nav"
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        <span>▶</span>
      </button>
    </section>
  );
};
