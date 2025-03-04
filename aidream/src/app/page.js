"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [dream, setDream] = useState(""); // Состояние для текста сна
  const [response, setResponse] = useState(""); // Состояние для ответа OpenAI
  const [loading, setLoading] = useState(false); // Состояние загрузки

  // Функция для запроса к OpenAI API
  const getDreamInterpretation = async () => {
    if (!dream.trim()) return; // Если пустой ввод, ничего не делать

    setLoading(true);
    setResponse(""); // Очистка предыдущего ответа

    try {
      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dream }),
      });

      const data = await res.json();
      setResponse(data.result || "Something went wrong. Try again.");
    } catch (error) {
      setResponse("Error fetching interpretation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 gap-12 sm:p-20 overflow-hidden">
      {/* Картинка как фон */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src="/images/pic.jpeg"
          alt="Dreamy background"
          layout="fill"
          className="background-image" // применяем наш класс
        />
      </div>

      {/* Заголовок */}
      <h1 className="z-10 text-4xl sm:text-5xl font-bold text-emerald-950 text-center font-mono drop-shadow-md hover:drop-shadow-xl transition-all duration-300">
        Dreamer AI
      </h1>

      {/* Поле для ввода */}
      <div className="z-10 flex flex-col items-center gap-4 w-full max-w-md">
        <textarea
          id="dream-description"
          placeholder="Type your dream here..."
          className="text-white placeholder-gray-100 placeholder-opacity-75 text-sm font-mono w-full h-15 p-4 rounded-lg shadow-xl resize-none focus:outline-none bg-black bg-opacity-30"
          value={dream}
          onChange={(e) => setDream(e.target.value)}
        />
      </div>

      {/* Кнопки */}
      <div className="flex gap-4">
        <button
          onClick={getDreamInterpretation}
          disabled={loading}
          className="z-10 opacity-75 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105"
        >
          {loading ? "Thinking..." : "Get an answer"}
        </button>
        <Link
          href="/explore"
          className="z-10 opacity-75 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105"
        >
          Explore
        </Link>
      </div>

      {/* Ответ OpenAI */}
      {response && (
        <div className="z-10 max-w-lg p-4 mt-6 bg-white bg-opacity-20 rounded-lg shadow-lg text-white text-center">
          <h2 className="text-lg font-semibold">Interpretation:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
