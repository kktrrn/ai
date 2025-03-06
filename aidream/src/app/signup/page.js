"use client"; // Указывает, что это клиентский компонент

import { useState } from "react";
import { useRouter } from "next/navigation"; // Для редиректа
import { signIn } from "next-auth/react"; // Для аутентификации после регистрации

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Отправляем данные на сервер для регистрации
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      // Если регистрация успешна, выполняем вход
      const loginResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginResponse?.error) {
        setError("Login failed");
      } else {
        router.push("/explore"); // Редирект на страницу explore
      }
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
