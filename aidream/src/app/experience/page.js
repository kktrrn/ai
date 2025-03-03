"use client"; // Для использования хуков в Next.js

import { useEffect, useState } from "react"; // Для работы с состоянием и эффектами
import Link from "next/link"; // Импортируем Link для перенаправления
import Image from "next/image";

export default function Experience() {
  const [dreams, setDreams] = useState([]); // Храним сны, полученные с сервера
  const [loading, setLoading] = useState(true); // Состояние загрузки

  // Функция для запроса всех снов с сервера
  const fetchDreams = async () => {
    try {
      const response = await fetch("/api/test/get-dreams"); // Запрашиваем сны с сервера
      const data = await response.json();
      if (response.ok) {
        // Обновляем состояние снов и обрезаем до первых 5 постов
        setDreams(data.slice(0, 5));
      } else {
        console.error("Failed to fetch dreams:", data);
      }
    } catch (error) {
      console.error("Error fetching dreams:", error);
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  // Запрашиваем сны при монтировании компонента
  useEffect(() => {
    fetchDreams();
  }, []);

  // Функция для получения первых нескольких слов из текста
  const getFirstWords = (text, wordLimit = 10) => {
    return (
      text.split(" ").slice(0, wordLimit).join(" ") +
      (text.split(" ").length > wordLimit ? "..." : "")
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 gap-12 sm:p-20 overflow-hidden">
      {/* Картинка как фон */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src="/images/pic.jpeg"
          alt="Dreamy background"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
      </div>

      <h2 className="z-10 text-4xl sm:text-5xl font-bold text-emerald-950 text-center font-mono drop-shadow-md hover:drop-shadow-xl transition-all duration-300">
        Dream Experiences
      </h2>

      {/* Состояние загрузки */}
      {loading ? (
        <p className="text-center mt-8">Loading...</p>
      ) : (
        <div className="z-10 mt-6 w-full max-w-lg bg-black bg-opacity-30 p-4 rounded-lg">
          {/* Если сны есть, выводим их */}
          {dreams.length > 0 ? (
            <ul className="space-y-4">
              {dreams.map((dream) => (
                <li
                  key={dream._id}
                  className="text-lg font-mono text-white mb-4 border-b border-gray-400 pb-4"
                >
                  {/* Дата и первые несколько слов */}
                  <p className="italic text-gray-300">
                    {new Date(dream.createdAt).toLocaleDateString()} -{" "}
                    {getFirstWords(dream.text)}
                  </p>

                  {/* Ссылка для перехода на отдельную страницу с постом */}
                  <Link
                    href={`/post/${dream._id}`} // Переход на страницу с полным содержимым сна
                    className="text-blue-400 hover:underline"
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">No dreams found</p>
          )}
        </div>
      )}

      {/* Кнопка для добавления нового поста */}
      <div className="z-10 mt-12 flex justify-center gap-6">
        <Link
          href="/diary" // Перенаправляем на страницу diary
          className="opacity-75 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105"
        >
          Add New Dream
        </Link>
      </div>
    </div>
  );
}
