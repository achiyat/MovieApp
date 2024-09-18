// client/src/pages/HomePage/homePage.jsx
import React, { useEffect, useState } from "react";
import {
  fetchMoviesByGenres,
  fetchNowPlayingMovies,
} from "../../services/services";
import "./homePage.css";
import { HeaderCarousel, ScrollGallery } from "../../components";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});

  const genres = {
    12: "Adventure",
    14: "Fantasy",
    16: "Animation",
    18: "Drama",
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
            <div className="homePage-genreHeader">
              <h2>{genres[genreId]} Movies</h2>
              <Link to={`/genre/${genreId}`}>
                <span className="homePage-showMore">Show more</span>
              </Link>
            </div>
            <div className="homePage-scroll">
              <ScrollGallery movies={genreMovies[genreId]} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
