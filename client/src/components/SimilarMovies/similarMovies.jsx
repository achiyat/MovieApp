// similarMovies.jsx
import React from "react";
import "./similarMovies.css";
import { imgUrl } from "../../Utils/movieUtils";

export const SimilarMovies = ({ similar }) => {
  return similar?.[0] ? (
    <div>
      <h2 className="sectionTitle">Similar Movies</h2>
      <div className="similarMovie-grid">
        {similar.map((movie) => (
          <img
            key={movie.id}
            src={`${imgUrl}${movie.poster_path}`}
            alt={movie.title}
            className="similarMovie-img"
          />
        ))}
      </div>
    </div>
  ) : null;
};
