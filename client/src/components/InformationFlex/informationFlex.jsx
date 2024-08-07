// informationFlex.jsx
import React from "react";
import { Credits } from "../Credits/credits";
import { SimilarMovies } from "../SimilarMovies/similarMovies";
import "./informationFlex.css";

export const InformationFlex = ({ _movie }) => {
  return (
    <div className="flex-container">
      <section className="sub-container" id="credits">
        <Credits movie={_movie} />
      </section>
      <section className="sub-container" id="similar Movies">
        <SimilarMovies />
      </section>
    </div>
  );
};
