import { connectToDatabase } from "@/app/mongodb";
import Dream from "@/app/models/Dream.js";

export async function GET(req, { params }) {
  const { dreamId } = params;
  try {
    await connectToDatabase();
    const dream = await Dream.findById(dreamId);

    if (!dream) {
      return new Response(JSON.stringify({ error: "Dream not found!" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        text: dream.text,
        imageUrl: dream.imageUrl,
        createdAt: dream.createdAt,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error fetching dream!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
