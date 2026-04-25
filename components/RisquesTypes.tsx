import React from 'react';
import { ShieldAlert, Scale, Clock, Banknote } from 'lucide-react'; // Si tu utilises lucide-react, sinon remplace par des emojis

const RISQUES_TYPES = [
  {
    title: "Requalification en CDI",
    code: "Code du Travail - Art. L.42",
    description: "Un CDD ne peut être conclu pour plus de 2 ans. S'il est renouvelé plus d'une fois ou s'il continue après terme, il devient un CDI.",
    level: "high",
    icon: <Scale className="text-red-500" />
  },
  {
    title: "Période d'essai excessive",
    code: "Décret n° 70-182",
    description: "Pour les cadres, l'essai est de 6 mois max. Pour les ouvriers, il est souvent de 1 à 3 mois. Une durée supérieure est illégale.",
    level: "medium",
    icon: <Clock className="text-orange-500" />
  },
  {
    title: "Indemnités de rupture",
    code: "Art. L.56 / Convention Collective",
    description: "Le calcul de l'indemnité de licenciement au Sénégal est progressif selon l'ancienneté. Vérifiez que la clause ne réduit pas ce droit.",
    level: "high",
    icon: <Banknote className="text-red-500" />
  },
  {
    title: "Clause de Non-Concurrence",
    code: "Jurisprudence COCC",
    description: "Elle n'est valable que si elle est limitée dans le temps, dans l'espace et si elle prévoit une contrepartie financière.",
    level: "low",
    icon: <ShieldAlert className="text-blue-500" />
  }
];

const RisquesTypes = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">
        Bibliothèque des Vigilances Légales (Sénégal)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RISQUES_TYPES.map((risq, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-50 rounded-lg">
                {risq.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-slate-900">{risq.title}</h3>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    risq.level === 'high' ? 'bg-red-100 text-red-600' : 
                    risq.level === 'medium' ? 'bg-orange-100 text-orange-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {risq.level}
                  </span>
                </div>
                <p className="text-xs font-medium text-blue-600 mb-2">{risq.code}</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {risq.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RisquesTypes;