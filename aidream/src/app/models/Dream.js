import mongoose from "mongoose";

// Создаем схему для сна
const dreamSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // поле обязательно
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Экспортируем модель Dream
const Dream = mongoose.models.Dream || mongoose.model("Dream", dreamSchema);

export default Dream;
