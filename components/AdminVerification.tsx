import React, { useState } from 'react';
import { analyzeDocumentForFraud } from '../services/geminiService';
import { Shield, Check, X, Loader2, FileText, AlertTriangle, Zap } from 'lucide-react';

const AdminVerification: React.FC = () => {
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [docs, setDocs] = useState([
    { id: 'doc1', user: 'Copper Ridge', type: 'Mining License', name: 'license_scan_2024.pdf', status: 'Pending', aiReason: '' },
    { id: 'doc2', user: 'Global Tech', type: 'Proof of Funds', name: 'bcl_bank_letter.pdf', status: 'Pending', aiReason: '' },
  ]);

  const handleAIAnalysis = async (id: string, name: string, type: string) => {
    setAnalyzingId(id);
    
    // Simulate content extraction (mocking OCR result)
    let mockContent = "This document confirms the mining rights for Copper Ridge in region Katanga. Valid until 2025.";
    if (name.includes('bcl')) {
        // Simulating a suspicious doc
        mockContent = "Bank Comfort Letter. Expiry date mismatch detected in metadata. Account holder mismatch.";
    }

    try {
      const result = await analyzeDocumentForFraud(name, type, mockContent);
      setDocs(prev => prev.map(d => 
        d.id === id ? { ...d, status: result.status === 'Approved' ? 'AI Approved' : 'AI Flagged', aiReason: result.reason } : d
      ));
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleManualAction = (id: string, action: 'Approved' | 'Rejected') => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: action, aiReason: 'Manually ' + action } : d));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Shield className="text-emerald-500" /> Document Verification Queue
          </h2>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
            {docs.filter(d => d.status === 'Pending').length} Pending
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {docs.map((doc) => (
            <div key={doc.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-100 rounded-lg text-slate-500">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{doc.type}</h3>
                    <p className="text-sm text-slate-500">{doc.name}</p>
                    <p className="text-xs text-slate-400 mt-1">Uploaded by: <span className="text-slate-600 font-medium">{doc.user}</span></p>
                    
                    {doc.status !== 'Pending' && (
                      <div className={`mt-2 text-xs p-2 rounded border inline-block ${
                        doc.status.includes('Approved') ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 
                        doc.status.includes('Flagged') || doc.status === 'Rejected' ? 'bg-red-50 border-red-100 text-red-700' : ''
                      }`}>
                        <strong>Status: {doc.status}</strong> 
                        {doc.aiReason && <span className="block mt-1 opacity-90">{doc.aiReason}</span>}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[140px]">
                  {doc.status === 'Pending' && (
                    <button 
                      onClick={() => handleAIAnalysis(doc.id, doc.name, doc.type)}
                      disabled={analyzingId === doc.id}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {analyzingId === doc.id ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
                      AI Scan
                    </button>
                  )}
                  
                  {doc.status.includes('AI') && doc.status !== 'Approved' && doc.status !== 'Rejected' && (
                    <div className="flex gap-2">
                       <button 
                        onClick={() => handleManualAction(doc.id, 'Approved')}
                        className="flex-1 px-3 py-2 bg-emerald-100 text-emerald-700 rounded text-xs font-bold hover:bg-emerald-200"
                       >
                         Approve
                       </button>
                       <button 
                        onClick={() => handleManualAction(doc.id, 'Rejected')}
                        className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded text-xs font-bold hover:bg-red-200"
                       >
                         Reject
                       </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminVerification;