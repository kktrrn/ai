// app/signin/page.js

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Для навигации

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Хук для навигации

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Вход через email и пароль
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Мы контролируем редирект вручную
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      // Если вход успешен, редиректим на страницу explore
      router.push("/explore");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign in to your account</h1>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => signIn("google")}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
