import { FileText, Calendar, ArrowRight } from "lucide-react";

export default function JournalPage() {
  const archives = [
    { id: 1, name: "Contrat_Travail_Freelance.pdf", date: "22/04/2026", risks: 3, score: "Critique" },
    { id: 2, name: "Bail_Habitation_Dakar.pdf", date: "15/04/2026", risks: 1, score: "Sûr" },
    { id: 3, name: "Avenant_Salaire.pdf", date: "10/04/2026", risks: 0, score: "Conforme" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-blue-900">Journal de bord Nomos</h1>
        <p className="text-gray-500">Retrouvez l'historique de vos analyses et fiches de synthèse.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Document</th>
              <th className="px-6 py-4">Date d'analyse</th>
              <th className="px-6 py-4">Risques</th>
              <th className="px-6 py-4">Statut</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {archives.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <FileText className="text-blue-600" size={20} />
                  <span className="font-medium text-gray-700">{item.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2" /> {item.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-orange-600">{item.risks} détectés</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.score === "Critique" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  }`}>
                    {item.score}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-900 hover:underline flex items-center text-sm font-bold">
                    Détails <ArrowRight size={16} className="ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}