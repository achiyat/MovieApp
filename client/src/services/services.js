// client\src\services.js
import axios from "axios";
import { handleResponse, handleAxiosError } from "./UtilsAxiosMessage";

const BASE_URL = "http://localhost:5000";

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

export const fetchMoviesByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: { category },
    });
    return handleResponse(response);
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch movies by category");
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
