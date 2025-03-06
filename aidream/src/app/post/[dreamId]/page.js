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
  const [isEditing, setIsEditing] = useState(false); // Состояние для режима редактирования
  const [newText, setNewText] = useState(""); // Состояние для нового текста

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
        setNewText(data.text); // Заполняем состояние новым текстом
      } catch (error) {
        console.error("Error fetching dream:", error);
        setError(error.message); // Устанавливаем ошибку
      } finally {
        setLoading(false);
      }
    };

    fetchDream();
  }, [dreamId]); // Запрос при изменении dreamId

  // Обработчик для кнопки редактирования
  const handleEdit = async () => {
    if (newText !== dream.text) {
      try {
        const response = await fetch(`/api/test/update-dreams/${dreamId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newText }),
        });

        if (response.ok) {
          alert("Dream updated successfully!");
          setDream((prevDream) => ({ ...prevDream, text: newText }));
        } else {
          throw new Error("Failed to update dream");
        }
      } catch (error) {
        console.error("Error updating dream:", error);
        alert("Error updating dream");
      }
    }
    setIsEditing(false); // Закрываем режим редактирования
  };

  // Обработчик для кнопки отмены редактирования
  const handleCancelEdit = () => {
    setNewText(dream.text); // Восстановить исходный текст
    setIsEditing(false); // Закрыть режим редактирования
  };

  // Обработчик для кнопки удаления
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this dream?")) {
      try {
        const response = await fetch(`/api/test/delete-dreams/${dreamId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Dream deleted successfully!");
          window.location.href = "/experience"; // Перенаправляем на список снов
        } else {
          throw new Error("Failed to delete dream");
        }
      } catch (error) {
        console.error("Error deleting dream:", error);
        alert("Error deleting dream");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 gap-12 sm:p-20 overflow-hidden font-mono">
      {/* Background video */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video autoPlay loop muted className="object-cover w-full h-full">
          <source src="/video/vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Title */}
      <Link href="/experience" passHref>
        <h1 className="z-10 text-4xl sm:text-5xl font-bold text-emerald-950 text-center font-mono drop-shadow-md hover:drop-shadow-xl transition-all duration-300">
          Post Details
        </h1>
      </Link>

      {/* Content */}
      <div className="z-10 mt-6 w-full max-w-lg bg-black bg-opacity-30 p-4 rounded-lg text-white">
        {loading ? (
          <p className="text-center mt-8">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : dream ? (
          <>
            {dream.imageUrl && (
              <div className="flex justify-center mb-4">
                <Image
                  src={dream.imageUrl}
                  alt="Dream image"
                  width={350}
                  height={350}
                  style={{
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </div>
            )}

            {isEditing ? (
              <div>
                <textarea
                  className="w-full h-32 p-2 border border-gray-300 rounded-lg text-white bg-black bg-opacity-30"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                ></textarea>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleEdit}
                    className="px-4 font-mono py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 font-mono py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-mono text-white mb-4">
                  {dream.text}
                </h2>
                <div className="flex justify-between mt-6">
                  <Link
                    href="/experience"
                    className=" text-blue-300 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-yellow text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105"
                  >
                    Back
                  </Link>
                  <button
                    onClick={() => setIsEditing(true)}
                    className=" text-yellow-500 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-yellow text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className=" text-red-500 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-yellow text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <p className="text-center font-mono text-gray-400">Dream not found</p>
        )}
      </div>
    </div>
  );
}
