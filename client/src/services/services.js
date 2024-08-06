// client\src\services.js
import axios from "axios";
import { handleAxiosError, handleResponse } from "../Utils/axiosMessage";

const BASE_URL = "http://localhost:5000";

export const fetchNowPlayingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/now-playing`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch popular movies");
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/popular-movies`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch popular movies");
  }
};

export const fetchSimilarMovies = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/similar-movie/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch similar movies");
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
    throw new Error("Failed to fetch movies by genres");
  }
};

export const fetchByMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/by-movie-details/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch movie details");
  }
};

export const fetchMovieReviews = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie-reviews/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch movie details");
  }
};
