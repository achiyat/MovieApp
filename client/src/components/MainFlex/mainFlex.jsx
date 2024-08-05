// mainFlex.jsx
import React from "react";
import { Credits } from "../Credits/credits";
import { SimilarMovies } from "../SimilarMovies/similarMovies";
import "./mainFlex.css";

export const MainFlex = ({ _movie, _similar }) => {
  return (
    <div className="mainFlex-container">
      <section className="credits-container" id="credits">
        <Credits movie={_movie} />
      </section>
      <section className="similar-container" id="similar Movies">
        <SimilarMovies similar={_similar} />
      </section>
    </div>
  );
};
