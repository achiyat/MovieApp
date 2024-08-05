// byMoviePage.jsx
import React, { useEffect, useState } from "react";
import "./byMoviePage.css";
import {
  fetchByMovieDetails,
  fetchSimilarMovies,
} from "../../services/services";
import { ScrollGallery } from "../../components/ScrollGallery/scrollGallery";
import { useParams } from "react-router-dom";
import { MainFlex } from "../../components/MainFlex/mainFlex";
import { InfoMovie } from "../../components/InfoMovie/infoMovie";
import { getTrailer, videoUrl } from "../../Utils/movieUtils";

export const ByMoviePage = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  const trailer = getTrailer(movieInfo);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieInfoData = await fetchByMovieDetails(movieId);
      console.log(movieInfoData);
      setMovieInfo(movieInfoData);

      const similarMoviesData = await fetchSimilarMovies(movieId);
      const sortedSimilarMovies = similarMoviesData
        ?.sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 4);
      setSimilarMovies(sortedSimilarMovies);
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
          <h2 className="byMoviePage-sectionTitle">Watch the Trailer</h2>
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
          <h2 className="byMoviePage-sectionTitle">Photo Gallery</h2>
          <div className="byMoviePage-scroll">
            <ScrollGallery images={movieInfo?.images.backdrops} />
          </div>
        </section>

        <section id="credits&similar-movies">
          <MainFlex _movie={movieInfo} _similar={similarMovies} />
        </section>
      </main>
    </>
  );
};
