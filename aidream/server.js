import "dotenv/config"; // Load environment variables from .env
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // For making HTTP requests to OpenAI API

const app = express();
const PORT = 5001;

// CORS configuration: Allow only requests from localhost:3000
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests only from localhost:3000
};
app.use(cors(corsOptions));
app.use(express.json()); // Allows parsing JSON bodies in requests

// POST request handler for /api/interpret
app.post("/api/interpret", async (req, res) => {
  const { prompt } = req.body; // Get prompt from request body

  // If no prompt is provided, return a 400 error
  if (!prompt) {
    console.error("No prompt provided");
    return res
      .status(400)
      .json({ error: "The request must contain a dream text." });
  }

  try {
    // Log to verify that the API key is being correctly loaded
    console.log("OPENAI API Key:", process.env.OPENAI_API_KEY); // Debugging log

    // Request to OpenAI API for dream interpretation
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use API key from environment variables
      },
      body: JSON.stringify({
        model: "gpt-4-mini", // Use gpt-4-mini model
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json(); // Parse OpenAI response

    if (data.error) {
      // If there is an error in the OpenAI response, log and send the error message
      console.error("OpenAI error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    // Send OpenAI's response to the client
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    // Log any error that occurs in the server side and send a 500 error
    console.error("Error fetching from OpenAI:", error);
    res.status(500).json({ error: "Server error while requesting OpenAI" });
  }
});

// Start the server on port 5001
app.listen(PORT, () =>
  console.log(`🚀 Server started at http://localhost:${PORT}`)
);
