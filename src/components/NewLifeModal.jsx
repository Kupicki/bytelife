import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function NewLifeModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-xs w-full p-5 shadow-2xl text-white text-center">
        <div className="w-12 h-12 bg-amber-950/80 text-amber-400 rounded-2xl border border-amber-800/60 flex items-center justify-center mx-auto mb-3">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="font-bold text-lg text-gray-100 mb-1">Iniciar Nova Vida?</h3>
        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
          Sua vida atual e todo o seu progresso salvo serão apagados para dar início a um novo personagem procedural.
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onClose}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 px-4 rounded-xl text-xs transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Confirmar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
