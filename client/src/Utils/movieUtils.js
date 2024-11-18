// movieUtils.js

// Construct URLs
export const imgUrl = "https://image.tmdb.org/t/p/original";
export const videoUrl = `https://www.youtube.com/embed/`;
export const SLIDE_INTERVAL = 5000;

// Filtered main actors (those with lowest order values, up to 5)
export const getActors = (movie) => {
  return movie?.credits.cast.sort((a, b) => a.order - b.order).slice(0, 5);
};

// Filtered directors (those with job "Director")
export const getDirectors = (movie) => {
  return movie?.credits.crew.filter((crew) => crew.job === "Director");
};

// Filtered trailer video
export const getTrailer = (movie) => {
  return movie?.videos.results.find((video) => video.type === "Trailer");
};

// Filtered logos
export const getLogos = (movie) => {
  return movie?.images.logos;
};

// Filtered top 4 movies
export const sortedMovies = (movie) => {
  return movie?.sort((a, b) => b.vote_average - a.vote_average).slice(0, 4);
};

export const renderStars = (rating, className = true) => {
  const stars = Math.round(rating / 2);
  return Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={className}>
      {index < stars ? "★" : "☆"}
    </span>
  ));
};

export const getYear = (date) => {
  return date ? date.split("-")[0] : null;
};
