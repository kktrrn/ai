import { connectToDatabase } from "@/app/mongodb"; // Подключение к базе данных
import Dream from "@/app/models/Dream.js"; // Модель для работы с коллекцией "dreams"

export async function GET() {
  try {
    await connectToDatabase(); // Подключаемся к базе данных
    const dreams = await Dream.find({}); // Получаем все сны из базы данных
    return new Response(JSON.stringify(dreams), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch dreams" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
