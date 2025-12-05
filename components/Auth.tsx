import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { MOCK_USERS } from '../constants';

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
    
    // Simulate network delay
    setTimeout(() => {
      if (view === 'login') {
        // Quick hack to login as different roles for the demo based on email prefix
        // In a real app, this hits an API
        const mockUser = MOCK_USERS.find(u => u.email === email) || {
          id: 'temp',
          name: 'Demo User',
          email: email,
          role: UserRole.BUYER, // Default
          verified: true
        };
        onLogin(mockUser);
      } else {
        // Register flow
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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl mx-auto flex items-center justify-center font-bold text-white text-2xl mb-4">N</div>
          <h1 className="text-2xl font-bold text-slate-900">NDNA Platform</h1>
          <p className="text-slate-500 text-sm mt-2">Secure Commodity Trading & Commission Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Account Role</label>
                <select 
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value as UserRole)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value={UserRole.BUYER}>Buyer (Purchaser)</option>
                  <option value={UserRole.SELLER}>Seller (Mine Owner)</option>
                  <option value={UserRole.INTERMEDIARY}>Intermediary (Broker)</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
             <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-colors disabled:opacity-70"
          >
            {loading ? 'Processing...' : (view === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button 
            onClick={() => setView(view === 'login' ? 'register' : 'login')}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {view === 'login' ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>

        {/* Quick Login for Demo Purposes */}
        <div className="mt-8 pt-6 border-t border-slate-100">
           <p className="text-xs text-center text-slate-400 mb-3 uppercase tracking-wider">Demo Quick Access</p>
           <div className="grid grid-cols-4 gap-2">
             <button onClick={() => handleDemoLogin(UserRole.BUYER)} className="text-[10px] bg-blue-50 text-blue-700 py-1 px-1 rounded hover:bg-blue-100">Buyer</button>
             <button onClick={() => handleDemoLogin(UserRole.SELLER)} className="text-[10px] bg-green-50 text-green-700 py-1 px-1 rounded hover:bg-green-100">Seller</button>
             <button onClick={() => handleDemoLogin(UserRole.INTERMEDIARY)} className="text-[10px] bg-purple-50 text-purple-700 py-1 px-1 rounded hover:bg-purple-100">Broker</button>
             <button onClick={() => handleDemoLogin(UserRole.ADMIN)} className="text-[10px] bg-red-50 text-red-700 py-1 px-1 rounded hover:bg-red-100">Admin</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
