// homePage.jsx
import React, { useEffect, useState } from "react";
import {
  fetchMoviesByGenres,
  fetchNowPlayingMovies,
} from "../../services/services";
import "./homePage.css";
import { HeaderCarousel } from "../../components/HeaderCarousel/headerCarousel";
import { ScrollGallery } from "../../components/ScrollGallery/scrollGallery";

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
    <div className="homePage-container">
      <header className="homePage-header">
        <HeaderCarousel movies={nowPlayingMovies} />
      </header>
      <main className="homePage-main">
        {Object.keys(genreMovies).map((genreId) => (
          <div key={genreId}>
            <h2>{genres[genreId]} Movies</h2>
            <div className="homePage-scroll">
              <ScrollGallery movies={genreMovies[genreId]} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
