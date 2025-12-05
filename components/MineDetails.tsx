import React, { useState } from 'react';
import { Mine } from '../types';
import { MapPin, FileText, Package, ArrowLeft, ShieldCheck, Download, Mail } from 'lucide-react';

interface MineDetailsProps {
  mine: Mine;
  onBack: () => void;
  onRequestDeal: (mine: Mine) => void;
}

const MineDetails: React.FC<MineDetailsProps> = ({ mine, onBack, onRequestDeal }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'docs'>('overview');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Image & Actions */}
        <div className="relative h-64 md:h-80">
            <img src={mine.imageUrl} alt={mine.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
                <button onClick={onBack} className="bg-white/90 backdrop-blur p-2 rounded-full text-slate-700 hover:bg-white transition-colors shadow-sm">
                    <ArrowLeft size={20} />
                </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h1 className="text-3xl font-bold text-white">{mine.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-200">
                    <span className="flex items-center gap-1"><MapPin size={16}/> {mine.country}</span>
                    <span className="flex items-center gap-1"><Package size={16}/> {mine.commodity}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${mine.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                        {mine.status}
                    </span>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 px-6 flex gap-8">
            {['overview', 'specs', 'docs'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors capitalize ${
                        activeTab === tab 
                        ? 'border-emerald-500 text-emerald-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                >
                    {tab === 'specs' ? 'Specifications' : tab === 'docs' ? 'Documents' : tab}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">About this Mine</h3>
                        <p className="text-slate-600 leading-relaxed">
                            This facility is a premier source of high-grade {mine.commodity.toLowerCase()} located in the heart of {mine.country}'s mineral belt. 
                            Fully operational and verified, it boasts a consistent monthly output capacity of {mine.capacity}.
                            The site adheres to international safety and environmental standards.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                                <ShieldCheck size={16} className="text-emerald-500"/> Verification Status
                            </h4>
                            <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex justify-between"><span>Site Visit:</span> <span className="text-emerald-600 font-medium">Verified (Jan 2024)</span></div>
                                <div className="flex justify-between"><span>Legal Title:</span> <span className="text-emerald-600 font-medium">Verified</span></div>
                                <div className="flex justify-between"><span>Environmental Permit:</span> <span className="text-emerald-600 font-medium">Active</span></div>
                            </div>
                         </div>
                         
                         <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <h4 className="text-sm font-bold text-slate-800 mb-3">Owner Information</h4>
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                    {mine.ownerId === 'u2' ? 'CR' : 'LV'}
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">{mine.ownerId === 'u2' ? 'Copper Ridge Mining' : 'Lithium Valley Ltd'}</p>
                                    <p className="text-xs text-slate-500">Member since 2021</p>
                                </div>
                             </div>
                             <button className="mt-3 w-full py-2 border border-slate-300 rounded text-sm font-medium hover:bg-white text-slate-700 transition-colors">
                                View Profile
                             </button>
                         </div>
                    </div>
                </div>
            )}

            {activeTab === 'specs' && (
                <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-4">Product Specifications</h3>
                     <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <tbody className="divide-y divide-slate-200">
                                <tr className="bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-600 w-1/3">Commodity Type</td>
                                    <td className="px-4 py-3 text-slate-900">{mine.commodity}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium text-slate-600">Origin</td>
                                    <td className="px-4 py-3 text-slate-900">{mine.country}</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-600">Purity / Grade</td>
                                    <td className="px-4 py-3 text-slate-900">99.9% Electrowon Cathodes (LME Grade A)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium text-slate-600">Monthly Capacity</td>
                                    <td className="px-4 py-3 text-slate-900">{mine.capacity}</td>
                                </tr>
                                <tr className="bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-600">Minimum Order Quantity</td>
                                    <td className="px-4 py-3 text-slate-900">500 MT</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium text-slate-600">Incoterms</td>
                                    <td className="px-4 py-3 text-slate-900">FOB (Dar es Salaam), CIF (Available)</td>
                                </tr>
                            </tbody>
                        </table>
                     </div>
                </div>
            )}

            {activeTab === 'docs' && (
                <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-4">Compliance Documents</h3>
                     <div className="space-y-3">
                        {[
                            { name: 'Mining_License_2024.pdf', type: 'License', size: '2.4 MB' },
                            { name: 'Export_Permit_Q1.pdf', type: 'Permit', size: '1.1 MB' },
                            { name: 'Lab_Analysis_Report.pdf', type: 'Report', size: '5.6 MB' },
                            { name: 'Environmental_Impact_Assessment.pdf', type: 'Compliance', size: '8.2 MB' }
                        ].map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded text-slate-500">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">{doc.name}</p>
                                        <p className="text-xs text-slate-500">{doc.type} • {doc.size}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full">
                                    <Download size={20} />
                                </button>
                            </div>
                        ))}
                     </div>
                </div>
            )}
        </div>

        {/* Footer Action */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button 
                onClick={() => onRequestDeal(mine)}
                className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors shadow-lg flex items-center gap-2"
            >
                <Mail size={18} /> Request Deal / Offer
            </button>
        </div>
    </div>
  );
};

export default MineDetails;