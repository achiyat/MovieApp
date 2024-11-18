// client\src\services.js
import axios from "axios";
import {
  handleAxiosError,
  handleResponse,
  responseMessages,
} from "../Utils/axiosMessage";

export const fetchNowPlayingMovies = async () => {
  try {
    const response = await axios.get(`now-playing`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchSimilarMovies = async (id) => {
  try {
    const response = await axios.get(`similar-movie/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchMoviesByGenres = async (genre) => {
  try {
    const response = await axios.get(`movies-by-genres`, {
      params: { genre },
    });
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchByMovieDetails = async (id) => {
  try {
    const response = await axios.get(`by-movie-details/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axios.get(`movie-reviews/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchMovieRecommendations = async (id) => {
  try {
    const response = await axios.get(`movie-recommendations/${id}`);
    // console.log(response);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchMoviesGenrePage = async (id, page = 1) => {
  try {
    const response = await axios.get(`movie-genre-page/${id}/${page}`);
    const message =
      responseMessages[response.status] ||
      `Unexpected status: ${response.status}`;
    // console.log(`${message}. Status: ${response.status}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Fetch search results for movies
export const fetchSearchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(`search-movies`, {
      params: { query: searchTerm },
    });
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};
