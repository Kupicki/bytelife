import React, { useState } from 'react';
import { Users, Heart, MessageSquare, ThumbsUp, Smile, DollarSign, UserPlus, HeartOff } from 'lucide-react';
import { saveGame, clampStat, getRandomChoice, getRandomInt } from '../utils/gameLogic.js';
import { MALE_NAMES, FEMALE_NAMES, SURNAMES } from '../data/names.js';

export default function RelationshipsTab({ gameState, setGameState }) {
  const { age, relationships, happiness, bankBalance } = gameState;
  const [selectedPerson, setSelectedPerson] = useState(null);

  const updateRelationship = (id, relChange, logMsg, moneyChange = 0) => {
    const updatedRelationships = relationships.map(p => {
      if (p.id === id) {
        return { ...p, relationship: clampStat(p.relationship + relChange) };
      }
      return p;
    });

    const updatedState = {
      ...gameState,
      relationships: updatedRelationships,
      bankBalance: bankBalance + moneyChange,
      happiness: clampStat(happiness + (relChange > 0 ? 3 : -3)),
      logs: [
        ...gameState.logs,
        { age, text: logMsg }
      ]
    };

    saveGame(updatedState);
    setGameState(updatedState);
  };

  const handleTalk = (person) => {
    updateRelationship(person.id, 8, `Conversei com ${person.name} sobre a vida e nos aproximamos.`);
  };

  const handleCompliment = (person) => {
    updateRelationship(person.id, 10, `Elogiei ${person.name} e deixei o dia dele(a) mais alegre!`);
  };

  const handleSpendTime = (person) => {
    updateRelationship(person.id, 12, `Passei um tempo de qualidade com ${person.name}.`);
  };

  const handleAskMoney = (person) => {
    if (person.relationship > 60) {
      const amount = getRandomInt(50, 300);
      updateRelationship(person.id, -5, `${person.name} me deu $${amount} de presente!`, amount);
    } else {
      updateRelationship(person.id, -12, `Pedi dinheiro emprestado para ${person.name}, mas me foi negado.`);
    }
  };

  const handleFindLove = () => {
    if (age < 16) return;
    const partnerGender = gameState.gender === 'Masculino' ? 'Feminino' : 'Masculino';
    const names = partnerGender === 'Masculino' ? MALE_NAMES : FEMALE_NAMES;
    const pName = `${getRandomChoice(names)} ${getRandomChoice(SURNAMES)}`;
    const newPartner = {
      id: `partner_${Date.now()}`,
      relation: 'Namorado(a)',
      name: pName,
      age: age + getRandomInt(-2, 2),
      relationship: getRandomInt(65, 90),
      alive: true
    };

    const updatedState = {
      ...gameState,
      relationships: [...relationships, newPartner],
      happiness: clampStat(happiness + 20),
      logs: [
        ...gameState.logs,
        { age, text: `Conheci ${pName} e começamos a namorar!` }
      ]
    };

    saveGame(updatedState);
    setGameState(updatedState);
  };

  const handleMarry = (person) => {
    if (person.relationship < 70) return;
    const updatedRels = relationships.map(p => {
      if (p.id === person.id) {
        return { ...p, relation: 'Cônjuge', relationship: Math.min(100, p.relationship + 15) };
      }
      return p;
    });

    const updatedState = {
      ...gameState,
      relationships: updatedRels,
      happiness: clampStat(happiness + 25),
      logs: [
        ...gameState.logs,
        { age, text: `Me casei em uma linda cerimônia com ${person.name}!` }
      ]
    };

    saveGame(updatedState);
    setGameState(updatedState);
  };

  const handleBreakup = (person) => {
    const updatedRels = relationships.filter(p => p.id !== person.id);
    const updatedState = {
      ...gameState,
      relationships: updatedRels,
      happiness: clampStat(happiness - 20),
      logs: [
        ...gameState.logs,
        { age, text: `Terminei meu relacionamento com ${person.name}.` }
      ]
    };

    saveGame(updatedState);
    setGameState(updatedState);
    setSelectedPerson(null);
  };

  const hasPartner = relationships.some(p => p.relation === 'Namorado(a)' || p.relation === 'Cônjuge');

  return (
    <div className="space-y-4 pb-2">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
        <Users className="w-4 h-4 text-emerald-400" />
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Relacionamentos</h2>
      </div>

      {/* Find Partner Button (16+ years) */}
      {age >= 16 && !hasPartner && (
        <button
          onClick={handleFindLove}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Procurar um Amor</span>
        </button>
      )}

      {/* Relatives & Partners List */}
      <div className="space-y-2">
        {relationships.map((person) => {
          const isSelected = selectedPerson?.id === person.id;
          const isPartner = person.relation === 'Namorado(a)' || person.relation === 'Cônjuge';

          return (
            <div key={person.id} className="bg-gray-900 border border-gray-800 rounded-xl p-3 space-y-2 transition">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setSelectedPerson(isSelected ? null : person)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-200">{person.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${
                      isPartner ? 'bg-pink-950 text-pink-400 border-pink-800' : 'bg-gray-800 text-gray-400 border-gray-700'
                    }`}>
                      {person.relation}
                    </span>
                    {!person.alive && (
                      <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.5 rounded-md">
                        Falecido
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{person.age} anos</div>
                </div>

                {person.alive && (
                  <div className="text-right">
                    <div className="text-[10px] text-gray-400">Afeição</div>
                    <div className="text-xs font-bold text-emerald-400">{person.relationship}%</div>
                  </div>
                )}
              </div>

              {/* Relationship Bar */}
              {person.alive && (
                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isPartner ? 'bg-pink-500' : 'bg-emerald-500'}`}
                    style={{ width: `${person.relationship}%` }}
                  />
                </div>
              )}

              {/* Action Buttons Drawer */}
              {isSelected && person.alive && (
                <div className="pt-2 border-t border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleTalk(person)}
                    className="bg-gray-800 hover:bg-emerald-950/80 hover:border-emerald-700 border border-gray-700 text-gray-200 text-[11px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> Conversar
                  </button>
                  <button
                    onClick={() => handleCompliment(person)}
                    className="bg-gray-800 hover:bg-emerald-950/80 hover:border-emerald-700 border border-gray-700 text-gray-200 text-[11px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-amber-400" /> Elogiar
                  </button>
                  <button
                    onClick={() => handleSpendTime(person)}
                    className="bg-gray-800 hover:bg-emerald-950/80 hover:border-emerald-700 border border-gray-700 text-gray-200 text-[11px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1"
                  >
                    <Smile className="w-3.5 h-3.5 text-emerald-400" /> Passar Tempo
                  </button>
                  <button
                    onClick={() => handleAskMoney(person)}
                    className="bg-gray-800 hover:bg-emerald-950/80 hover:border-emerald-700 border border-gray-700 text-gray-200 text-[11px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Pedir Grana
                  </button>

                  {/* Partner actions: Marriage / Breakup */}
                  {isPartner && (
                    <>
                      {person.relation === 'Namorado(a)' && age >= 18 && (
                        <button
                          onClick={() => handleMarry(person)}
                          className="col-span-2 bg-pink-900/60 hover:bg-pink-800 border border-pink-700 text-pink-200 text-[11px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1"
                        >
                          <Heart className="w-3.5 h-3.5 text-pink-400" /> Casar-se
                        </button>
                      )}
                      <button
                        onClick={() => handleBreakup(person)}
                        className="col-span-2 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-[11px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1"
                      >
                        <HeartOff className="w-3.5 h-3.5 text-red-400" /> Terminar
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
