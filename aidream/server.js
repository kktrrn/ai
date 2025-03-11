import "dotenv/config"; // Загрузка переменных окружения
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Для HTTP запросов к OpenAI API

const app = express();
const PORT = 5001;

// CORS конфигурация: Разрешить запросы только с localhost и Vercel
const corsOptions = {
  origin: [
    "http://localhost:3000", // Локальный хост
    "https://ai-git-main-kateryna-yakovlevas-projects.vercel.app",
    "https://ai-chi-eight.vercel.app", // Ваш домен на Vercel
  ],
};
app.use(cors(corsOptions)); // Используем CORS с указанными опциями
app.use(express.json()); // Разрешаем парсинг JSON в теле запроса

// Обработчик POST запроса для /api/interpret
app.post("/api/interpret", async (req, res) => {
  const { prompt } = req.body; // Получаем prompt из тела запроса

  if (!prompt) {
    console.error("No prompt provided");
    return res
      .status(400)
      .json({ error: "The request must contain a dream text." });
  }

  try {
    console.log("OPENAI API Key:", process.env.OPENAI_API_KEY); // Для отладки

    // Запрос к OpenAI API для интерпретации сна
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Используем ключ API из переменных окружения
      },
      body: JSON.stringify({
        model: "gpt-4-mini", // Используем модель gpt-4-mini
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json(); // Парсим ответ от OpenAI

    if (data.error) {
      console.error("OpenAI error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    res.json({ response: data.choices[0].message.content }); // Отправляем ответ клиенту
  } catch (error) {
    console.error("Error fetching from OpenAI:", error);
    res.status(500).json({ error: "Server error while requesting OpenAI" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server started at http://localhost:${PORT}`)
);
