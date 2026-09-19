import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function ModalEvent({ event, onOptionSelect }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-sm w-full p-5 shadow-2xl text-white flex flex-col gap-4">
        <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
          <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-800/50">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-emerald-400 leading-tight">{event.title}</h3>
            <span className="text-xs text-gray-400 font-mono">Evento de Vida</span>
          </div>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed bg-gray-950/60 p-3 rounded-xl border border-gray-800/80">
          {event.description}
        </p>

        <div className="flex flex-col gap-2 mt-1">
          {event.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onOptionSelect(option)}
              className="w-full text-left bg-gray-800 hover:bg-emerald-900/40 hover:border-emerald-600 border border-gray-700 text-gray-100 font-medium p-3 rounded-xl text-sm transition duration-150 active:scale-98 flex items-center justify-between group"
            >
              <span>{option.text}</span>
              <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition">➔</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
