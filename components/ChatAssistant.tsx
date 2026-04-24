"use client";
import { useState } from "react";
import { Send, Bot, X, MessageSquare } from "lucide-react";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour ! Je suis votre Copilot Nomos. Posez-moi une question sur le droit sénégalais ou téléchargez un contrat pour une analyse." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages([...newMessages, { 
        role: "assistant", 
        content: "En tant qu'expert sur le droit sénégalais, je peux vous confirmer que l'Article L.12 du Code du Travail régit ce point. Souhaitez-vous plus de détails ?" 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Fenêtre de Chat */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-blue-900 text-white flex justify-between items-center font-bold">
            <div className="flex items-center">
              <Bot size={20} className="mr-2" />
              <span>Copilot Nomos</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 shadow-sm"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex items-center space-x-2">
            <input 
              type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Posez votre question juridique..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleSend} className="bg-blue-900 text-white p-2 rounded-xl hover:bg-blue-800 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Bulle d'activation */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-900 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center group"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap font-medium text-sm">Une question ?</span>}
      </button>
    </div>
  );
}