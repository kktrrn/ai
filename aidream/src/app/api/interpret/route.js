import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { dream } = await req.json();

    // Send the request to OpenAI's API
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4-mini", // Use gpt-4-mini model
          messages: [
            { role: "system", content: "You are a dream interpreter." },
            { role: "user", content: dream },
          ],
          max_tokens: 150,
        }),
      }
    );

    const data = await openaiRes.json();
    console.log("OpenAI response:", data);

    // Return the result from OpenAI to the client
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    // Log any errors and return a 500 status with a message
    console.error("Failed to interpret the dream:", error);
    return NextResponse.json(
      { error: "Failed to interpret the dream." },
      { status: 500 }
    );
  }
}
