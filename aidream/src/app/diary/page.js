"use client"; // Убедитесь, что используете 'use client' для использования хуков в Next.js

import { useState } from "react"; // Для работы с состоянием
import Link from "next/link"; // Для ссылок
import Image from "next/image";

export default function Diary() {
  const [dreamDescription, setDreamDescription] = useState(""); // Храним описание сна

  const handleInputChange = (e) => {
    setDreamDescription(e.target.value); // Обработчик изменения текста
  };

  const handleSaveDream = async () => {
    if (!dreamDescription.trim()) {
      alert("Please write something!");
      return;
    }

    // Отправляем данные на сервер
    const response = await fetch("/api/test/save-dream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: dreamDescription }), // Отправляем текст сна
    });

    if (response.ok) {
      alert("Dream saved successfully!");
      setDreamDescription(""); // Очищаем поле после сохранения
    } else {
      alert("Something went wrong!");
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

      <Link href="/" passHref>
        <h2 className="z-10 text-3xl sm:text-4xl font-bold text-emerald-950 text-center font-mono drop-shadow-md hover:drop-shadow-xl transition-all duration-300 cursor-pointer">
          Share your dream
        </h2>
      </Link>

      <div className="z-10 flex flex-col items-center gap-4 w-full max-w-md">
        <textarea
          id="dream-description"
          value={dreamDescription} // Добавляем value для двустороннего связывания данных
          onChange={handleInputChange} // Для отслеживания ввода
          placeholder="Type your dream here..."
          className="text-white placeholder-gray-100 placeholder-opacity-75 text-sm font-mono w-full h-15 p-4 rounded-lg shadow-xl resize-none focus:outline-none bg-black bg-opacity-30"
        />
      </div>

      <div className="z-10 mt-6 flex gap-6">
        {" "}
        {/* Добавляем flex контейнер для кнопок */}
        <button
          onClick={handleSaveDream}
          className="opacity-75 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105"
        >
          Save Dream
        </button>
        <Link
          href="/experience"
          className="opacity-75 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105"
        >
          Experience
        </Link>
      </div>
    </div>
  );
}
