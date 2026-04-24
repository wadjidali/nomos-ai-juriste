import "./globals.css";
import Sidebar from "../components/Sidebar";
import ChatAssistant from "../components/ChatAssistant";

export const metadata = {
  title: "NOMOS - IA Juridique Sénégal",
  description: "Analyse de contrats et assistant juridique intelligent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased text-slate-900">
        <div className="flex h-screen bg-gray-50">
          {/* Barre latérale fixe à gauche */}
          <Sidebar />

          {/* Zone de contenu principal qui défile */}
          <main className="flex-1 overflow-y-auto p-8 lg:p-12">
            {children}
          </main>
        </div>

        {/* Le Copilot Flottant est placé ici pour être 
            accessible sur toutes les pages du projet.
        */}
        <ChatAssistant />
      </body>
    </html>
  );
}