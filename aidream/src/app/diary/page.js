"use client"; // Убедитесь, что используете 'use client' для использования хуков в Next.js

import { useState } from "react"; // Для работы с состоянием
import Link from "next/link"; // Для ссылок
import Image from "next/image"; // Для отображения изображений

export default function Diary() {
  const [dreamDescription, setDreamDescription] = useState(""); // Храним описание сна
  const [imageUrl, setImageUrl] = useState(""); // Храним URL изображения
  const [isLoading, setIsLoading] = useState(false); // Состояние для кнопки (загружается ли изображение?)

  const handleInputChange = (e) => {
    setDreamDescription(e.target.value); // Обработчик изменения текста
  };

  const handleSaveDream = async () => {
    if (!dreamDescription.trim()) {
      alert("Please write something!");
      return;
    }

    // Отправляем данные на сервер для сохранения сна
    try {
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
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error("Error saving dream:", error);
      alert("An error occurred while saving the dream.");
    }
  };

  const handleGenerateImage = async () => {
    if (!dreamDescription.trim()) {
      alert("Please write a description to generate an image!");
      return;
    }

    setIsLoading(true); // Устанавливаем состояние загрузки

    // Отправляем запрос на сервер для генерации изображения
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: dreamDescription }),
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.imageUrl); // Сохраняем URL изображения
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to generate image!"}`);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("An error occurred while generating the image.");
    } finally {
      setIsLoading(false); // Сбрасываем состояние загрузки
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

        {/* Кнопка для генерации изображения */}
        <button
          onClick={handleGenerateImage}
          disabled={isLoading} // Отключаем кнопку, пока идет загрузка
          className={`opacity-75 font-mono rounded-full border border-solid border-transparent transition-all duration-300 ease-in-out flex items-center justify-center text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:shadow-[0_0_15px_#ffffff] hover:scale-105 ${
            isLoading ? "bg-gray-500 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Generate an image"}
        </button>
      </div>

      {/* Отображаем изображение, если оно есть */}
      {imageUrl && (
        <div className="mt-6 z-10">
          <h3 className="text-white text-lg font-mono">Generated Image:</h3>
          <Image
            src={imageUrl}
            alt="Generated image"
            width={512} // Размер изображения, как в Instagram (500px)
            height={512} // Устанавливаем высоту изображения
            style={{
              objectFit: "cover", // Обрезаем изображение, чтобы оно красиво заполнило контейнер
              borderRadius: "12px", // Радиус углов для изображения
            }}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
