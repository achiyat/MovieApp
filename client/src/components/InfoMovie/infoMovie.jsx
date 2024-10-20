// client/src/components/InfoMovie/infoMovie.jsx
import React from "react";
import "./infoMovie.css";
import { getActors, getLogos, getYear, imgUrl } from "../../Utils/movieUtils";
import { Link } from "react-router-dom";

export const InfoMovie = ({ movie }) => {
  const actors = getActors(movie);

  const logos = getLogos(movie);

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const goldenStars = () => {
    return <span className="byMoviePage-star">★</span>;
  };

  const formatMovieDetails = () => {
    const rating = movie?.vote_average.toFixed(1);
    const year = getYear(movie?.release_date);
    const length = formatRuntime(movie?.runtime);
    return (
      <span>
        {rating} | {year} | {length}
      </span>
    );
  };

  return (
    <section className="infoMovie-container" id="info movie">
      <div className="infoMovie-background">
        <img src={`${imgUrl}${movie?.backdrop_path}`} alt={"Movie backdrop"} />
      </div>
      <div className="infoMovie-gradient-overlay"></div>
      <div className="infoMovie-details-box">
        {logos?.[0] && (
          <img
            src={`${imgUrl}${logos[0]?.file_path}`}
            alt="Movie Logo"
            className="infoMovie-logo"
          />
        )}
        <h1 className="infoMovie-title">{movie?.title}</h1>
        {movie?.genres?.map((genre) => (
          <Link to={`/genre/${genre.id}`} key={genre.id}>
            <div className="infoMovie-gunner">{genre.name}</div>
          </Link>
        ))}
        <div className="infoMovie-info">
          {goldenStars()} {formatMovieDetails()}
        </div>
        <div className="infoMovie-description">{movie?.overview}</div>
        <div>
          <strong>Starring:</strong>{" "}
          {actors?.map((actor) => actor.name).join(", ")}
        </div>
      </div>
    </section>
  );
};
