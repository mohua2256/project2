const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, "frontend")));

const NEWS_API_KEY = "329e7f148a3f48808d6dff953185ce93" // <-- এখানে তোমার NewsAPI key বসাও

// Fetch news
app.get("/api/news", async (req, res) => {
  try {
    const country = req.query.country || "us";
    const category = req.query.category || "general";

    // 🔹 Free plan compatible: top-headlines ignores from/to
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}`;
    console.log("Fetching URL:", url);

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
