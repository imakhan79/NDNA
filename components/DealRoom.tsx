import React, { useState, useEffect, useRef } from 'react';
import { Deal, DealStage, User, ChatMessage } from '../types';
import { Send, Paperclip, CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';

interface DealRoomProps {
  deal: Deal;
  currentUser: User;
  onBack: () => void;
}

const DealRoom: React.FC<DealRoomProps> = ({ deal, currentUser, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'm1', senderId: 'u2', senderName: 'Copper Ridge', content: 'We have uploaded the latest assay report.', timestamp: '10:00 AM' },
    { id: 'm2', senderId: 'u1', senderName: 'Global Tech', content: 'Received. Reviewing now.', timestamp: '10:05 AM' },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  const stages = [
    { name: DealStage.NEGOTIATION, status: 'complete' },
    { name: DealStage.SPA_SIGNED, status: 'current' },
    { name: DealStage.LC_OPENED, status: 'pending' },
    { name: DealStage.LOGISTICS, status: 'pending' },
    { name: DealStage.COMPLETED, status: 'pending' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)]">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-900">&larr; Back to Deals</button>
        <h2 className="text-xl font-bold text-slate-900">{deal.mineName} - Deal Room</h2>
        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase tracking-wide">
          {deal.stage}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
        {/* Left: Chat Area */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Secure Comm Channel</h3>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Encrypted
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${
                    isMe ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}>
                    {!isMe && <p className="text-[10px] font-bold text-slate-500 mb-1">{msg.senderName}</p>}
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-emerald-100' : 'text-slate-400'}`}>{msg.timestamp}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..." 
              className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Right: Deal Info & Actions */}
        <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto">
          {/* Progress */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Milestones</h3>
            <div className="space-y-4">
              {stages.map((s, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`mt-0.5 ${
                    s.status === 'complete' ? 'text-emerald-500' : 
                    s.status === 'current' ? 'text-blue-500' : 'text-slate-300'
                  }`}>
                    {s.status === 'complete' ? <CheckCircle size={18} /> : 
                     s.status === 'current' ? <Clock size={18} /> : <div className="w-4 h-4 rounded-full border-2 border-slate-200" />}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${s.status === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>{s.name}</p>
                    {s.status === 'current' && <p className="text-xs text-blue-600 mt-0.5">In Progress</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider flex justify-between">
              Shared Docs
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded border border-slate-100 hover:bg-slate-100 cursor-pointer transition-colors">
                <FileText size={20} className="text-red-500" />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-slate-700 truncate">Draft_SPA_v2.pdf</p>
                  <p className="text-xs text-slate-500">2.4 MB • Today</p>
                </div>
              </div>
               <div className="flex items-center gap-3 p-2 bg-slate-50 rounded border border-slate-100 hover:bg-slate-100 cursor-pointer transition-colors">
                <FileText size={20} className="text-blue-500" />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-slate-700 truncate">Assay_Report_Final.pdf</p>
                  <p className="text-xs text-slate-500">5.1 MB • Yesterday</p>
                </div>
              </div>
            </div>
             <button className="w-full mt-3 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 rounded hover:bg-emerald-100">
                Upload New Document
              </button>
          </div>
          
           {/* Actions */}
           <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-3 text-sm">Action Required</h3>
             <div className="p-3 bg-amber-50 border border-amber-100 rounded text-amber-800 text-xs flex gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <p>Seller waiting for Proof of Funds (POF) verification.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DealRoom;
