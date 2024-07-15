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

app.get("/movie/popular", async (req, res) => {
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

app.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos,images",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching movie details for id ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

app.get("/movie/:id/similar", async (req, res) => {
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

app.get("/discover/movie", async (req, res) => {
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

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
