import React from 'react';
import { BookOpen, Briefcase, Users, Zap, Home } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'feed', label: 'Diário', icon: BookOpen },
    { id: 'occupation', label: 'Carreira', icon: Briefcase },
    { id: 'relationships', label: 'Relações', icon: Users },
    { id: 'activities', label: 'Atividades', icon: Zap },
    { id: 'assets', label: 'Ativos', icon: Home },
  ];

  return (
    <nav className="bg-gray-950 border-t border-gray-800 rounded-b-2xl px-2 py-2 flex justify-around items-center">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-xs font-medium transition ${
              isActive
                ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
