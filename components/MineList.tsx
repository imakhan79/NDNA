import React, { useState, useMemo } from 'react';
import { Mine } from '../types';
import { MapPin, Zap, Filter, Search } from 'lucide-react';

interface MineListProps {
  mines: Mine[];
  onSelect: (mine: Mine) => void;
}

const MineList: React.FC<MineListProps> = ({ mines, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCommodity, setFilterCommodity] = useState('');

  // Extract unique commodities for filter dropdown
  const commodities = Array.from(new Set(mines.map(m => m.commodity)));

  const filteredMines = useMemo(() => {
    return mines.filter(mine => {
        const matchesSearch = 
            mine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            mine.country.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterCommodity ? mine.commodity === filterCommodity : true;
        return matchesSearch && matchesFilter;
    });
  }, [mines, searchTerm, filterCommodity]);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Marketplace</h2>
          <p className="text-slate-500 mt-2">Verified commodities available for immediate contract.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
           {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search mine, country..." 
              className="pl-10 pr-4 py-2 bg-transparent text-sm w-full sm:w-64 focus:outline-none placeholder:text-slate-400 text-slate-700"
            />
          </div>

          <div className="w-px bg-slate-200 hidden sm:block"></div>

          {/* Commodity Filter */}
          <select 
             value={filterCommodity}
             onChange={(e) => setFilterCommodity(e.target.value)}
             className="px-4 py-2 bg-transparent text-sm text-slate-600 focus:outline-none cursor-pointer hover:text-slate-900"
          >
             <option value="">All Commodities</option>
             {commodities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {filteredMines.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed animate-slide-up">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="text-slate-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No mines found</h3>
              <p className="text-slate-500 mt-1 mb-6">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => { setSearchTerm(''); setFilterCommodity(''); }}
                className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Clear All Filters
              </button>
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMines.map((mine, index) => (
            <div 
                key={mine.id} 
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-500/30 overflow-hidden transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className="h-56 overflow-hidden relative">
                    <img 
                        src={mine.imageUrl} 
                        alt={mine.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${mine.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        {mine.status}
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{mine.name}</h3>
                    </div>
                    
                    <div className="flex items-center text-slate-500 text-sm mb-6">
                        <MapPin size={16} className="mr-1.5 text-emerald-500" /> {mine.country}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center group-hover:bg-emerald-50/50 group-hover:border-emerald-100 transition-colors">
                            <p className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Commodity</p>
                            <p className="text-sm font-bold text-slate-900 mt-0.5">{mine.commodity}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center group-hover:bg-emerald-50/50 group-hover:border-emerald-100 transition-colors">
                            <p className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Capacity</p>
                            <p className="text-sm font-bold text-slate-900 mt-0.5">{mine.capacity}</p>
                        </div>
                    </div>

                    <button 
                        onClick={() => onSelect(mine)}
                        className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 shadow-lg shadow-slate-900/10 hover:shadow-emerald-900/20 transition-all transform group-hover:translate-y-[-2px] flex items-center justify-center gap-2"
                    >
                        View Details <Zap size={16} className="fill-current" />
                    </button>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MineList;