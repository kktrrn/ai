import { connectToDatabase } from "@/app/mongodb"; // Подключение к базе данных
import Dream from "@/app/models/Dream.js"; // Модель для работы с коллекцией "dreams"

export async function POST(req) {
  try {
    const { text, imageUrl } = await req.json(); // Получаем данные из тела запроса

    await connectToDatabase(); // Подключаемся к базе данных

    // Создаем новый объект сновидения
    const newDream = new Dream({
      text,
      imageUrl: imageUrl || "", // Если изображения нет, сохраняем пустую строку
      createdAt: new Date(),
    });

    await newDream.save(); // Сохраняем сновидение в базе данных

    return new Response(
      JSON.stringify({ message: "Dream saved successfully!" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
