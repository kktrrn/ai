"use client"; // Для использования хуков в Next.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Для получения dreamId из маршрута

export default function EditDream() {
  const [dreamDescription, setDreamDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { dreamId } = router.query; // Получаем dreamId из маршрута

  useEffect(() => {
    if (dreamId) {
      const fetchDream = async () => {
        try {
          const response = await fetch(`/api/test/get-dream/${dreamId}`);
          const data = await response.json();
          if (response.ok) {
            setDreamDescription(data.text); // Загружаем описание
          } else {
            console.error("Failed to fetch dream:", data);
          }
        } catch (error) {
          console.error("Error fetching dream:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDream();
    }
  }, [dreamId]);

  const handleSave = async () => {
    if (!dreamDescription.trim()) {
      alert("Please write something!");
      return;
    }

    try {
      const response = await fetch(`/api/test/get-dreams/${dreamId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: dreamDescription }),
      });

      if (response.ok) {
        router.push(`/post/${dreamId}`); // Перенаправляем обратно на страницу с постом
      } else {
        alert("Failed to save changes!");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes!");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Dream</h1>
      <textarea
        value={dreamDescription}
        onChange={(e) => setDreamDescription(e.target.value)}
        placeholder="Edit your dream..."
      />
      <div>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}
