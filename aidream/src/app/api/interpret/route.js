// src/app/api/interpret/route.js

import { OpenAI } from "openai"; // Подключаем библиотеку OpenAI

// Создаем экземпляр клиента OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ваш API ключ
});

export async function POST(req) {
  try {
    const { dream } = await req.json(); // Получаем текст сновидения

    // Отправляем запрос в OpenAI API для интерпретации
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Модель для интерпретации
      messages: [
        { role: "system", content: "You are a dream interpreter." },
        { role: "user", content: dream },
      ],
      max_tokens: 150, // Максимальное количество токенов
    });

    // Возвращаем результат клиенту
    return new Response(
      JSON.stringify({ result: response.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to interpret the dream:", error);
    return new Response(
      JSON.stringify({ error: "Failed to interpret the dream." }),
      { status: 500 }
    );
  }
}
