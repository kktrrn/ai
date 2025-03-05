"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Для получения параметров маршрута
import Link from "next/link";

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      {loading ? (
        <p className="text-center mt-8">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p> // Отображаем ошибку
      ) : dream ? (
        <div className="z-10 mt-6 w-full max-w-lg bg-black bg-opacity-30 p-4 rounded-lg">
          <h2 className="text-2xl font-mono text-white mb-4">{dream.text}</h2>
        </div>
      ) : (
        <p className="text-center text-gray-400">Dream not found</p>
      )}

      <Link href="/experience" className="mt-6 text-blue-500 hover:underline">
        Back to Dreams List
      </Link>
    </div>
  );
}
