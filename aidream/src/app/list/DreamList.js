"use client";

import { useEffect, useState } from "react";

export default function DreamList() {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    async function fetchDreams() {
      try {
        const response = await fetch("/api/get-dreams", {
          cache: "no-store",
        });
        const data = await response.json();
        setDreams(data);
      } catch (error) {
        console.error("Error fetching dreams:", error);
      }
    }

    fetchDreams();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Dream List</h2>
      <ul>
        {dreams.map((dream, index) => (
          <li key={index} className="mt-2 p-2 bg-gray-700 rounded">
            {dream.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
