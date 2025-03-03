import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { dream } = await req.json();

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a dream interpreter." },
            { role: "user", content: dream },
          ],
          max_tokens: 150,
        }),
      }
    );

    const data = await openaiRes.json();
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to interpret the dream." },
      { status: 500 }
    );
  }
}
