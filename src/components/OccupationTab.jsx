import React from 'react';
import { JOBS, UNIVERSITIES } from '../data/jobs.js';
import { Briefcase, GraduationCap, Award, DollarSign, ArrowUpRight, LogOut, CheckCircle } from 'lucide-react';
import { saveGame, clampStat } from '../utils/gameLogic.js';

export default function OccupationTab({ gameState, setGameState }) {
  const { age, job, university, completedDegrees, intelligence, bankBalance } = gameState;

  // Actions for current job
  const handleWorkHard = () => {
    if (!job) return;
    const boost = Math.floor(Math.random() * 5) + 3;
    const newPerf = Math.min(100, (job.performance || 50) + boost);
    const newJob = { ...job, performance: newPerf };
    const updatedState = {
      ...gameState,
      job: newJob,
      happiness: clampStat(gameState.happiness - 2),
      logs: [
        ...gameState.logs,
        { age, text: `Trabalhei duro no emprego de ${job.title}. Desempenho aumentado!` }
      ]
    };
    saveGame(updatedState);
    setGameState(updatedState);
  };

  const handleAskRaise = () => {
    if (!job) return;
    const success = Math.random() < 0.45 || (job.performance && job.performance > 75);
    if (success) {
      const raise = Math.round(job.salary * 0.15);
      const newSalary = job.salary + raise;
      const updatedState = {
        ...gameState,
        job: { ...job, salary: newSalary },
        happiness: clampStat(gameState.happiness + 10),
        logs: [
          ...gameState.logs,
          { age, text: `Consegui um aumento salarial de $${raise.toLocaleString()} como ${job.title}!` }
        ]
      };
      saveGame(updatedState);
      setGameState(updatedState);
    } else {
      const updatedState = {
        ...gameState,
        happiness: clampStat(gameState.happiness - 8),
        logs: [
          ...gameState.logs,
          { age, text: `Pedi um aumento salarial como ${job.title}, mas o chefe recusou.` }
        ]
      };
      saveGame(updatedState);
      setGameState(updatedState);
    }
  };

  const handleQuitJob = () => {
    if (!job) return;
    const updatedState = {
      ...gameState,
      job: null,
      logs: [
        ...gameState.logs,
        { age, text: `Pedi demissão do cargo de ${job.title}.` }
      ]
    };
    saveGame(updatedState);
    setGameState(updatedState);
  };

  // Actions for university & job board
  const handleApplyUniversity = (uni) => {
    if (intelligence < uni.minIntelligence) return;
    const updatedState = {
      ...gameState,
      university: { ...uni, yearsLeft: uni.years },
      logs: [
        ...gameState.logs,
        { age, text: `Fui aceito e iniciei a faculdade de ${uni.name}!` }
      ]
    };
    saveGame(updatedState);
    setGameState(updatedState);
  };

  const handleApplyJob = (selectedJob) => {
    const updatedState = {
      ...gameState,
      job: { ...selectedJob, performance: 50 },
      logs: [
        ...gameState.logs,
        { age, text: `Fui contratado para o cargo de ${selectedJob.title} com salário de $${selectedJob.salary.toLocaleString()}/ano!` }
      ]
    };
    saveGame(updatedState);
    setGameState(updatedState);
  };

  return (
    <div className="space-y-4 pb-2">
      {/* Title */}
      <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
        <Briefcase className="w-4 h-4 text-emerald-400" />
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ocupação & Carreira</h2>
      </div>

      {/* Underage / School System */}
      {age < 18 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center space-y-3">
          <div className="w-12 h-12 bg-blue-950 text-blue-400 border border-blue-800/50 rounded-2xl flex items-center justify-center mx-auto">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-100 text-sm">Escola de Educação Básica</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Você está focado nos estudos escolares. Continue envelhecendo para concluir o ensino médio e liberar a faculdade e o mercado de trabalho aos 18 anos.
          </p>
          <div className="inline-block bg-gray-950 border border-gray-800 px-3 py-1.5 rounded-xl text-xs text-blue-400 font-medium">
            Inteligência Atual: {intelligence}%
          </div>
        </div>
      ) : (
        <>
          {/* Current Job Status */}
          {job ? (
            <div className="bg-gray-900 border border-emerald-800/60 rounded-2xl p-4 space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    Emprego Atual
                  </span>
                  <h3 className="text-base font-bold text-gray-100 mt-1">{job.title}</h3>
                  <p className="text-xs text-gray-400">{job.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400">${job.salary.toLocaleString()}/ano</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <button
                  onClick={handleWorkHard}
                  className="bg-gray-800 hover:bg-emerald-950/80 hover:border-emerald-600 border border-gray-700 text-gray-200 text-xs py-2 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 font-medium"
                >
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  <span>Trabalhar Duro</span>
                </button>
                <button
                  onClick={handleAskRaise}
                  className="bg-gray-800 hover:bg-emerald-950/80 hover:border-emerald-600 border border-gray-700 text-gray-200 text-xs py-2 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 font-medium"
                >
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>Pedir Aumento</span>
                </button>
                <button
                  onClick={handleQuitJob}
                  className="bg-gray-800 hover:bg-red-950/80 hover:border-red-600 border border-gray-700 text-red-300 text-xs py-2 px-2 rounded-xl transition flex flex-col items-center justify-center gap-1 font-medium"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Demissão</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 text-center">
              <span className="text-xs text-gray-400">Você está desempregado no momento.</span>
            </div>
          )}

          {/* Current University Status */}
          {university && (
            <div className="bg-gray-900 border border-blue-800/60 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-950/80 border border-blue-800/60 px-2 py-0.5 rounded-md">
                  Faculdade em Andamento
                </span>
                <span className="text-xs text-blue-300 font-mono">{university.yearsLeft} ano(s) restante(s)</span>
              </div>
              <h4 className="font-bold text-sm text-gray-100">{university.name}</h4>
              <p className="text-xs text-gray-400">Mensalidade/Anualidade: ${university.costYear.toLocaleString()}/ano</p>
            </div>
          )}

          {/* University Options */}
          {!university && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span>Cursos Universitários</span>
              </h3>
              <div className="space-y-2">
                {UNIVERSITIES.map((uni) => {
                  const meetsIntel = intelligence >= uni.minIntelligence;
                  const alreadyGraduated = (completedDegrees || []).includes(uni.name);

                  return (
                    <div key={uni.id} className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-xs text-gray-200">{uni.name}</div>
                        <div className="text-[11px] text-gray-400">
                          {uni.years} anos • Custo: ${uni.costYear.toLocaleString()}/ano
                        </div>
                        <div className="text-[10px] text-blue-400">Req: Intel {uni.minIntelligence}%</div>
                      </div>
                      {alreadyGraduated ? (
                        <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium bg-emerald-950/60 border border-emerald-800 px-2 py-1 rounded-lg">
                          <CheckCircle className="w-3.5 h-3.5" /> Formado
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApplyUniversity(uni)}
                          disabled={!meetsIntel}
                          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-medium text-xs px-3 py-1.5 rounded-xl transition"
                        >
                          Matricular
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Job Listings Board */}
          {!job && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Vagas de Emprego Disponíveis</span>
              </h3>
              <div className="space-y-2">
                {JOBS.map((j) => {
                  const meetsIntel = intelligence >= j.minIntelligence;
                  const meetsUni = !j.requiresUniversity || (completedDegrees || []).includes(j.universityDegree) || (j.universityDegree === undefined && (completedDegrees || []).length > 0);
                  const canApply = meetsIntel && meetsUni;

                  return (
                    <div key={j.id} className="bg-gray-900 border border-gray-800 p-3 rounded-xl space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-xs text-gray-200">{j.title}</div>
                          <div className="text-[10px] text-gray-400">{j.description}</div>
                        </div>
                        <div className="text-xs font-bold text-emerald-400">${j.salary.toLocaleString()}/ano</div>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <div className="text-gray-400">
                          Req: Intel {j.minIntelligence}% {j.requiresUniversity ? `• Diplomado em ${j.universityDegree || 'Faculdade'}` : ''}
                        </div>
                        <button
                          onClick={() => handleApplyJob(j)}
                          disabled={!canApply}
                          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-medium text-xs px-3 py-1 rounded-lg transition shrink-0"
                        >
                          Candidatar-se
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
