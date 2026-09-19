import React from 'react';
import { Zap, Dumbbell, BookOpen, Stethoscope, Ticket, ShieldAlert } from 'lucide-react';
import { saveGame, clampStat, getRandomInt } from '../utils/gameLogic.js';
import confetti from 'canvas-confetti';

export default function ActivitiesTab({ gameState, setGameState }) {
  const { age, bankBalance, health, intelligence, look, happiness } = gameState;

  // Gym: Costs $50, boosts Health & Appearance
  const handleGym = () => {
    if (bankBalance < 50) return;
    const updatedState = {
      ...gameState,
      bankBalance: bankBalance - 50,
      health: clampStat(health + 5),
      look: clampStat(look + 4),
      happiness: clampStat(happiness + 2),
      logs: [
        ...gameState.logs,
        { age, text: "Treinei pesado na academia! Saúde e aparência aumentaram." }
      ]
    };
    saveGame(updatedState);
    setGameState(updatedState);
  };

  // Library: Free, boosts Intelligence & Happiness
  const handleLibrary = () => {
    const updatedState = {
      ...gameState,
      intelligence: clampStat(intelligence + 6),
      happiness: clampStat(happiness + 3),
      logs: [
        ...gameState.logs,
        { age, text: "Passei a tarde lendo livros na biblioteca municipal. Inteligência aumentada!" }
      ]
    };
    saveGame(updatedState);
    setGameState(updatedState);
  };

  // Doctor: Costs $200, restores Health to 100%
  const handleDoctor = () => {
    if (bankBalance < 200) return;
    const updatedState = {
      ...gameState,
      bankBalance: bankBalance - 200,
      health: 100,
      logs: [
        ...gameState.logs,
        { age, text: "Fui ao médico para um check-up completo. Minha saúde foi totalmente restaurada!" }
      ]
    };
    saveGame(updatedState);
    setGameState(updatedState);
  };

  // Lottery: Ticket costs $10. Rare jackpot ($1,000,000)
  const handleLottery = () => {
    if (bankBalance < 10) return;
    const isJackpot = Math.random() < 0.05; // 5% chance of jackpot
    if (isJackpot) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      const updatedState = {
        ...gameState,
        bankBalance: bankBalance - 10 + 1000000,
        happiness: 100,
        logs: [
          ...gameState.logs,
          { age, text: "🎉 GANHEI O PRÊMIO ACUMULADO DA LOTERIA! +$1.000.000 no banco!" }
        ]
      };
      saveGame(updatedState);
      setGameState(updatedState);
    } else {
      const updatedState = {
        ...gameState,
        bankBalance: bankBalance - 10,
        logs: [
          ...gameState.logs,
          { age, text: "Comprei um bilhete de loteria ($10), mas infelizmente não fui premiado." }
        ]
      };
      saveGame(updatedState);
      setGameState(updatedState);
    }
  };

  // Crime: Robbery/Theft with risk of prison
  const handleCrime = () => {
    const success = Math.random() < 0.5;
    if (success) {
      const loot = getRandomInt(500, 3500);
      const updatedState = {
        ...gameState,
        bankBalance: bankBalance + loot,
        happiness: clampStat(happiness + 10),
        logs: [
          ...gameState.logs,
          { age, text: `Cometi um furto e consegui escapar com $${loot.toLocaleString()}!` }
        ]
      };
      saveGame(updatedState);
      setGameState(updatedState);
    } else {
      // Arrested: 3 years in prison
      const updatedState = {
        ...gameState,
        inPrison: true,
        prisonYearsLeft: 3,
        happiness: clampStat(happiness - 30),
        logs: [
          ...gameState.logs,
          { age, text: "Fui pego em flagrante pela polícia e condenado a 3 anos de prisão!" }
        ]
      };
      saveGame(updatedState);
      setGameState(updatedState);
    }
  };

  return (
    <div className="space-y-4 pb-2">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
        <Zap className="w-4 h-4 text-emerald-400" />
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Atividades & Lazer</h2>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {/* Gym */}
        <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-950 text-emerald-400 border border-emerald-800/60 rounded-xl">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-gray-200">Academia de Ginástica</h3>
              <p className="text-[10px] text-gray-400">Aumenta Saúde e Aparência • Custo: $50</p>
            </div>
          </div>
          <button
            onClick={handleGym}
            disabled={bankBalance < 50}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-medium text-xs px-3 py-1.5 rounded-xl transition shrink-0"
          >
            Frequentar
          </button>
        </div>

        {/* Library */}
        <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-950 text-blue-400 border border-blue-800/60 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-gray-200">Biblioteca Pública</h3>
              <p className="text-[10px] text-gray-400">Aumenta Inteligência • Gratuito</p>
            </div>
          </div>
          <button
            onClick={handleLibrary}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-3 py-1.5 rounded-xl transition shrink-0"
          >
            Estudar
          </button>
        </div>

        {/* Doctor */}
        <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-950 text-teal-400 border border-teal-800/60 rounded-xl">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-gray-200">Consulta Médica</h3>
              <p className="text-[10px] text-gray-400">Restaura a Saúde para 100% • Custo: $200</p>
            </div>
          </div>
          <button
            onClick={handleDoctor}
            disabled={bankBalance < 200}
            className="bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-medium text-xs px-3 py-1.5 rounded-xl transition shrink-0"
          >
            Consultar
          </button>
        </div>

        {/* Lottery */}
        <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-950 text-amber-400 border border-amber-800/60 rounded-xl">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-gray-200">Bilhete de Loteria</h3>
              <p className="text-[10px] text-gray-400">Chance de $1.000.000 • Custo: $10</p>
            </div>
          </div>
          <button
            onClick={handleLottery}
            disabled={bankBalance < 10}
            className="bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-medium text-xs px-3 py-1.5 rounded-xl transition shrink-0"
          >
            Apostar
          </button>
        </div>

        {/* Crime */}
        <div className="bg-gray-900 border border-red-950/80 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-950 text-red-400 border border-red-800/60 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-red-300">Crimes / Furto de Veículos</h3>
              <p className="text-[10px] text-gray-400">Lucro alto • Risco de 3 anos de Prisão</p>
            </div>
          </div>
          <button
            onClick={handleCrime}
            className="bg-red-700 hover:bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition shrink-0"
          >
            Arriscar
          </button>
        </div>
      </div>
    </div>
  );
}
