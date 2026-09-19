import React, { useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';

export default function LifeLog({ logs }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="space-y-3 pb-2">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-800">
        <BookOpen className="w-4 h-4 text-emerald-400" />
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Diário de Vida (Life Log)</h2>
      </div>

      {logs.map((log, idx) => (
        <div key={idx} className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex items-start gap-3 shadow-sm hover:border-gray-700 transition">
          <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono font-bold text-[11px] px-2 py-0.5 rounded-md shrink-0">
            {log.age} anos
          </span>
          <p className="text-xs text-gray-200 leading-relaxed pt-0.5">{log.text}</p>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
