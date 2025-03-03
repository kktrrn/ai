import "dotenv/config"; // Загружаем переменные из .env
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Импортируем node-fetch для запросов к OpenAI

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json()); // Позволяет принимать JSON в запросах

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res
      .status(400)
      .json({ error: "Запрос должен содержать текст сна." });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Используем gpt-3.5-turbo, так как gpt-4 требует платной подписки
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера при запросе к OpenAI" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`)
);
