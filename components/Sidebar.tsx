"use client";
import { useState } from "react";
import { LayoutDashboard, History, Menu, X, Settings } from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const menuItems = [
    { name: "Analyse", icon: <LayoutDashboard size={20} />, path: "/analyse" },
    { name: "Journal", icon: <History size={20} />, path: "/journal" },
  ];

  return (
    <>
      {/* NAVBAR MOBILE */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b w-full fixed top-0 z-50">
        <span className="font-bold text-blue-900 text-xl tracking-tighter">NOMOS</span>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-blue-900">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR GAUCHE */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="hidden md:block mb-10">
            <h1 className="text-2xl font-black text-blue-900 tracking-tighter">NOMOS</h1>
          </div>

          <nav className="flex-1 space-y-2 mt-16 md:mt-0">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all font-medium"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* ZONE UTILISATEUR (AUTH) */}
          <div className="border-t pt-4 flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-700 truncate w-32">
                  {user?.firstName || "Utilisateur"}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">Compte Actif</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}