import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { MOCK_USERS } from '../constants';
import { ArrowRight, CheckCircle, ShieldCheck, Globe } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.BUYER);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (view === 'login') {
        const mockUser = MOCK_USERS.find(u => u.email === email) || {
          id: 'temp',
          name: 'Demo User',
          email: email,
          role: UserRole.BUYER,
          verified: true
        };
        onLogin(mockUser);
      } else {
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          role: selectedRole,
          verified: false,
          companyName: 'New Company Ltd'
        };
        onLogin(newUser);
      }
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: UserRole) => {
     const user = MOCK_USERS.find(u => u.role === role);
     if (user) onLogin(user);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row gap-12 items-center justify-center max-w-5xl">
        
        {/* Left Side: Brand & Value Prop */}
        <div className="hidden md:block w-1/2 space-y-6 animate-slide-up">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-white/50 text-emerald-800 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <Globe size={14} /> Global Commodity Network
           </div>
           <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
             Secure Trading <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
               Reimagined.
             </span>
           </h1>
           <p className="text-lg text-slate-600 max-w-md">
             Connect directly with verified mines, manage deals with AI-powered compliance, and ensure secure payouts via blockchain-ready escrow.
           </p>
           
           <div className="space-y-3 pt-4">
             {['AI-Powered Document Verification', 'Real-time Deal Rooms', 'Automated Commission Splits'].map((feat, i) => (
               <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                 <CheckCircle className="text-emerald-500" size={20} />
                 {feat}
               </div>
             ))}
           </div>
        </div>

        {/* Right Side: Auth Card */}
        <div className="w-full md:w-[420px] glass rounded-3xl shadow-2xl p-8 animate-slide-up delay-100">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4 transform rotate-3 hover:rotate-6 transition-transform">
              <span className="text-2xl font-bold text-white">N</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{view === 'login' ? 'Welcome Back' : 'Join NDNA'}</h2>
            <p className="text-slate-500 text-sm mt-2">Enter your credentials to access the platform.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === 'register' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Account Role</label>
                  <select 
                    value={selectedRole}
                    onChange={e => setSelectedRole(e.target.value as UserRole)}
                    className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all appearance-none"
                  >
                    <option value={UserRole.BUYER}>Buyer (Purchaser)</option>
                    <option value={UserRole.SELLER}>Seller (Mine Owner)</option>
                    <option value={UserRole.INTERMEDIARY}>Intermediary (Broker)</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Password</label>
               <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                 <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  {view === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setView(view === 'login' ? 'register' : 'login')}
              className="text-sm text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
              {view === 'login' ? "New here? Create an account" : "Already a member? Sign in"}
            </button>
          </div>

          {/* Quick Login for Demo */}
          <div className="mt-8 pt-6 border-t border-slate-200/60">
             <div className="flex items-center justify-between mb-3">
               <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Demo Access</p>
               <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">One-click login</span>
             </div>
             <div className="grid grid-cols-4 gap-2">
               {[
                 { role: UserRole.BUYER, label: 'Buyer', color: 'blue' },
                 { role: UserRole.SELLER, label: 'Seller', color: 'emerald' },
                 { role: UserRole.INTERMEDIARY, label: 'Broker', color: 'purple' },
                 { role: UserRole.ADMIN, label: 'Admin', color: 'rose' }
               ].map((btn) => (
                 <button 
                   key={btn.role}
                   onClick={() => handleDemoLogin(btn.role)} 
                   className={`text-[10px] font-bold py-2 rounded-lg transition-colors border bg-${btn.color}-50 text-${btn.color}-700 border-${btn.color}-100 hover:bg-${btn.color}-100`}
                 >
                   {btn.label}
                 </button>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;