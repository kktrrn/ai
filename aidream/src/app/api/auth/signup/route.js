import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../models/User"; // Импортируем модель пользователя
import { connectToDatabase } from "../../../mongodb"; // Подключение к базе данных

export async function POST(req) {
  const { email, password } = await req.json();

  // Подключаемся к базе данных
  await connectToDatabase();

  // Проверяем, существует ли уже пользователь с таким email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" });
  }

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);

  // Создаем нового пользователя
  const user = new User({ email, password: hashedPassword });
  await user.save();

  return NextResponse.json({ message: "User registered successfully" });
}
