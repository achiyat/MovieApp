// routerComponent.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/homePage";
import { MoviePage } from "../../pages/MoviePage/moviePage";
import { CategoryPage } from "../../pages/CategoryPage/categoryPage";

export const RouterComponent = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" component={<HomePage />} />
        <Route path="/movie/:id" component={<MoviePage />} />
        <Route path="/category/:name" component={<CategoryPage />} />
      </Routes>
    </div>
  );
};
