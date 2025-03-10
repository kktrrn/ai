import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ваш API ключ
});

export async function POST(req) {
  try {
    const { description } = await req.json();

    // Проверка на пустое описание
    if (!description || description.trim() === "") {
      console.error("Error: Description is empty.");
      return new Response(
        JSON.stringify({
          error: "Description is required to generate an image.",
        }),
        { status: 400 }
      );
    }

    // Логируем описание
    console.log("Received description for image generation:", description);

    // Генерация изображения через OpenAI API
    const response = await openai.images.generate({
      prompt: description, // Описание для изображения
      n: 1, // Ожидаем одно изображение
      size: "512x512", // Размер изображения (можно использовать 1080x1080)
    });

    // Проверка, есть ли в ответе изображение
    if (!response || !response.data || !response.data[0].url) {
      console.error("Error: No image URL returned by OpenAI.");
      return new Response(
        JSON.stringify({ error: "Failed to generate image." }),
        { status: 500 }
      );
    }

    const imageUrl = response.data[0].url;

    return new Response(JSON.stringify({ imageUrl }), { status: 200 });
  } catch (error) {
    console.error("Failed to generate image:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate image." }),
      { status: 500 }
    );
  }
}
