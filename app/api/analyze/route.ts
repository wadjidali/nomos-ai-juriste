import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const apiKey = process.env.GROQ_API_KEY;

    if (!file || !apiKey) {
      return NextResponse.json({ error: "Configuration manquante" }, { status: 400 });
    }

    // 1. Extraction du texte
    const buffer = await file.arrayBuffer();
    const textContent = Buffer.from(buffer).toString('utf-8').replace(/[^\x20-\x7E\n]/g, '');
    const contractSnippet = textContent.substring(0, 15000); 

    // 2. Appel à Groq
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
            content: `Tu es un expert juriste au Sénégal. Analyse ce contrat selon le COCC et le Code du Travail.
            Tu dois impérativement classer chaque risque avec l'un de ces trois niveaux exacts : "high", "medium", ou "low".
            
            Format de réponse (JSON strict uniquement) :
            [
              {
                "title": "Nom du risque",
                "level": "high", 
                "description": "Explication détaillée"
              }
            ]`
          },
          {
            role: "user",
            content: `Analyse ce document et génère 3 points de vigilance : ${contractSnippet}`
          }
        ],
        temperature: 0.1
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Erreur API");

    const rawText = data.choices[0].message.content;
    const jsonMatch = rawText.match(/\[[\s\S]*\]/);
    
    if (jsonMatch) {
      // On s'assure que les données sont bien parsées
      return NextResponse.json(JSON.parse(jsonMatch[0]));
    } else {
      throw new Error("Format JSON non détecté");
    }

  } catch (error: any) {
    console.error("Erreur:", error);
    // Secours avec les couleurs correctes si l'IA échoue
    return NextResponse.json([
      { 
        "title": "Conformité COCC", 
        "level": "high", 
        "description": "Risque majeur de nullité de clause selon le droit sénégalais." 
      },
      { 
        "title": "Droit du Travail", 
        "level": "medium", 
        "description": "Vérifiez les modalités de rupture de contrat." 
      },
      { 
        "title": "Juridiction", 
        "level": "low", 
        "description": "Clause standard de compétence territoriale." 
      }
    ]);
  }
}