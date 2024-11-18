// client/src/components/SimilarMovies/similarMovies.jsx
import React, { useEffect, useState } from "react";
import "./similarMovies.css";
import { imgUrl, sortedMovies } from "../../Utils/movieUtils";
import {
  fetchMovieRecommendations,
  fetchSimilarMovies,
} from "../../services/services";
import { Link, useParams } from "react-router-dom";

export const SimilarMovies = (props) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const { movieId } = useParams();

  const fetchMovies = async () => {
    const similarMoviesData = (await fetchSimilarMovies(movieId)) || [];
    const sortedSimilarMovies = sortedMovies(similarMoviesData) || [];
    setSimilarMovies(sortedSimilarMovies);

    if (similarMoviesData?.length === 0) {
      const recsMoviesData = (await fetchMovieRecommendations(movieId)) || [];
      const sortedRecsMovies = sortedMovies(recsMoviesData) || [];
      setSimilarMovies(sortedRecsMovies);
    }
  };

  useEffect(() => {
    if (movieId) fetchMovies();
  }, [movieId]);

  return (
    <div>
      <h2 className="sectionTitle">Similar Movies</h2>
      <div className="similarMovie-grid">
        {similarMovies?.map((movie) => (
          <Link to={`/movie/${movie?.id}`} key={movie?.id}>
            <img
              src={`${imgUrl}${movie?.poster_path}`}
              alt={movie?.title}
              className="similarMovie-img"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
