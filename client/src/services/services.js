// client\src\services.js
import axios from "axios";
const BASE_URL = "http://localhost:5000";

export const fetchPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`);
  return response.data.results;
};

export const fetchSimilarMovies = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/similar`);
  return response.data.results;
};

export const fetchMoviesByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: { category },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`);
  return response.data;
};

// export const fetchPopularMovies = async () => {
//   const response = await axios.get(`${BASE_URL}/movie/popular`);
//   const data = await response.json();
//   return data.results;
// };

// export const fetchSimilarMovies = async (id) => {
//   const response = await axios.get(
//     `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
//   );
//   const data = await response.json();
//   return data.results;
// };

// export const fetchMoviesByCategory = async (category) => {
//   const response = await axios.get(`${BASE_URL}/discover/movie?`, category);
//   const data = await response.json();
//   return data.results;
// };

// export const fetchMovieDetails = async (id) => {
//   const response = await axios.get(
//     `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
//   );
//   const data = await response.json();
//   return data;
// };
