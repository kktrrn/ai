"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Для получения параметров маршрута
import Link from "next/link";
import Image from "next/image";

export default function Post() {
  const { dreamId } = useParams(); // Извлекаем dreamId из URL
  const [dream, setDream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Состояние для ошибки

  useEffect(() => {
    const fetchDream = async () => {
      if (!dreamId) return;

      try {
        const response = await fetch(`/api/test/get-dreams/${dreamId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Если ответ не успешный
        }

        // Проверка, является ли тело ответа JSON
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON response");
        }

        const data = await response.json();
        setDream(data); // Сохраняем данные о сне
      } catch (error) {
        console.error("Error fetching dream:", error);
        setError(error.message); // Устанавливаем ошибку
      } finally {
        setLoading(false);
      }
    };

    fetchDream();
  }, [dreamId]); // Запрос при изменении dreamId

  // Обработчики для кнопок (редактирование и удаление)
  const handleEdit = () => {
    // Перенаправление на страницу редактирования
    console.log("Editing dream", dreamId);
    // Например, перенаправление на /edit-dream/<dreamId>
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this dream?")) {
      try {
        const response = await fetch(`/api/test/delete-dream/${dreamId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Dream deleted successfully!");
          // Перенаправление на страницу списка снов
          window.location.href = "/experience";
        } else {
          throw new Error("Failed to delete the dream");
        }
      } catch (error) {
        console.error("Error deleting dream:", error);
        alert("Error deleting dream");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 gap-12 sm:p-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src="/images/pic.jpeg"
          alt="Dreamy background"
          fill
          className="background-image"
        />
      </div>

      {/* Title */}
      <h1 className="z-10 text-4xl sm:text-5xl font-bold text-emerald-950 text-center font-mono drop-shadow-md hover:drop-shadow-xl transition-all duration-300">
        Post Details
      </h1>

      {/* Content */}
      <div className="z-10 mt-6 w-full max-w-lg bg-black bg-opacity-30 p-4 rounded-lg text-white">
        {loading ? (
          <p className="text-center mt-8">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p> // Отображаем ошибку
        ) : dream ? (
          <>
            <h2 className="text-2xl font-mono text-white mb-4">{dream.text}</h2>

            {/* Кнопки для редактирования и удаления */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleEdit}
                className="z-10 font-mono text-yellow-400 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="z-10 font-mono text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <p className="text-center font-mono text-gray-400">Dream not found</p>
        )}
      </div>

      <Link
        href="/experience"
        className="z-10 mt-6 text-blue-500 hover:underline"
      >
        Back to Dreams List
      </Link>
    </div>
  );
}
