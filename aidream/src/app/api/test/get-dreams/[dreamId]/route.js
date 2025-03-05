import Dream from "../../../../models/Dream"; // Путь к модели Dream
import { connectToDatabase } from "../../../../mongodb"; // Путь к функции подключения
import mongoose from "mongoose"; // Импортируем mongoose для работы с ObjectId

export async function GET(request, context) {
  const params = context.params; // Получаем параметры из маршрута
  console.log("Received params:", params);

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

    // Пытаемся найти сон по ID
    const dream = await Dream.findById(dreamId);

    // Если не нашли сон
    if (!dream) {
      return new Response(JSON.stringify({ message: "Dream not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Если нашли сон, возвращаем его
    return new Response(JSON.stringify(dream), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching dream:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
