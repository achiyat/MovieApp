// client/src/components/ScrollGallery/ScrollGalleryUtils.js
import { imgUrl, renderStars } from "../../Utils/movieUtils";
import { Link } from "react-router-dom";
import { genresDict } from "../../dictionaries/genresDict";

const getGenres = (genreIds) => {
  const genres = genreIds?.map((id) => genresDict[id])?.slice(0, 3) ?? [];
  return genres.join(", ");
};

export const Gallery = ({ items = [], renderItem, galleryRef }) => {
  return (
    <div className="scrollGallery-gallery-container">
      <div className="scrollGallery-gallery" ref={galleryRef}>
        {items?.map((item, index) => {
          if (typeof renderItem === "function") {
            return renderItem(item, index);
          }
          return null;
        })}
      </div>
    </div>
  );
};

export const ArrowButton = ({ direction, onClick }) => (
  <button
    className="scrollGallery-arrow"
    onClick={onClick}
    aria-label={`Scroll ${direction}`}
  >
    <span>{direction === "left" ? "◀" : "▶"}</span>
  </button>
);

export const renderMovieItem = (movie) => (
  <Link to={`/movie/${movie?.id}`} key={movie?.id}>
    <div className="scrollGallery-image-wrapper">
      <img src={`${imgUrl}${movie?.poster_path}`} alt={movie?.title} />
      <div className="scrollGallery-overlay">
        <div className="scrollGallery-genres">
          {getGenres(movie?.genre_ids)}
        </div>
        <div className="scrollGallery-rating">
          {renderStars(movie?.vote_average, "scrollGallery-star")}
        </div>
        <button className="scrollGallery-trailer">Watch Trailer</button>
      </div>
    </div>
  </Link>
);

export const renderImageItem = (image, index) => (
  <img
    key={index}
    src={`${imgUrl}${image?.file_path}`}
    alt={`Backdrop ${index + 1}`}
  />
);
