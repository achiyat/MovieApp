// HomePage.jsx
import React, { useEffect, useState } from "react";
import {
  fetchMoviesByGenres,
  fetchNowPlayingMovies,
} from "../../services/services";
import "./homePage.css";
import { HeaderCarousel } from "../../components/HeaderCarousel/headerCarousel";
import { MainCarousel } from "../../components/MainCarousel/mainCarousel";

export const HomePage = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});

  const genres = {
    28: "Action",
    35: "Comedy",
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const nowPlayingMoviesData = await fetchNowPlayingMovies();
      setNowPlayingMovies(nowPlayingMoviesData);

      const genreDataPromises = Object.keys(genres).map(async (genreId) => {
        const movies = await fetchMoviesByGenres(genreId);
        return { [genreId]: movies };
      });

      const genreData = await Promise.all(genreDataPromises);
      const genreMoviesData = Object.assign({}, ...genreData);
      setGenreMovies(genreMoviesData);
    };

    fetchMovies();
  }, []);

  return (
    <div className="home-page">
      <header className="home-page-header">
        <HeaderCarousel movies={nowPlayingMovies} />
      </header>
      <main className="home-page-main">
        {Object.keys(genreMovies).map((genreId) => (
          <div key={genreId}>
            <h2>{genres[genreId]} Movies</h2>
            <MainCarousel movies={genreMovies[genreId]} />
          </div>
        ))}
      </main>
    </div>
  );
};
