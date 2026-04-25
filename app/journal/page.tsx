"use client";
import { useState, useEffect } from "react";
import { 
  History, 
  ShieldAlert, 
  FileText, 
  Trash2, 
  Download, 
  Scale, 
  Clock, 
  Ban,
  AlertTriangle,
  Zap,
  Gavel,
  BookOpen
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState("journal");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("nomos_journal") || "[]");
    setHistory(saved);
  }, []);

  const totalContracts = history.length;
  const totalRisks = history.reduce((acc, curr) => acc + (curr.riskCount || 0), 0);
  const highRisks = history.reduce((acc, curr) => {
    const count = curr.results?.filter((r: any) => r.level === 'high').length || 0;
    return acc + count;
  }, 0);

  const downloadAgain = (item: any) => {
    const doc = new jsPDF();
    doc.text(`Rapport NOMOS : ${item.fileName}`, 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Risque', 'Gravité', 'Loi', 'Conseil']],
      body: item.results.map((r: any) => [r.title, r.level.toUpperCase(), r.article, r.advice]),
      headStyles: { fillColor: [30, 58, 138] }
    });
    doc.save(`NOMOS_${item.fileName}.pdf`);
  };

  const deleteItem = (id: number) => {
    const updated = history.filter((h: any) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("nomos_journal", JSON.stringify(updated));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-black text-blue-900">Espace Juridique</h1>
        <p className="text-gray-500 font-medium">Référentiel légal et suivi de conformité NOMOS.</p>
      </header>

      {/* --- DASHBOARD COMPACT --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Documents</p>
            <p className="text-xl font-black text-slate-800">{totalContracts}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="bg-red-50 p-2 rounded-xl text-red-600">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Risques Hauts</p>
            <p className="text-xl font-black text-slate-800">{highRisks}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Alertes Totales</p>
            <p className="text-xl font-black text-slate-800">{totalRisks}</p>
          </div>
        </div>
      </div>

      {/* --- ONGLETS --- */}
      <div className="flex p-1.5 bg-gray-100 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab("journal")} 
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === "journal" ? "bg-white text-blue-900 shadow-md" : "text-gray-500"}`}
        >
          <History size={18} /> Journal d'Analyse
        </button>
        <button 
          onClick={() => setActiveTab("risques")} 
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === "risques" ? "bg-white text-blue-900 shadow-md" : "text-gray-500"}`}
        >
          <BookOpen size={18} /> Bibliothèque Légale
        </button>
      </div>

      {activeTab === "journal" ? (
        <div className="grid gap-4">
          {history.length > 0 ? history.map((item: any) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center hover:border-blue-400 transition-all group">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.fileName}</h3>
                  <p className="text-[11px] text-gray-400 font-bold">{item.date} • {item.riskCount} points détectés</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => downloadAgain(item)} className="bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-xl text-xs font-black hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2">
                  <Download size={16} /> Rapport PDF
                </button>
                <button onClick={() => deleteItem(item.id)} className="p-2.5 text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
               <History size={80} className="mx-auto mb-4 opacity-5 text-blue-900" />
               <p className="text-gray-400 font-bold">Aucune archive disponible.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <RiskCard 
            title="Détournement de la durée du CDD" 
            art="Loi n° 97-17 - Art. L.42" 
            level="CRITIQUE"
            desc="Un contrat à durée déterminée ne peut avoir pour objet de pourvoir durablement un emploi lié à l'activité normale de l'entreprise. Risque de requalification en CDI par l'Inspection du Travail." 
            icon={<Gavel className="text-red-600" />} 
          />
          <RiskCard 
            title="Essai non conforme aux barèmes" 
            art="Décret n° 70-182" 
            level="MODÉRÉ"
            desc="La période d'essai doit respecter les plafonds : 1 mois pour les ouvriers, 2 mois pour les agents de maîtrise et 6 mois pour les cadres. Toute mention supérieure est nulle de plein droit." 
            icon={<Clock className="text-orange-500" />} 
          />
          <RiskCard 
            title="Lésion dans les contrats civils" 
            art="COCC - Art. 93 & suivants" 
            level="ÉLEVÉ"
            desc="Toute clause créant un déséquilibre significatif entre les prestations des parties peut être frappée de nullité. Le COCC protège contre l'exploitation de la faiblesse d'une partie." 
            icon={<Scale className="text-blue-600" />} 
          />
          <RiskCard 
            title="Clause de Non-Concurrence abusive" 
            art="Jurisprudence Sociale Sénégal" 
            level="CRITIQUE"
            desc="Pour être valable, elle doit être limitée dans le temps et l'espace, et comporter une contrepartie financière substantielle pour le salarié après la rupture." 
            icon={<Ban className="text-red-500" />} 
          />
        </div>
      )}
    </div>
  );
}

function RiskCard({ title, art, desc, level, icon }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-blue-200 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-blue-50 transition-colors">{icon}</div>
        <div className="text-right">
          <span className="block text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 mb-2">{art}</span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${level === 'CRITIQUE' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
            {level}
          </span>
        </div>
      </div>
      <h3 className="font-bold text-slate-900 text-xl mb-3 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}