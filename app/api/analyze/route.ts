import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    const { text } = formData; // On suppose que le texte a été extrait du PDF

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Tu es un expert juriste spécialisé en droit sénégalais. 
            Analyse le contrat fourni et identifie TOUS les risques (minimum 3 si possible) selon le Code du Travail et le COCC du Sénégal.
            
            Format de réponse attendu (JSON strict uniquement) :
            [
              {
                "title": "Nom du risque",
                "level": "high" | "medium" | "low",
                "article": "Référence légale (ex: Art. L.56)",
                "description": "Explication détaillée du risque",
                "advice": "Conseil de réécriture précis"
              }
            ]`
          },
          { role: "user", content: `Contrat à analyser : ${text}` }
        ],
        temperature: 0.2, // Rigueur maximale
      })
    });

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(analysis);

  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json({ error: "Échec de l'analyse" }, { status: 500 });
  }
}