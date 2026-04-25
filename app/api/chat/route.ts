import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Tu es l'assistant NOMOS. Tu réponds de manière concise aux questions sur le droit du travail et le droit civil au Sénégal (COCC). Si tu ne sais pas, suggère de consulter un avocat."
          },
          { role: "user", content: message }
        ],
        temperature: 0.5,
        max_tokens: 300
      })
    });

    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });

  } catch (error) {
    return NextResponse.json({ reply: "Désolé, je rencontre une petite erreur technique." }, { status: 500 });
  }
}