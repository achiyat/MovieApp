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
    console.log("storeInLocalStorage");
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        console.error("LocalStorage quota exceeded, falling back to API call.");
        // Optionally, you can clear localStorage or limit data size here
      } else {
        console.error("Error storing data in localStorage", error);
      }
    }
  };

  // Usage in your fetchMovies function:
  const fetchMovies = async () => {
    const fetchedNowPlayingMovies = await fetchNowPlayingMovies();
    setNowPlayingMovies(fetchedNowPlayingMovies || []);

    // Check if the nowPlayingMovies data is in localStorage
    const nowPlayingMoviesData = JSON.parse(
      localStorage.getItem("nowPlayingMovies")
    );

    if (nowPlayingMoviesData) {
      setNowPlayingMovies(nowPlayingMoviesData);
      console.log("localStorage nowPlaying");
    } else {
      const fetchedNowPlayingMovies = await fetchNowPlayingMovies();
      setNowPlayingMovies(fetchedNowPlayingMovies || []);

      // Try storing in localStorage with error handling
      if (fetchedNowPlayingMovies?.length > 0) {
        console.log("'nowPlaying' go to store");
        storeInLocalStorage("nowPlayingMovies", fetchedNowPlayingMovies);
      }

      if (!fetchedNowPlayingMovies) {
        console.log("nowPlayingMovies none");
      }
    }

    // Check if the genre movies data is in localStorage
    const genreMoviesData = JSON.parse(localStorage.getItem("genreMovies"));
    console.log(genreMoviesData);

    if (genreMoviesData) {
      setGenreMovies(genreMoviesData);
      console.log("localStorage genre");
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

      console.log(hasNonEmptyGenres(genreMoviesDataFetched));

      if (hasNonEmptyGenres(genreMoviesDataFetched)) {
        const genreMovies = getNonEmptyGenres(genreMoviesDataFetched);
        console.log("'genre' go to store");
        storeInLocalStorage("genreMovies", genreMovies);
      } else {
        console.log("genreMovies none");
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
