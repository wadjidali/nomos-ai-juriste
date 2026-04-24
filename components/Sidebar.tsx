import { Home, History, ShieldAlert, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-20 items-center justify-center border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-900 tracking-tight">NOMOS</h1>
      </div>
      
      <nav className="flex-1 space-y-2 p-4">
        <a href="/" className="flex items-center space-x-3 rounded-lg bg-blue-50 p-3 text-blue-900">
          <Home size={20} />
          <span className="font-medium">Analyse</span>
        </a>
        
        <a href="/journal" className="flex items-center space-x-3 rounded-lg p-3 text-gray-600 hover:bg-gray-50 transition-colors">
          <History size={20} />
          <span className="font-medium">Journal (Archive)</span>
        </a>

        <a href="#" className="flex items-center space-x-3 rounded-lg p-3 text-gray-600 hover:bg-gray-50 transition-colors">
          <ShieldAlert size={20} />
          <span className="font-medium">Risques Types</span>
        </a>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <a href="#" className="flex items-center space-x-3 rounded-lg p-3 text-gray-500 hover:bg-gray-50">
          <Settings size={20} />
          <span className="font-medium">Paramètres</span>
        </a>
      </div>
    </div>
  );
}