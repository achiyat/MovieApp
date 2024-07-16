// routerComponent.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/homePage";
import { MoviePage } from "../../pages/MoviePage/moviePage";
import { CategoryPage } from "../../pages/CategoryPage/categoryPage";

export const RouterComponent = () => {
  return (
    <div className="router-component">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};
