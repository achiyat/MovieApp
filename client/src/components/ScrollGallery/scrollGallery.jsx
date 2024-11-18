import React, { useRef, useEffect } from "react";
import {
  ArrowButton,
  Gallery,
  renderImageItem,
  renderMovieItem,
} from "./ScrollGalleryUtils";
import { SLIDE_INTERVAL } from "../../Utils/movieUtils";
import "./scrollGallery.css";

export const ScrollGallery = ({ movies = [], images = [] }) => {
  const galleryRef = useRef(null);

  // Determine the items and rendering function based on the presence of movies or images
  const items = movies?.length ? movies : images || [];
  const renderItem = movies?.length
    ? renderMovieItem
    : images?.length
    ? renderImageItem
    : null;

  const calcImageWidth = () => {
    const firstChild = galleryRef?.current?.children[0];
    if (movies?.length && firstChild) return firstChild?.offsetWidth ?? 220;

    if (images?.length && firstChild) {
      const imageWidth = firstChild?.offsetWidth ?? 266;
      const marginRight =
        parseInt(window.getComputedStyle(firstChild).marginRight) ?? 20;
      return imageWidth + marginRight ?? 286;
    }
  };

  const calcScrollAmount = () => {
    const containerWidth = galleryRef?.current?.offsetWidth ?? 0;
    const imageWidth = calcImageWidth();
    return Math.floor(containerWidth / imageWidth) * imageWidth;
  };

  const scrollLeft = () => {
    if (galleryRef.current) {
      const scrollAmount = calcScrollAmount();
      galleryRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (galleryRef.current) {
      const scrollAmount = calcScrollAmount();
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (items?.length > 0 && galleryRef.current) {
      const imageWidth = calcImageWidth();
      const interval = setInterval(() => {
        galleryRef.current.scrollBy({ left: imageWidth, behavior: "smooth" });
      }, SLIDE_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [items]);

  return (
    <section className="scrollGallery-container">
      <ArrowButton direction="left" onClick={scrollLeft} />
      <Gallery items={items} renderItem={renderItem} galleryRef={galleryRef} />
      <ArrowButton direction="right" onClick={scrollRight} />
    </section>
  );
};
