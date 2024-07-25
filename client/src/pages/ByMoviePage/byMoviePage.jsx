import React, { useEffect, useState } from "react";
import "./byMoviePage.css";
import { byMovieData } from "../../dictionaries/byMovieData";
import { fetchByMovieDetails } from "../../services/services";

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
        <div className="header-container">
          <div className="background-image">
            <img
              src={`${imgUrl}${byMovieDetails?.backdrop_path}`}
              alt={"Movie backdrop"}
            />
          </div>
          <div className="details-box">
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
            <h1 className="movieTitle">{byMovieDetails?.title}</h1>
            <div className="gunnerBubble">Gunner</div>
            <div className="movieInfo">
              {byMovieDetails?.release_date.split("-")[0]} | Viewing
              classification: +16 | {Math.floor(byMovieDetails?.runtime / 60)}h{" "}
              {byMovieDetails?.runtime % 60}m
            </div>
            <div className="movieDescription">{byMovieDetails?.overview}</div>
            <div className="mainActors">
              <strong>Starring:</strong>{" "}
              {mainActors?.map((actor) => actor.name).join(", ")}
            </div>
          </div>
          <div className="gradient-overlay"></div>
        </div>
      </header>

      <main className="mainContent">
        <div className="trailerContainer">
          <h2 className="sectionTitle">Watch the Trailer</h2>
          {videoUrl && (
            <iframe
              src={`${videoUrl}${trailerVideo?.key}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="photoGallery">
          <h2 className="sectionTitle">Photo Gallery</h2>
          <button className="arrow left-arrow">&lt;</button>
          {byMovieDetails?.images.backdrops.map((image, index) => (
            <img
              key={index}
              src={`${imgUrl}${image.file_path}`}
              alt={`Backdrop ${index + 1}`}
            />
          ))}
          <button className="arrow right-arrow">&gt;</button>
        </div>
        <div className="credits">
          <div className="directorsList">
            <h2 className="sectionTitle">Directors</h2>
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
          <div className="actorsList">
            <h2 className="sectionTitle">Main Actors</h2>
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
