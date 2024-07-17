// server\Backend\server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

app.get("/popular-movies", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

app.get("/similar-movie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
      params: {
        api_key: API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching similar movies for id ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch similar movies" });
  }
});

app.get("/movies-by-genres", async (req, res) => {
  const { category } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: category,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching movies by category ${category}:`, error);
    res.status(500).json({ error: "Failed to fetch movies by category" });
  }
});

app.get("/now-playing", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
        pageSize: 20,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

app.get("/by-movie-details/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        append_to_response: "videos,images,credits",
        include_image_language: "en,null",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching details movie:`, error);
    res.status(500).json({ error: `Failed to fetch details movie` });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
