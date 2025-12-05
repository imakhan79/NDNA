import React from 'react';
import { Mine } from '../types';
import { MapPin, Zap, Filter } from 'lucide-react';

interface MineListProps {
  mines: Mine[];
  onSelect: (mine: Mine) => void;
}

const MineList: React.FC<MineListProps> = ({ mines, onSelect }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Marketplace</h2>
          <p className="text-slate-500">Verified commodities available for immediate contract.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search commodity, country..." 
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm w-full md:w-64 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mines.map((mine) => (
          <div key={mine.id} className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={mine.imageUrl} 
                alt={mine.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 shadow-sm">
                {mine.status}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900 mb-1">{mine.name}</h3>
              <div className="flex items-center text-slate-500 text-sm mb-4">
                <MapPin size={14} className="mr-1" /> {mine.country}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 p-2 rounded">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Commodity</p>
                  <p className="text-sm font-semibold text-slate-800">{mine.commodity}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Capacity</p>
                  <p className="text-sm font-semibold text-slate-800">{mine.capacity}</p>
                </div>
              </div>

              <button 
                onClick={() => onSelect(mine)}
                className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
              >
                View Details <Zap size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MineList;
