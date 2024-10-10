// client\src\services.js
import axios from "axios";
import {
  handleAxiosError,
  handleResponse,
  responseMessages,
} from "../Utils/axiosMessage";

const BASE_URL = "http://localhost:10000";

export const fetchNowPlayingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/now-playing`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchSimilarMovies = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/similar-movie/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchMoviesByGenres = async (genres) => {
  try {
    const response = await axios.get(`${BASE_URL}/movies-by-genres`, {
      params: { genres },
    });
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchByMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/by-movie-details/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie-reviews/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchMovieRecommendations = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie-recommendations/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const fetchMoviesGenrePage = async (id, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie-genre-page/${id}/${page}`
    );
    const message =
      responseMessages[response.status] ||
      `Unexpected status: ${response.status}`;
    console.log(`${message}. Status: ${response.status}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Fetch search results for movies
export const fetchSearchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(`${BASE_URL}/search-movies`, {
      params: { query: searchTerm },
    });
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
  }
};
