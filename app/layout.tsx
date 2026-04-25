import { ClerkProvider } from "@clerk/nextjs";
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
    <ClerkProvider>
      <html lang="fr">
        <body className="antialiased text-slate-900 overflow-x-hidden bg-gray-50">
          <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />

            {/* mt-16 pour laisser la place à la navbar mobile de la Sidebar */}
            <main className="flex-1 p-4 md:p-8 lg:p-12 w-full mt-16 md:mt-0">
              <div className="max-w-6xl mx-auto">
                 {children}
              </div>
            </main>
          </div>

          <ChatAssistant />
        </body>
      </html>
    </ClerkProvider>
  );
}