"use client"; // Убедитесь, что компонент работает на клиенте

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Компонент будет рендериться только на клиенте
export default function Post({ params }) {
  const [dreamId, setDreamId] = useState(null); // Храним ID сновидения
  const [dream, setDream] = useState(null); // Храним данные поста
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [image, setImage] = useState(null); // Для хранения сгенерированной картинки

  useEffect(() => {
    // Параметры маршрута теперь Promise, поэтому они должны быть обработаны с использованием use
    if (params && params.dreamId) {
      setDreamId(params.dreamId); // Устанавливаем значение ID поста
    }
  }, [params]); // Этот хук зависит от изменения параметров

  // Функция для запроса поста с сервера
  const fetchDream = async () => {
    try {
      const response = await fetch(`/api/test/get-dream/${dreamId}`);
      const data = await response.json();
      if (response.ok) {
        setDream(data); // Сохраняем полученные данные
      }
    } catch (error) {
      console.error("Error fetching dream:", error);
    } finally {
      setLoading(false);
    }
  };

  // Генерация картинки
  const generateImage = async () => {
    if (!dream) return;

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: dream.text }), // Отправляем описание сна
      });
      const data = await response.json();
      if (response.ok) {
        setImage(data.imageUrl); // Сохраняем сгенерированное изображение
      } else {
        console.error("Failed to generate image:", data);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  useEffect(() => {
    if (dreamId) {
      fetchDream(); // Запрашиваем данные поста, если dreamId доступен
    }
  }, [dreamId]); // Этот хук зависит от изменения dreamId

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      {loading ? (
        <p className="text-center mt-8">Loading...</p>
      ) : dream ? (
        <div className="z-10 mt-6 w-full max-w-lg bg-black bg-opacity-30 p-4 rounded-lg">
          <h2 className="text-2xl font-mono text-white mb-4">{dream.text}</h2>

          <button
            onClick={generateImage}
            className="text-white bg-blue-500 p-2 rounded-lg mt-4"
          >
            Generate Image for Dream
          </button>

          {image && (
            <div className="mt-6">
              <img
                src={image}
                alt="Generated Dream Image"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
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
