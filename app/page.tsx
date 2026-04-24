import FileUpload from "../components/FileUpload";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-900">Analyse de Contrat</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Téléchargez votre document pour détecter les clauses à risques.
        </p>
      </header>

      <FileUpload />
      
      {/* Petit message d'aide */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm text-gray-500">
        <div className="p-4">
          <div className="font-bold text-blue-900 mb-1">Confidentialité</div>
          Vos documents sont cryptés et traités localement.
        </div>
        <div className="p-4">
          <div className="font-bold text-blue-900 mb-1">Droit Sénégalais</div>
          Conformité avec le COCC et le Code du Travail.
        </div>
        <div className="p-4">
          <div className="font-bold text-blue-900 mb-1">IA Avancée</div>
          Détection automatique des clauses abusives.
        </div>
      </div>
    </div>
  );
}