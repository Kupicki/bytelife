import React from 'react';
import { Smile, Heart, Brain, Sparkles, RefreshCw } from 'lucide-react';

export default function Header({ gameState, onNewLifeClick }) {
  const { name, age, happiness, health, intelligence, look, bankBalance, job } = gameState;

  return (
    <div className="bg-gray-900 border-b border-gray-800 p-4 rounded-t-2xl shadow-lg text-white">
      {/* Top Title & Reset Button */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-xl font-black tracking-wider text-emerald-400 flex items-center gap-2">
            <span>🎮</span> ByteLife
          </h1>
          <p className="text-xs text-gray-400">{name} ({age} {age === 1 ? 'ano' : 'anos'})</p>
        </div>
        <button
          onClick={onNewLifeClick}
          className="flex items-center gap-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition border border-gray-700"
          title="Iniciar Nova Vida"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Nova Vida</span>
        </button>
      </div>

      {/* Primary Stat: Bank Balance & Job */}
      <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-2.5 mb-3 flex justify-between items-center">
        <div>
          <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Saldo Bancário</div>
          <div className={`text-lg font-bold ${bankBalance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${bankBalance.toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Ocupação</div>
          <div className="text-xs font-medium text-gray-200">
            {job ? job.title : age < 6 ? 'Bebê' : age < 18 ? 'Estudante' : 'Desempregado'}
          </div>
        </div>
      </div>

      {/* 4 Color-coded Stat Progress Bars */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Happiness */}
        <div className="bg-gray-950/50 p-2 rounded-lg border border-gray-800">
          <div className="flex justify-between items-center mb-1">
            <span className="flex items-center gap-1 font-medium text-amber-400">
              <Smile className="w-3.5 h-3.5" /> Felicidade
            </span>
            <span className="text-[11px] font-bold text-gray-300">{happiness}%</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${happiness}%` }}
            />
          </div>
        </div>

        {/* Health */}
        <div className="bg-gray-950/50 p-2 rounded-lg border border-gray-800">
          <div className="flex justify-between items-center mb-1">
            <span className="flex items-center gap-1 font-medium text-emerald-400">
              <Heart className="w-3.5 h-3.5" /> Saúde
            </span>
            <span className="text-[11px] font-bold text-gray-300">{health}%</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${health}%` }}
            />
          </div>
        </div>

        {/* Intelligence */}
        <div className="bg-gray-950/50 p-2 rounded-lg border border-gray-800">
          <div className="flex justify-between items-center mb-1">
            <span className="flex items-center gap-1 font-medium text-blue-400">
              <Brain className="w-3.5 h-3.5" /> Inteligência
            </span>
            <span className="text-[11px] font-bold text-gray-300">{intelligence}%</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${intelligence}%` }}
            />
          </div>
        </div>

        {/* Look */}
        <div className="bg-gray-950/50 p-2 rounded-lg border border-gray-800">
          <div className="flex justify-between items-center mb-1">
            <span className="flex items-center gap-1 font-medium text-pink-400">
              <Sparkles className="w-3.5 h-3.5" /> Aparência
            </span>
            <span className="text-[11px] font-bold text-gray-300">{look}%</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-pink-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${look}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
