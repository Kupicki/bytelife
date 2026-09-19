import React, { useState } from 'react';
import Header from './components/Header';
import AgeUpButton from './components/AgeUpButton';
import BottomNav from './components/BottomNav';
import ModalEvent from './components/ModalEvent';
import TombstoneModal from './components/TombstoneModal';
import NewLifeModal from './components/NewLifeModal';
import LifeLog from './components/LifeLog';
import OccupationTab from './components/OccupationTab';
import RelationshipsTab from './components/RelationshipsTab';
import ActivitiesTab from './components/ActivitiesTab';
import AssetsTab from './components/AssetsTab';
import { generateCharacter, loadSavedGame, ageUp, handleEventChoice, clearSavedGame } from './utils/gameLogic.js';

export default function App() {
  const [gameState, setGameState] = useState(() => {
    const saved = loadSavedGame();
    return saved || generateCharacter();
  });

  const [activeTab, setActiveTab] = useState('feed');
  const [showNewLifeModal, setShowNewLifeModal] = useState(false);

  const handleAgeUp = () => {
    const updated = ageUp(gameState);
    setGameState(updated);
  };

  const handleEventChoiceSelect = (option) => {
    const updated = handleEventChoice(gameState, option);
    setGameState(updated);
  };

  const handleStartNewLife = () => {
    clearSavedGame();
    const newChar = generateCharacter();
    setGameState(newChar);
    setShowNewLifeModal(false);
    setActiveTab('feed');
  };

  return (
    <div className="w-full min-h-screen bg-gray-950 flex justify-center items-center p-0 md:p-4 text-white font-sans">
      <div className="w-full max-w-[480px] h-screen md:h-[880px] bg-gray-900 border border-gray-800 md:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden relative">

        {/* Header with Stats & Bank Balance */}
        <Header
          gameState={gameState}
          onNewLifeClick={() => setShowNewLifeModal(true)}
        />

        {/* Main Content Feed / Tab View Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-950/40">
          {activeTab === 'feed' && (
            <LifeLog logs={gameState.logs} />
          )}
          {activeTab === 'occupation' && (
            <OccupationTab gameState={gameState} setGameState={setGameState} />
          )}
          {activeTab === 'relationships' && (
            <RelationshipsTab gameState={gameState} setGameState={setGameState} />
          )}
          {activeTab === 'activities' && (
            <ActivitiesTab gameState={gameState} setGameState={setGameState} />
          )}
          {activeTab === 'assets' && (
            <AssetsTab gameState={gameState} setGameState={setGameState} />
          )}
        </div>

        {/* Age Up Button */}
        {!gameState.isDead && (
          <AgeUpButton
            onAgeUp={handleAgeUp}
            disabled={!!gameState.activeEvent}
          />
        )}

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Modal Event Popup */}
        {gameState.activeEvent && (
          <ModalEvent
            event={gameState.activeEvent}
            onOptionSelect={handleEventChoiceSelect}
          />
        )}

        {/* Tombstone / Death Screen */}
        {gameState.isDead && (
          <TombstoneModal
            gameState={gameState}
            onRestart={handleStartNewLife}
          />
        )}

        {/* Confirmation Modal for New Life */}
        <NewLifeModal
          isOpen={showNewLifeModal}
          onClose={() => setShowNewLifeModal(false)}
          onConfirm={handleStartNewLife}
        />
      </div>
    </div>
  );
}
