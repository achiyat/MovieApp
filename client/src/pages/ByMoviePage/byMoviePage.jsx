// byMoviePage.jsx
import "./byMoviePage.css";
import React, { useEffect, useState } from "react";
import { fetchByMovieDetails } from "../../services/services";

export const ByMoviePage = ({ movieId }) => {
  const [byMovieDetails, setByMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const byMovieDetailsData = await fetchByMovieDetails(280180);
      setByMovieDetails(byMovieDetailsData);
    };

    fetchMovies();
  }, [movieId]);

  // Filtered trailer video
  const trailerVideo = byMovieDetails?.videos.results.find(
    (video) => video.type === "Trailer"
  );

  // Filtered main actors (those with lowest order values, up to 5)
  const mainActors = byMovieDetails?.credits.cast
    .sort((a, b) => a.order - b.order)
    .slice(0, 5);

  return (
    <div className="byMovie-page">
      <header className="byMovie-header">
        {trailerVideo && (
          <div className="byMovie-trailer">
            <iframe
              title="movie trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerVideo.key}`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
        <h1 className="byMovie-movie-title">{byMovieDetails?.title}</h1>
      </header>

      <main className="byMovie-main-section">
        <div className="byMovie-film-synopsis">
          <h2>Synopsis</h2>
          <p>{byMovieDetails?.overview}</p>
          {byMovieDetails?.images?.backdrops?.length > 0 && (
            <div className="byMovie-image-gallery">
              {byMovieDetails?.images.backdrops.map((image, index) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  alt={`Movie backdrop ${index}`}
                  className="byMovie-movie-image"
                />
              ))}
            </div>
          )}
        </div>

        <div className="byMovie-general-details">
          <h2>General Details</h2>
          <p>Release Date: {byMovieDetails?.release_date}</p>
          <p>
            Genres:{" "}
            {byMovieDetails?.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            Rating: {byMovieDetails?.vote_average} ({byMovieDetails?.vote_count}{" "}
            votes)
          </p>
          <p>Duration: {byMovieDetails?.runtime} minutes</p>
        </div>
      </main>

      {/* Cast and Crew Section */}
      <div className="byMovie-cast-crew-section">
        <h2>Cast and Crew</h2>
        {/* Directors */}
        <div className="byMovie-directors">
          <h3>Directors</h3>
          {byMovieDetails?.credits?.crew
            ?.filter((member) => member.job === "Director")
            .map((director) => (
              <div key={director.credit_id} className="byMovie-director">
                <img
                  src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                  alt={`Director ${director.name}`}
                  className="byMovie-director-image"
                />
                <p>{director.name}</p>
              </div>
            ))}
        </div>

        {/* Main Actors */}
        <div className="byMovie-actors">
          <h3>Main Actors</h3>
          {mainActors?.map((actor) => (
            <div key={actor.credit_id} className="byMovie-actor">
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={`Actor ${actor.name}`}
                className="byMovie-actor-image"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="byMovie-reviews-section">
        <h2>Reviews</h2>
        <p>Placeholder for reviews. You can implement this later.</p>
      </div>

      {/* Similar Movies Section */}
      <div className="byMovie-similar-movies-section">
        <h2>Similar Movies</h2>
        {byMovieDetails?.similar?.results?.map((movie) => (
          <p key={movie.id}>{movie.title}</p>
        ))}
      </div>

      <footer>
        {/* Footer Section */}
        footer
      </footer>
    </div>
  );
};
