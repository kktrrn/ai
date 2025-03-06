import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../models/User"; // Импортируем модель пользователя
import { connectToDatabase } from "../../../mongodb"; // Подключение к базе данных

export async function POST(req) {
  const { email, password } = await req.json();

  // Подключаемся к базе данных
  await connectToDatabase();

  // Находим пользователя по email
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" });
  }

  // Сравниваем хэшированный пароль с введенным
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid email or password" });
  }

  return NextResponse.json({ message: "User signed in successfully", user });
}
