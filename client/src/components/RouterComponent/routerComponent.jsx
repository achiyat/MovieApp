// routerComponent.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/homePage";
import { ByMoviePage } from "../../pages/ByMoviePage/byMoviePage";
import { GenrePage } from "../../pages/GenrePage/genrePage";

export const RouterComponent = () => {
  return (
    <div className="router-component">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<ByMoviePage />} />
        <Route path="/genre/:genreId" element={<GenrePage />} />
      </Routes>
    </div>
  );
};
