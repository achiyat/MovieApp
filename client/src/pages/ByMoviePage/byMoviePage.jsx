// byMoviePage.jsx
import React, { useEffect, useState } from "react";
import "./byMoviePage.css";
import { fetchByMovieDetails } from "../../services/services";
import { ScrollGallery } from "../../components/ScrollGallery/scrollGallery";
import { useParams } from "react-router-dom";

export const ByMoviePage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  // Construct URLs
  const videoUrl = `https://www.youtube.com/embed/`;
  const imgUrl = "https://image.tmdb.org/t/p/original";

  // Filtered trailer video
  const trailerVideo = movieDetails?.videos.results.find(
    (video) => video.type === "Trailer"
  );

  // Filtered main actors (those with lowest order values, up to 5)
  const mainActors = movieDetails?.credits.cast
    .sort((a, b) => a.order - b.order)
    .slice(0, 5);

  // Filtered directors (those with job "Director")
  const directors = movieDetails?.credits.crew.filter(
    (crew) => crew.job === "Director"
  );

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const goldenStars = () => {
    return <span className="byMoviePage-star">★</span>;
  };

  const formatMovieDetails = () => {
    const rating = movieDetails?.vote_average.toFixed(1);
    const year = movieDetails?.release_date.split("-")[0];
    const length = formatRuntime(movieDetails?.runtime);
    return (
      <span>
        {rating} | {year} | {length}
      </span>
    );
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const movieDetailsData = await fetchByMovieDetails(movieId);
      console.log(movieDetailsData);
      setMovieDetails(movieDetailsData);
    };

    if (movieId) return fetchMovies();
  }, [movieId]);

  return (
    <>
      <header>
        <div className="byMoviePage-header-container">
          <div className="byMoviePage-background">
            <img
              src={`${imgUrl}${movieDetails?.backdrop_path}`}
              alt={"Movie backdrop"}
            />
          </div>
          <div className="byMoviePage-gradient-overlay"></div>
          <div className="byMoviePage-details-box">
            <img
              src={`${imgUrl}${movieDetails?.images.logos[0].file_path}`}
              alt="Movie Logo"
              className="byMoviePage-logo"
            />
            <h1 className="byMoviePage-title">{movieDetails?.title}</h1>
            {movieDetails?.genres?.map((genre) => (
              <div className="byMoviePage-gunner">{genre.name}</div>
            ))}
            <div className="byMoviePage-info">
              {goldenStars()} {formatMovieDetails()}
            </div>
            <div className="byMoviePage-description">
              {movieDetails?.overview}
            </div>
            <div>
              <strong>Starring:</strong>{" "}
              {mainActors?.map((actor) => actor.name).join(", ")}
            </div>
          </div>
        </div>
      </header>

      <main className="byMoviePage-main">
        <section className="byMoviePage-trailer" id="trailer">
          <h2 className="byMoviePage-sectionTitle">Watch the Trailer</h2>
          {videoUrl && (
            <iframe
              src={`${videoUrl}${trailerVideo?.key}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </section>

        <section className="byMoviePage-photoGallery" id="gallery">
          <h2 className="byMoviePage-sectionTitle">Photo Gallery</h2>
          <div className="byMoviePage-scroll">
            <ScrollGallery images={movieDetails?.images.backdrops} />
          </div>
        </section>

        <section className="byMoviePage-credits" id="credits">
          <div className="byMoviePage-directorsList">
            <h2 className="byMoviePage-sectionTitle">Directors</h2>
            <ul>
              {directors?.map((director) => (
                <li key={director.id}>
                  <img
                    src={`${imgUrl}${director.profile_path}`}
                    alt={director.name}
                  />
                  <span>{director.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="byMoviePage-actorsList">
            <h2 className="byMoviePage-sectionTitle">Main Actors</h2>
            <ul>
              {mainActors?.map((actor) => (
                <li key={actor.id}>
                  <img
                    src={`${imgUrl}${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <span>{actor.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};
