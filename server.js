// server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/nutrition", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
      headers: { "X-Api-Key": API_KEY },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch nutrition data" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
