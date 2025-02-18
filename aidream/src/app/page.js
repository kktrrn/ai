// app/page.js
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-12 sm:p-20 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500">
      {/* Заголовок */}
      <h1 className="text-4xl sm:text-5xl font-bold text-white text-center">
        Dreamer AI
      </h1>

      {/* Поле для ввода */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <label htmlFor="dream-description" className="text-lg text-gray-200">
          Describe your dream
        </label>
        <textarea
          id="dream-description"
          placeholder="Type your dream here..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Кнопки */}
      <div className="flex gap-4">
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:bg-blue-600"
          href="#"
        >
          Get an answer
        </a>
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-500 text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 hover:bg-gray-600"
          href="#"
        >
          Explore
        </a>
      </div>
    </div>
  );
}
