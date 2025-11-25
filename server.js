import express from "express";
import fetch from "node-fetch";

const app = express();

const GROUP_ID = 39760212;
const TOKEN = process.env.VK_TOKEN; // <- сюда Render подставит твой токен
const API_URL = "https://api.vk.com/method/wall.get";
const API_VERSION = "5.199";

app.get("/api/posts", async (req, res) => {
  try {
    const url =
      `${API_URL}?owner_id=-${GROUP_ID}` +
      `&count=10` +
      `&access_token=${TOKEN}` +
      `&v=${API_VERSION}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.error_msg });
    }

    const items = data.response.items.map(post => ({
      id: post.id,
      text: post.text,
      date: post.date,
      link: `https://vk.com/wall-${GROUP_ID}_${post.id}`,
      images: post.attachments
        ?.filter(a => a.type === "photo")
        .map(a => a.photo.sizes.pop().url) || []
    }));

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// тестовая страница
app.get("/", (req, res) => {
  res.send("VK API server is running. Use /api/posts");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server started on port", port));
