// movieUtils.js

// Construct URLs
export const imgUrl = "https://image.tmdb.org/t/p/original";
export const videoUrl = `https://www.youtube.com/embed/`;

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
