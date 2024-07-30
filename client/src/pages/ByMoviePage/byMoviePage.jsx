// byMoviePage.jsx
import React, { useEffect, useState } from "react";
import "./byMoviePage.css";
import { byMovieData } from "../../dictionaries/byMovieData";
import { fetchByMovieDetails } from "../../services/services";
import { ScrollGallery } from "../../components/ScrollGallery/scrollGallery";

export const ByMoviePage = ({ movieId = 280180 }) => {
  // const [byMovieDetails, setByMovieDetails] = useState(null);
  const byMovieDetails = byMovieData;

  // Construct URLs
  const videoUrl = `https://www.youtube.com/embed/`;
  const imgUrl = "https://image.tmdb.org/t/p/original";
  // const byMovieDetails = byMovieData;

  // Filtered trailer video
  const trailerVideo = byMovieDetails?.videos.results.find(
    (video) => video.type === "Trailer"
  );

  // Filtered main actors (those with lowest order values, up to 5)
  const mainActors = byMovieDetails?.credits.cast
    .sort((a, b) => a.order - b.order)
    .slice(0, 5);

  // Filtered directors (those with job "Director")
  const directors = byMovieDetails?.credits.crew.filter(
    (crew) => crew.job === "Director"
  );

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const byMovieDetailsData = await fetchByMovieDetails(movieId);
  //     setByMovieDetails(byMovieDetailsData);
  //   };

  //   fetchMovies();
  // }, [movieId]);

  return (
    <>
      <header>
        <div className="byMoviePage-header-container">
          <div className="byMoviePage-background">
            <img
              src={`${imgUrl}${byMovieDetails?.backdrop_path}`}
              alt={"Movie backdrop"}
            />
          </div>
          <div className="byMoviePage-gradient-overlay"></div>
          <div className="byMoviePage-details-box">
            <img
              src={`${imgUrl}${byMovieDetails?.images.logos[0].file_path}`}
              alt="Movie Logo"
              style={{
                width: "200px",
                height: "auto",
                display: "block",
                marginBottom: "10px",
              }}
            />
            <h1 className="byMoviePage-title">{byMovieDetails?.title}</h1>
            <div className="byMoviePage-gunner">Gunner</div>
            <div className="byMoviePage-info">
              {byMovieDetails?.release_date.split("-")[0]} | Viewing
              classification: +16 | {Math.floor(byMovieDetails?.runtime / 60)}h{" "}
              {byMovieDetails?.runtime % 60}m
            </div>
            <div className="byMoviePage-description">
              {byMovieDetails?.overview}
            </div>
            <div>
              <strong>Starring:</strong>{" "}
              {mainActors?.map((actor) => actor.name).join(", ")}
            </div>
          </div>
        </div>
      </header>

      <main className="byMoviePage-main">
        <div className="byMoviePage-trailer">
          <h2 className="byMoviePage-sectionTitle">Watch the Trailer</h2>
          {videoUrl && (
            <iframe
              src={`${videoUrl}${trailerVideo?.key}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div className="byMoviePage-photoGallery">
          <h2 className="byMoviePage-sectionTitle">Photo Gallery</h2>
          <div className="byMoviePage-scroll">
            <ScrollGallery images={byMovieDetails?.images.backdrops} />
          </div>
        </div>

        <div className="byMoviePage-credits">
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
        </div>
      </main>
    </>
  );
};
