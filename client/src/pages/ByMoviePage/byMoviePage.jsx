// byMoviePage.jsx
import React, { useEffect, useState } from "react";
import "./byMoviePage.css";
import { fetchByMovieDetails } from "../../services/services";
import { useParams } from "react-router-dom";
import { getTrailer, videoUrl } from "../../Utils/movieUtils";
import {
  FeedbackFlex,
  InfoMovie,
  InformationFlex,
  ScrollGallery,
} from "../../components";

export const ByMoviePage = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const trailer = getTrailer(movieInfo);
  // console.log(movieInfo);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieInfoData = await fetchByMovieDetails(movieId);
      setMovieInfo(movieInfoData);
    };

    if (movieId) {
      fetchMovies();
    }
  }, [movieId]);

  return (
    <>
      <header>
        <InfoMovie movie={movieInfo} />
      </header>

      <main className="byMoviePage-main">
        <section className="byMoviePage-trailer" id="trailer">
          <h2 className="sectionTitle">Watch the Trailer</h2>
          {trailer && (
            <iframe
              title="Movie Trailer"
              src={`${videoUrl}${trailer?.key}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </section>

        <section className="byMoviePage-photoGallery" id="gallery">
          <h2 className="sectionTitle">Photo Gallery</h2>
          <div className="byMoviePage-scroll">
            <ScrollGallery images={movieInfo?.images.backdrops} />
          </div>
        </section>

        <section id="flex-area">
          <InformationFlex _movie={movieInfo} />
          <FeedbackFlex />
        </section>
      </main>
    </>
  );
};
