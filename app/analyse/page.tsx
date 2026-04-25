"use client";
import { useState } from "react";
import { FileSearch, Play, Camera, AlertCircle, CheckCircle2, FileText, Loader2 } from "lucide-react";
import Tesseract from "tesseract.js";

export default function AnalysePage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [ocrStatus, setOcrStatus] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setAnalysis([]); // Réinitialiser l'analyse
    }
  };

  const processAnalysis = async () => {
    if (!file) return;
    setLoading(true);
    let textToAnalyze = "";

    try {
      // SI C'EST UNE IMAGE (PHOTO)
      if (file.type.startsWith("image/")) {
        setOcrStatus("NOMOS lit votre document...");
        const { data: { text } } = await Tesseract.recognize(file, 'fra', {
          logger: m => {
            if (m.status === "recognizing text") {
              setOcrStatus(`Lecture : ${Math.round(m.progress * 100)}%`);
            }
          }
        });
        textToAnalyze = text;
      } else {
        // SI C'EST UN PDF (Simulé ici, idéalement utiliser pdf-parse en API)
        textToAnalyze = "Contrat standard extrait du PDF..."; 
      }

      setOcrStatus("Analyse juridique par l'IA...");
      const res = await fetch("/api/analyze", { 
        method: "POST", 
        body: JSON.stringify({ text: textToAnalyze }) 
      });
      
      const data = await res.json();
      setAnalysis(data);

      // Sauvegarde Journal
      const history = JSON.parse(localStorage.getItem("nomos_journal") || "[]");
      const newEntry = {
        id: Date.now(),
        fileName: file.name || "Document Scanné",
        date: new Date().toLocaleString(),
        riskCount: data.length,
        results: data
      };
      localStorage.setItem("nomos_journal", JSON.stringify([newEntry, ...history]));

    } catch (err) {
      console.error(err);
      alert("Erreur lors de la lecture du document.");
    } finally {
      setLoading(false);
      setOcrStatus("");
    }
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-slate-50">
      <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-900 flex items-center gap-2">
            <FileSearch size={28} className="text-blue-600" /> NOMOS Vision
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Analyse PDF & Documents Papiers</p>
        </div>
        
        <div className="flex gap-3">
          {/* Bouton Fichier/PDF */}
          <input type="file" id="fileUp" accept="application/pdf" className="hidden" onChange={handleFileChange} />
          <label htmlFor="fileUp" className="bg-gray-100 px-5 py-3 rounded-2xl text-xs font-black cursor-pointer hover:bg-gray-200 transition-all flex items-center gap-2">
            <FileText size={18} /> PDF
          </label>

          {/* Bouton Camera (Mobile Ready) */}
          <input type="file" id="camUp" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
          <label htmlFor="camUp" className="bg-blue-50 text-blue-700 px-5 py-3 rounded-2xl text-xs font-black cursor-pointer hover:bg-blue-100 transition-all flex items-center gap-2 border border-blue-100">
            <Camera size={18} /> PHOTO
          </label>

          {file && (
            <button 
              onClick={processAnalysis} 
              disabled={loading} 
              className="bg-blue-900 text-white px-8 py-3 rounded-2xl text-xs font-black flex items-center gap-2 hover:bg-blue-800 disabled:opacity-50 transition-all shadow-lg shadow-blue-900/20"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
              {loading ? "TRAITEMENT..." : "ANALYSER"}
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* PREVIEW ZONE */}
        <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-inner overflow-hidden relative">
          {previewUrl ? (
            file?.type.startsWith("image/") ? (
              <img src={previewUrl} className="w-full h-full object-contain p-4" alt="Scan" />
            ) : (
              <iframe src={previewUrl} className="w-full h-full border-none" />
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-10">
              <div className="bg-slate-50 p-8 rounded-full mb-4">
                <Camera size={48} className="text-slate-200" />
              </div>
              <p className="text-gray-400 font-bold text-sm">Prenez une photo de votre contrat<br/>ou importez un PDF</p>
            </div>
          )}

          {/* Overlay de chargement OCR */}
          {loading && (
            <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center">
                <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
                <p className="text-blue-900 font-black text-sm uppercase tracking-tighter animate-pulse">{ocrStatus}</p>
              </div>
            </div>
          )}
        </div>

        {/* RISQUES LIST */}
        <div className="w-[450px] overflow-y-auto space-y-4 pr-2">
          {analysis.length > 0 ? (
            analysis.map((risk, i) => (
              <div key={i} className={`bg-white p-6 rounded-3xl border shadow-sm border-l-8 animate-in fade-in slide-in-from-right-4 duration-500 ${
                risk.level === 'high' ? 'border-l-red-500' : 
                risk.level === 'medium' ? 'border-l-orange-500' : 'border-l-blue-500'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-black text-slate-900 text-sm leading-tight pr-4">{risk.title}</h3>
                  <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">
                    {risk.article}
                  </span>
                </div>
                <p className="text-[12px] text-slate-600 mb-4 leading-relaxed">{risk.description}</p>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 font-medium">
                  <p className="text-[10px] font-black text-emerald-700 uppercase mb-1 flex items-center gap-1">
                    <CheckCircle2 size={14}/> Conseil NOMOS
                  </p>
                  <p className="text-[12px] text-emerald-800 italic">{risk.advice}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 h-full flex flex-col items-center justify-center text-gray-400 p-10 text-center">
              <AlertCircle size={48} className="mb-4 opacity-10" />
              <p className="text-xs font-bold leading-relaxed">Les points de vigilance s'afficheront ici après la lecture.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}