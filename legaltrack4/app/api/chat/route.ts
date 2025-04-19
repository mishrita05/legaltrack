import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter
        "X-Title": "LegalTrack App", // Required by OpenRouter
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages
      })
    });

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const data = await response.json();
    return NextResponse.json(data.choices[0].message); // Directly return the message object
  } catch (error) {
    console.error("OpenRouter Error:", error);
    return NextResponse.json(
      { role: "assistant", content: "Failed to get response. Please try again." },
      { status: 500 }
    );
  }
}