import { OpenAI } from "openai"; // Используем библиотеку OpenAI
import { config } from "@/app/config"; // Для получения API ключа

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY, // Убедитесь, что у вас есть правильный API ключ OpenAI
});

export async function POST(req) {
  try {
    const { prompt } = await req.json(); // Получаем описание сна из запроса

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing prompt" }), {
        status: 400,
      });
    }

    // Отправляем запрос в OpenAI для генерации изображения
    const response = await openai.createImage({
      prompt,
      n: 1, // Количество изображений
      size: "1024x1024", // Размер изображения
    });

    const imageUrl = response.data[0].url; // Получаем URL сгенерированного изображения

    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response(JSON.stringify({ error: "Failed to generate image" }), {
      status: 500,
    });
  }
}
