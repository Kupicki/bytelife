import React from 'react';
import { Plus } from 'lucide-react';

export default function AgeUpButton({ onAgeUp, disabled }) {
  return (
    <div className="p-3 bg-gray-900 border-t border-gray-800 flex justify-center">
      <button
        onClick={onAgeUp}
        disabled={disabled}
        className="w-full max-w-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white font-black py-3 px-6 rounded-2xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 text-lg active:scale-95 transition transform"
      >
        <Plus className="w-6 h-6 stroke-[3]" />
        <span>+1 Ano (Envelhecer)</span>
      </button>
    </div>
  );
}
