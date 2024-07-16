// client\src\services.js
import axios from "axios";
import { handleAxiosError, handleResponse } from "../Utils/axiosMessage";

const BASE_URL = "http://localhost:5000";

export const fetchNowPlayingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch popular movies");
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch popular movies");
  }
};

export const fetchSimilarMovies = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/similar`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch similar movies");
  }
};

export const fetchMoviesByGenres = async (genres) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: { genres },
    });
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch movies by genres");
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch movie details");
  }
};
