// src/app/api/test/update-dreams/[dreamId]/route.js

import Dream from "../../../../models/Dream"; // Путь к модели Dream
import { connectToDatabase } from "../../../../mongodb"; // Путь к функции подключения
import mongoose from "mongoose"; // Импортируем mongoose для работы с ObjectId

export async function PUT(request, context) {
  const params = context.params; // Получаем параметры из маршрута
  const { dreamId } = params;

  // Проверяем, что dreamId существует и является корректным ObjectId
  if (!dreamId || !mongoose.Types.ObjectId.isValid(dreamId)) {
    console.error("Invalid Dream ID:", dreamId);
    return new Response(JSON.stringify({ message: "Invalid Dream ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Подключаемся к базе данных
    await connectToDatabase(); // Функция подключения через Mongoose
    console.log("Connected to MongoDB");

    // Получаем новый текст для поста из тела запроса
    const { text } = await request.json();
    if (!text) {
      return new Response(JSON.stringify({ message: "Text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Пытаемся обновить сон
    const updatedDream = await Dream.findByIdAndUpdate(
      dreamId,
      { text },
      { new: true } // Возвращаем обновленный документ
    );

    if (!updatedDream) {
      return new Response(JSON.stringify({ message: "Dream not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updatedDream), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating dream:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
