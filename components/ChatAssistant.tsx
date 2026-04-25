"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isTyping]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setChat((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (err) {
      setChat((prev) => [...prev, { role: "bot", text: "Erreur de connexion au service NOMOS." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end">
      {isOpen ? (
        <div className="bg-white w-80 md:w-[400px] h-[550px] rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 mb-6">
          {/* HEADER */}
          <div className="bg-blue-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-800 p-2.5 rounded-xl">
                <Bot size={24} className="text-blue-200" />
              </div>
              <div>
                <p className="font-bold text-base leading-none">Assistant NOMOS</p>
                <p className="text-[11px] text-blue-300 mt-1.5 font-medium tracking-wide">EXPERT DROIT SÉNÉGALAIS</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-blue-800 rounded-full transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* ZONE DE CHAT */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50"
          >
            {chat.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="bg-blue-100 p-5 rounded-full mb-4">
                  <Bot size={40} className="text-blue-600 opacity-40" />
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Bienvenue. Posez-moi vos questions sur le droit du travail ou le COCC au Sénégal.
                </p>
              </div>
            )}
            
            {chat.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-900 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 items-center text-blue-600 p-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* INPUT BAR */}
          <div className="p-6 border-t bg-white">
            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50/50 transition-all">
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Votre question juridique..."
                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
              />
              <button 
                onClick={sendMessage}
                disabled={!message.trim() || isTyping}
                className="p-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 disabled:opacity-30 transition-all shadow-md"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* BOUTON ROND AGRANDI (h-16 w-16 soit 64px) */
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 text-white h-16 w-16 hover:w-52 rounded-full shadow-2xl hover:shadow-blue-900/40 transition-all duration-300 flex items-center justify-center overflow-hidden group border-4 border-white"
        >
          <div className="flex items-center justify-center gap-3 px-5 whitespace-nowrap">
            <MessageCircle size={28} className="flex-shrink-0" />
            <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 font-bold text-sm tracking-tight">
              Aide Juridique
            </span>
          </div>
        </button>
      )}
    </div>
  );
}