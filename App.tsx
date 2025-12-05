import React, { useState } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import MineList from './components/MineList';
import DealRoom from './components/DealRoom';
import AdminVerification from './components/AdminVerification';
import { User, Deal, Mine, UserRole } from './types';
import { MOCK_DEALS, MOCK_MINES, MOCK_NOTIFICATIONS } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  // Authentication Handler
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
    setActiveDeal(null);
  };

  // Navigation Handler
  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
    if (viewId !== 'deal-room') {
      setActiveDeal(null);
    }
  };

  // Marketplace selection
  const handleSelectMine = (mine: Mine) => {
    // In a real app, this would create a new deal or show mine details
    // For demo, we just simulate navigating to a deal view associated with this mine if it exists,
    // or show an alert
    alert(`Selected ${mine.name}. In a full app, this opens the Mine Detail View.`);
  };

  // Select a deal to open deal room
  const handleSelectDeal = (deal: Deal) => {
    setActiveDeal(deal);
    setCurrentView('deal-room');
  };

  // View Routing Logic
  const renderContent = () => {
    if (!currentUser) return <Auth onLogin={handleLogin} />;

    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={currentUser} deals={MOCK_DEALS} />;
      
      case 'marketplace': // For Buyers
      case 'my-mines':    // For Sellers (reused component for demo simplicity)
        return <MineList mines={MOCK_MINES} onSelect={handleSelectMine} />;

      case 'active-deals': // For Buyers
      case 'offers':       // For Sellers
      case 'all-deals':    // For Admin
        return (
          <div className="space-y-4">
             <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {currentView === 'offers' ? 'Incoming Offers' : 'Active Deals'}
            </h2>
            {MOCK_DEALS.map(deal => (
              <div key={deal.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center hover:shadow-md transition-shadow">
                 <div>
                   <h3 className="font-bold text-slate-900">{deal.mineName}</h3>
                   <p className="text-sm text-slate-500">{deal.commodity} • {deal.value.toLocaleString()} USD</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">{deal.stage}</span>
                    <button 
                      onClick={() => handleSelectDeal(deal)}
                      className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Enter Room
                    </button>
                 </div>
              </div>
            ))}
          </div>
        );

      case 'deal-room':
        if (!activeDeal) return <div>No deal selected</div>;
        return <DealRoom deal={activeDeal} currentUser={currentUser} onBack={() => handleNavigate('active-deals')} />;

      case 'verification': // Admin only
        return <AdminVerification />;

      case 'commissions': // Intermediary
        return (
            <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h2 className="text-xl font-bold mb-4">Commission Management</h2>
                <p className="text-slate-500">Feature placeholder: Add splits and view payout history.</p>
            </div>
        );

      case 'settings':
        return (
          <div className="max-w-2xl bg-white p-8 rounded-xl border border-slate-200">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700">Display Name</label>
                 <input type="text" value={currentUser.name} disabled className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md text-slate-500" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700">Email</label>
                 <input type="text" value={currentUser.email} disabled className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md text-slate-500" />
               </div>
               <div className="pt-4 border-t border-slate-100">
                  <h3 className="font-medium text-slate-900 mb-2">Security</h3>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-slate-600">Two-Factor Authentication</span>
                    <button className="text-emerald-600 font-medium text-sm">Enable</button>
                  </div>
               </div>
            </div>
          </div>
        );

      default:
        return <div>View not found: {currentView}</div>;
    }
  };

  return (
    <Layout 
      user={currentUser} 
      activeTab={currentView} 
      onNavigate={handleNavigate} 
      onLogout={handleLogout}
      notifications={MOCK_NOTIFICATIONS}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
