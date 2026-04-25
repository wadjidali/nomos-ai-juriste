"use client";
import Link from "next/link";
import { ShieldCheck, Scale, Zap, FileText, CheckCircle, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black text-blue-900 tracking-tighter">NOMOS</div>
        <div className="flex gap-8 items-center">
          <Link href="/analyse" className="bg-blue-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
            Démarrer l'analyse
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="px-8 pt-20 pb-32 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold mb-8 border border-blue-100">
          <ShieldCheck size={14} /> 
          CONFORMITÉ RÉPUBLIQUE DU SÉNÉGAL (COCC & CODE DU TRAVAIL)
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
          Sécurisez vos contrats <br />
          <span className="text-blue-600">en un clic avec l'IA.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          NOMOS analyse instantanément vos documents juridiques pour identifier les clauses à risques et garantir leur conformité au droit sénégalais.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/analyse" className="group bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all flex items-center gap-3">
            Analyser mon premier contrat <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-slate-400 font-medium">Gratuit pour les étudiants & PME</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-50 py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Analyse Instantanée</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Identification automatique des clauses abusives ou non-conformes en moins de 10 secondes.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-emerald-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Scale size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Expertise Sénégal</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Basé sur le Code du Travail et le Code des Obligations Civiles et Commerciales (COCC) du Sénégal.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Rapports PDF</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Générez des rapports détaillés avec conseils de remédiation pour chaque risque détecté.</p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TRUST */}
      <section className="py-24 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-16">Pourquoi choisir NOMOS ?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4 items-start text-left p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <CheckCircle className="text-emerald-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Confidentialité Totale</h4>
              <p className="text-sm text-slate-500">Vos documents ne sont jamais stockés sur nos serveurs. L'analyse est traitée en mémoire vive.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start text-left p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <CheckCircle className="text-emerald-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Conseils Actionnables</h4>
              <p className="text-sm text-slate-500">Pas seulement des erreurs, mais des suggestions concrètes de réécriture de clauses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-xs font-medium">
        © 2026 NOMOS LegalTech Sénégal - Projet de Bachelor Académique
      </footer>
    </div>
  );
}