// client/src/pages/HomePage/homePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchMoviesByGenres,
  fetchNowPlayingMovies,
} from "../../services/services";
import { HeaderCarousel, ScrollGallery } from "../../components";
import { genresDict } from "../../dictionaries/genresDict";
import "./homePage.css";

export const HomePage = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});

  const storeInLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        console.error("LocalStorage quota exceeded, falling back to API call.");
      } else {
        console.error("Error storing data in localStorage", error);
      }
    }
  };

  const fetchMovies = async () => {
    const fetchedNowPlayingMovies = await fetchNowPlayingMovies();
    setNowPlayingMovies(fetchedNowPlayingMovies || []);

    const nowPlayingMoviesData = JSON.parse(
      localStorage.getItem("nowPlayingMovies")
    );

    if (nowPlayingMoviesData) {
      setNowPlayingMovies(nowPlayingMoviesData);
    } else {
      const fetchedNowPlayingMovies = await fetchNowPlayingMovies();
      setNowPlayingMovies(fetchedNowPlayingMovies || []);

      if (fetchedNowPlayingMovies?.length > 0) {
        storeInLocalStorage("nowPlayingMovies", fetchedNowPlayingMovies);
      }
    }

    const genreMoviesData = JSON.parse(localStorage.getItem("genreMovies"));

    if (genreMoviesData) {
      setGenreMovies(genreMoviesData);
    } else {
      const genreDataPromises = Object.keys(genresDict)?.map(
        async (genreId) => {
          const movies = await fetchMoviesByGenres(genreId);
          return { [genreId]: movies || [] };
        }
      );

      const genreData = await Promise.all(genreDataPromises);
      const genreMoviesDataFetched = Object.assign({}, ...genreData);
      setGenreMovies(genreMoviesDataFetched);

      const hasNonEmptyGenres = (genreMoviesDataFetched) =>
        Object.values(genreMoviesDataFetched).some(
          (movies) => movies.length > 0
        );

      const getNonEmptyGenres = (genreMoviesDataFetched) =>
        Object.fromEntries(
          Object.entries(genreMoviesDataFetched).filter(
            ([_, movies]) => movies.length > 0
          )
        );

      if (hasNonEmptyGenres(genreMoviesDataFetched)) {
        const genreMovies = getNonEmptyGenres(genreMoviesDataFetched);
        storeInLocalStorage("genreMovies", genreMovies);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovies();
  }, []);

  return (
    <div className="homePage-container">
      <header className="homePage-header">
        <HeaderCarousel movies={nowPlayingMovies} />
      </header>
      <main className="homePage-main">
        {Object.keys(genreMovies)?.map((genreId) => (
          <div key={genreId}>
            <div className="homePage-genreHeader">
              <h2>{genresDict?.[genreId]} Movies</h2>
              <Link to={`/genre/${genreId}`}>
                <span className="homePage-showMore">Show more</span>
              </Link>
            </div>
            <div className="homePage-scroll">
              <ScrollGallery movies={genreMovies?.[genreId]} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};
