// server/index.js
import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

import path from "path";
import { fileURLToPath } from "node:url";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const clientPath = fileURLToPath(new URL("../client", import.meta.url));

app.use(express.static(clientPath));

const requireApiKey = (req, res, next) => {
  if (!API_KEY) {
    console.log("Error: API key is missing or undefined");
    return res.status(460).json({ error: "API key is missing or undefined" });
  }
  next();
};

app.get("/similar-movie/:id", requireApiKey, async (req, res) => {
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

app.get("/movies-by-genres", requireApiKey, async (req, res) => {
  const { genre } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genre,
        sort_by: "popularity.desc",
      },
    });
    res.json(response.data);
  } catch (error) {
    if (!API_KEY) {
      res.status(400).json({ error: "API key is missing or undefined" });
    } else {
      console.error(`Error fetching movies by genre ${genre}:`, error);
      res.status(500).json({ error: "Failed to fetch movies by genre" });
    }
  }
});

app.get("/now-playing", requireApiKey, async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        sort_by: "popularity.desc",
        page: 1,
        pageSize: 20,
      },
    });
    res.json(response.data);
  } catch (error) {
    if (!API_KEY) {
      res.status(400).json({ error: "API key is missing or undefined" });
    } else {
      console.error("Error fetching now playing movies:", error);
      res.status(500).json({ error: "Failed to fetch now playing movies" });
    }
  }
});

app.get("/by-movie-details/:id", requireApiKey, async (req, res) => {
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

app.get("/movie-reviews/:id", requireApiKey, async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
      params: {
        api_key: API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching reviews movie:`, error);
    res.status(500).json({ error: `Failed to fetch reviews movie` });
  }
});

app.get("/movie-recommendations/:id", requireApiKey, async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/recommendations`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (e) {
    console.error(`Error fetching recommendations for movie ID ${movieId}:`, e);
    res.status(500).json({
      e: `Failed to fetch recommendations for movie ID ${movieId}`,
    });
  }
});

app.get("/movie-genre-page/:id/:page", requireApiKey, async (req, res) => {
  const genreId = req.params.id;
  const page = req.params.page;

  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        language: "en-US",
        sort_by: "popularity.desc",
        include_adult: false,
        page: page,
      },
    });

    res.json(response.data);
  } catch (e) {
    console.error("Error fetching movies from TMDB:", e);
    res.status(500).json({ e: "Failed to fetch movies" });
  }
});

app.get("/search-movies", requireApiKey, async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        language: "en-US",
        page: 1,
        pageSize: 10,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error searching for movies:", error);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

app.get("*", function (req, res) {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
