"use client";
import { useState } from "react";
import { UploadCloud, FileText, X, AlertTriangle, Loader2 } from "lucide-react";
import RiskCard from "./RiskCard";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [risks, setRisks] = useState<any[]>([]);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Veuillez choisir un fichier PDF uniquement.");
    }
  };

  const startAnalysis = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur serveur");

      const data = await response.json();
      setRisks(data);
      setAnalysisDone(true);
    } catch (error) {
      alert("L'analyse a échoué. Vérifie ta connexion et ta clé API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4">
      {!analysisDone ? (
        <div className="max-w-2xl mx-auto">
          {!file ? (
            <div className="relative flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white hover:border-blue-500 transition-all cursor-pointer">
              <UploadCloud size={48} className="text-gray-400" />
              <p className="mt-4 text-sm text-gray-600 text-center">
                <span className="font-semibold text-blue-900">Cliquez pour uploader</span> ou glissez votre contrat PDF
              </p>
              <input 
                type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf" 
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-white border border-blue-100 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <FileText size={24} className="text-blue-600" />
                <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
              </div>
              <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500">
                <X size={20} />
              </button>
            </div>
          )}

          {file && (
            <button 
              onClick={startAnalysis} disabled={loading}
              className="w-full mt-6 bg-blue-900 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center disabled:bg-blue-300"
            >
              {loading ? (
                <><Loader2 className="mr-2 animate-spin" /> Analyse en cours...</>
              ) : (
                "Lancer l'analyse intelligente"
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-700">
          <div className="bg-gray-100 rounded-2xl h-[400px] flex flex-col items-center justify-center border border-gray-200">
            <FileText size={48} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm italic">Aperçu de "{file?.name}"</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <AlertTriangle className="mr-2 text-orange-500" /> Points de vigilance
            </h2>
            
            {risks.map((risk, index) => (
              <RiskCard 
                key={index}
                level={risk.level} 
                title={risk.title} 
                description={risk.description}
              />
            ))}

            <button 
              onClick={() => {setAnalysisDone(false); setFile(null); setRisks([]);}}
              className="w-full mt-6 text-gray-500 text-sm hover:underline"
            >
              Analyser un autre document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}