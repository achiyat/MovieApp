// similarMovies.jsx
import React, { useEffect, useState } from "react";
import "./similarMovies.css";
import { imgUrl } from "../../Utils/movieUtils";
import {
  fetchMovieRecommendations,
  fetchSimilarMovies,
} from "../../services/services";
import { useParams } from "react-router-dom";

export const SimilarMovies = (props) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      const similarMoviesData = await fetchSimilarMovies(movieId);
      const sortedSimilarMovies = similarMoviesData
        ?.sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 4);
      setSimilarMovies(sortedSimilarMovies);

      if (similarMoviesData.length === 0) {
        const recsMoviesData = await fetchMovieRecommendations(movieId);
        const sortedRecsMovies = recsMoviesData
          ?.sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, 4);
        setSimilarMovies(sortedRecsMovies);
      }
    };

    if (movieId) {
      fetchMovies();
    }
  }, [movieId]);

  return (
    <div>
      <h2 className="sectionTitle">Similar Movies</h2>
      <div className="similarMovie-grid">
        {similarMovies?.map((movie) => (
          <img
            key={movie.id}
            src={`${imgUrl}${movie.poster_path}`}
            alt={movie.title}
            className="similarMovie-img"
          />
        ))}
      </div>
    </div>
  );
};
