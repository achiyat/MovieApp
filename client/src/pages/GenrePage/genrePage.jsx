//client/src/pages/GenrePage/genrePage.jsx
import React, { useEffect, useState } from "react";
import {
  fetchMoviesByGenres,
  fetchMoviesGenrePage,
} from "../../services/services";
import "./genrePage.css";
import { Link, useParams } from "react-router-dom";
import { HeaderCarousel } from "../../components";
import { renderStars } from "../../Utils/movieUtils";
import { genresDict } from "../../dictionaries/genresDict";

export const GenrePage = (props) => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [headerMovies, setHeaderMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getMovies = async () => {
      const genreMoviesData = await fetchMoviesByGenres(genreId);
      setHeaderMovies(genreMoviesData);

      const genrePageData = await fetchMoviesGenrePage(genreId, currentPage);
      setMovies(genrePageData?.results);
      setTotalPages(genrePageData?.total_pages);
    };

    getMovies();
  }, [genreId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5;
    const halfRange = Math.floor(maxPagesToShow / 2);
    const startPage = Math.max(currentPage - halfRange, 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    // Previous Button and Starting Ellipsis
    if (startPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - maxPagesToShow)}
        >
          &laquo;
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis">...</span>);
      }
    }

    // Numbered Page Buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    // Ending Ellipsis and Next Button
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis">...</span>);
      }
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + maxPagesToShow)}
        >
          &raquo;
        </button>
      );
    }

    return pages;
  };

  return (
    <section id="genre page">
      <header className="genrePage-header">
        <HeaderCarousel movies={headerMovies} />
      </header>
      <main className="genrePage-main">
        <h1 className="genrePage-title-page">{genresDict[genreId]} Movies</h1>
        <div className="genrePage-grid">
          {movies?.map((movie) => (
            <div key={movie?.id} className="genrePage-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title}
                className="genrePage-poster"
              />
              <div className="genrePage-info">
                <h2 className="genrePage-title">
                  {movie?.title} ({new Date(movie?.release_date).getFullYear()})
                </h2>
                <p className="genrePage-overview">
                  {movie?.overview?.length > 150
                    ? `${movie?.overview.slice(0, 150)}...`
                    : movie?.overview}
                </p>
                <div className="genrePage-rating">
                  {renderStars(movie?.vote_average, "genrePage-star")}
                </div>
                <Link to={`/movie/${movie?.id}`}>
                  <button className="genrePage-trailer">Watch Trailer</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="genrePage-pagination">{renderPageNumbers()}</div>
      </main>
    </section>
  );
};
