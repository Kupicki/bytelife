import React, { useState } from 'react';
import { Home, Car, DollarSign, Tag, ShoppingCart, Trash2 } from 'lucide-react';
import { VEHICLES, PROPERTIES } from '../data/assets.js';
import { saveGame, clampStat } from '../utils/gameLogic.js';

export default function AssetsTab({ gameState, setGameState }) {
  const { age, bankBalance, assets, happiness } = gameState;
  const [selectedCategory, setSelectedCategory] = useState('inventory'); // 'inventory', 'vehicles', 'properties'

  const handleBuyAsset = (asset) => {
    if (bankBalance < asset.price) return;
    const instanceId = `${asset.id}_${Date.now()}`;
    const newAsset = { ...asset, instanceId };

    const updatedState = {
      ...gameState,
      bankBalance: bankBalance - asset.price,
      assets: [...assets, newAsset],
      happiness: clampStat(happiness + 15),
      logs: [
        ...gameState.logs,
        { age, text: `Comprei um(a) ${asset.name} por $${asset.price.toLocaleString()}!` }
      ]
    };

    saveGame(updatedState);
    setGameState(updatedState);
  };

  const handleSellAsset = (assetToSell) => {
    const resalePrice = Math.round(assetToSell.price * 0.7); // 70% resale value
    const updatedAssets = assets.filter(a => a.instanceId !== assetToSell.instanceId);

    const updatedState = {
      ...gameState,
      bankBalance: bankBalance + resalePrice,
      assets: updatedAssets,
      happiness: clampStat(happiness - 5),
      logs: [
        ...gameState.logs,
        { age, text: `Vendi meu/minha ${assetToSell.name} por $${resalePrice.toLocaleString()}.` }
      ]
    };

    saveGame(updatedState);
    setGameState(updatedState);
  };

  return (
    <div className="space-y-4 pb-2">
      {/* Category Tabs */}
      <div className="flex border-b border-gray-800 pb-2 gap-2">
        <button
          onClick={() => setSelectedCategory('inventory')}
          className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            selectedCategory === 'inventory'
              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
              : 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-gray-200'
          }`}
        >
          <Home className="w-3.5 h-3.5" /> Meus Bens ({assets.length})
        </button>
        <button
          onClick={() => setSelectedCategory('vehicles')}
          className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            selectedCategory === 'vehicles'
              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
              : 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-gray-200'
          }`}
        >
          <Car className="w-3.5 h-3.5" /> Veículos
        </button>
        <button
          onClick={() => setSelectedCategory('properties')}
          className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            selectedCategory === 'properties'
              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
              : 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-gray-200'
          }`}
        >
          <Home className="w-3.5 h-3.5" /> Imóveis
        </button>
      </div>

      {/* Inventory View */}
      {selectedCategory === 'inventory' && (
        <div className="space-y-2">
          {assets.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center space-y-2">
              <div className="w-10 h-10 bg-gray-800 text-gray-500 rounded-xl flex items-center justify-center mx-auto">
                <Tag className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-400">Você não possui nenhum veículo ou imóvel no momento.</p>
            </div>
          ) : (
            assets.map((item) => (
              <div key={item.instanceId} className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-gray-200">{item.name}</div>
                  <div className="text-[10px] text-gray-400">
                    Manutenção anual: ${item.yearlyMaintenance.toLocaleString()}/ano
                  </div>
                </div>
                <button
                  onClick={() => handleSellAsset(item)}
                  className="bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 font-medium text-[11px] px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Vender (${Math.round(item.price * 0.7).toLocaleString()})
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Vehicles Store */}
      {selectedCategory === 'vehicles' && (
        <div className="space-y-2">
          {VEHICLES.map((v) => (
            <div key={v.id} className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-xs text-gray-200">{v.name}</div>
                <div className="text-[10px] text-gray-400">{v.description}</div>
                <div className="text-[10px] text-amber-400 mt-0.5">Manutenção: ${v.yearlyMaintenance.toLocaleString()}/ano</div>
              </div>
              <button
                onClick={() => handleBuyAsset(v)}
                disabled={bankBalance < v.price}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-medium text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> Comprar (${v.price.toLocaleString()})
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Properties Store */}
      {selectedCategory === 'properties' && (
        <div className="space-y-2">
          {PROPERTIES.map((p) => (
            <div key={p.id} className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-xs text-gray-200">{p.name}</div>
                <div className="text-[10px] text-gray-400">{p.description}</div>
                <div className="text-[10px] text-amber-400 mt-0.5">Condomínio/IPTU: ${p.yearlyMaintenance.toLocaleString()}/ano</div>
              </div>
              <button
                onClick={() => handleBuyAsset(p)}
                disabled={bankBalance < p.price}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-medium text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> Comprar (${p.price.toLocaleString()})
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
