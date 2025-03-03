import { connectToDatabase } from "../../../mongodb"; // Подключение к базе данных
import { ObjectId } from "mongodb"; // Для работы с ObjectId

export default async function handler(req, res) {
  const { method } = req; // Метод запроса
  const { dreamId } = req.query; // Получаем dreamId из параметров запроса

  // Подключение к базе данных
  const { db } = await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        // Получение данных о сне по ID
        const dream = await db.collection("dreams").findOne({
          _id: ObjectId(dreamId),
        });

        if (dream) {
          res.status(200).json(dream); // Возвращаем данные о сне
        } else {
          res.status(404).json({ message: "Dream not found" });
        }
      } catch (error) {
        console.error("Error fetching dream:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    case "PUT":
      try {
        // Получаем текст сна из тела запроса
        const { text } = req.body;

        // Проверка на наличие текста
        if (!text || text.trim() === "") {
          return res.status(400).json({ message: "Dream text is required." });
        }

        // Обновление записи в базе данных по ID
        const result = await db.collection("dreams").updateOne(
          { _id: ObjectId(dreamId) }, // Находим сон по ID
          { $set: { text } } // Обновляем текст сна
        );

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Dream updated successfully!" });
        } else {
          res.status(404).json({ message: "Dream not found" });
        }
      } catch (error) {
        console.error("Error updating dream:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    case "DELETE":
      try {
        // Удаление сна по ID
        const result = await db.collection("dreams").deleteOne({
          _id: ObjectId(dreamId),
        });

        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Dream deleted successfully!" });
        } else {
          res.status(404).json({ message: "Dream not found" });
        }
      } catch (error) {
        console.error("Error deleting dream:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    default:
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}
