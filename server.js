import express from "express";
import Parser from "rss-parser";

const app = express();
const parser = new Parser();

// Вставь сюда ID публичной группы ВК
const groupId = "39760212";

// Генерация RSS через RSSHub или сторонний RSS генератор (тут будет рабочий URL)
const rssUrl = `https://rss.stand-in-service.com/vk/group/${groupId}`; // заменим позже на рабочий

app.get("/rss", async (req, res) => {
  try {
    const feed = await parser.parseURL(rssUrl);
    res.json(feed.items || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
