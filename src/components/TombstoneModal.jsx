import React from 'react';
import { Skull, RefreshCw, Award } from 'lucide-react';

export default function TombstoneModal({ gameState, onRestart }) {
  const { name, age, deathCause, bankBalance, assets, completedDegrees } = gameState;

  // Calculate Net Worth
  const totalAssetValue = (assets || []).reduce((acc, curr) => acc + (curr.price || 0), 0);
  const netWorth = (bankBalance || 0) + totalAssetValue;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-white text-center flex flex-col items-center">
        {/* Tombstone Icon Header */}
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-3 border-2 border-gray-700 shadow-inner text-gray-400">
          <Skull className="w-9 h-9 text-red-400" />
        </div>

        <h2 className="text-2xl font-black text-gray-100 mb-1">AQUI JAZ</h2>
        <h3 className="text-xl font-bold text-emerald-400 mb-2">{name}</h3>
        <p className="text-xs text-gray-400 italic mb-4">Viveu até os {age} anos de idade</p>

        <div className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 text-left mb-5 space-y-2 text-xs">
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <span className="text-gray-400">Causa da Morte:</span>
            <span className="font-semibold text-red-400 text-right">{deathCause || 'Velhice'}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <span className="text-gray-400">Patrimônio Líquido Acumulado:</span>
            <span className="font-bold text-emerald-400">${netWorth.toLocaleString()}</span>
          </div>
          {completedDegrees && completedDegrees.length > 0 && (
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-blue-400" /> Diplomas:
              </span>
              <span className="font-semibold text-blue-300 text-right">{completedDegrees.join(', ')}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Bens Possuídos:</span>
            <span className="font-semibold text-gray-200">{assets ? assets.length : 0} item(ns)</span>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-black py-3 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 active:scale-95"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Começar Nova Vida</span>
        </button>
      </div>
    </div>
  );
}
