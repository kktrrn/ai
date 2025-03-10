// src/app/api/save-dream/route.js

import { connectToDatabase } from "@/app/mongodb";
import Dream from "@/app/models/Dream.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Подключаемся к базе данных
    await connectToDatabase();

    // Извлекаем все сны из базы данных
    const dreams = await Dream.find({});

    // Возвращаем сны в формате JSON
    return new Response(JSON.stringify(dreams), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Ошибка при подключении к базе данных или запросе
    return new Response(JSON.stringify({ error: "Failed to fetch dreams" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    // Подключаемся к базе данных
    await connectToDatabase();

    // Получаем описание сна из тела запроса
    const { description } = await request.json();

    if (!description) {
      return new Response(
        JSON.stringify({ error: "Dream description is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Создаем новый объект сна и сохраняем его
    const newDream = new Dream({ text: description });
    await newDream.save();

    // Ответ с успешным сохранением
    return new Response(
      JSON.stringify({ message: "Dream saved successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Ошибка при сохранении сна
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
