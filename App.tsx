import React, { useState } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import MineList from './components/MineList';
import MineDetails from './components/MineDetails';
import DealRoom from './components/DealRoom';
import AdminVerification from './components/AdminVerification';
import WorkflowGuide from './components/WorkflowGuide';
import { User, Deal, Mine, UserRole, DealStage } from './types';
import { MOCK_DEALS, MOCK_MINES, MOCK_NOTIFICATIONS } from './constants';
import { FileText } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [selectedMine, setSelectedMine] = useState<Mine | null>(null);
  const [userDeals, setUserDeals] = useState<Deal[]>(MOCK_DEALS);

  // Authentication Handler
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
    setActiveDeal(null);
    setSelectedMine(null);
  };

  // Navigation Handler
  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
    if (viewId !== 'deal-room') {
      setActiveDeal(null);
    }
    if (viewId !== 'mine-details') {
      setSelectedMine(null);
    }
  };

  // Marketplace selection
  const handleSelectMine = (mine: Mine) => {
    setSelectedMine(mine);
    setCurrentView('mine-details');
  };

  // Create a new deal from marketplace
  const handleRequestDeal = (mine: Mine) => {
    if (!currentUser) return;

    // Check if deal already exists for this mine/user combo (mock logic)
    const existingDeal = userDeals.find(d => d.mineId === mine.id && d.buyerId === currentUser.id);
    if (existingDeal) {
      setActiveDeal(existingDeal);
      setCurrentView('deal-room');
      return;
    }

    // Create new mock deal
    const newDeal: Deal = {
      id: `d${Date.now()}`,
      mineId: mine.id,
      mineName: mine.name,
      buyerId: currentUser.id,
      sellerId: mine.ownerId,
      value: 0, // TBD in negotiation
      stage: DealStage.NEGOTIATION,
      commodity: mine.commodity,
      quantity: mine.capacity,
      lastActivity: 'Just now'
    };
    
    setUserDeals([newDeal, ...userDeals]);
    setActiveDeal(newDeal);
    setCurrentView('deal-room');
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
        return <Dashboard user={currentUser} deals={userDeals} />;
      
      case 'workflow':
        return <WorkflowGuide onNavigate={handleNavigate} />;

      case 'marketplace': // For Buyers
      case 'my-mines':    // For Sellers (reused component for demo simplicity)
        return <MineList mines={MOCK_MINES} onSelect={handleSelectMine} />;

      case 'mine-details':
        if (!selectedMine) return <div>No mine selected</div>;
        return (
          <MineDetails 
            mine={selectedMine} 
            onBack={() => handleNavigate('marketplace')} 
            onRequestDeal={handleRequestDeal}
          />
        );

      case 'active-deals': // For Buyers
      case 'offers':       // For Sellers
      case 'all-deals':    // For Admin
        // Logic to filter deals based on user role for a realistic workflow
        const filteredDeals = userDeals.filter(deal => {
            if (currentUser.role === UserRole.ADMIN) return true;
            if (currentUser.role === UserRole.BUYER) return deal.buyerId === currentUser.id;
            if (currentUser.role === UserRole.SELLER) return deal.sellerId === currentUser.id;
            return true;
        });

        return (
          <div className="space-y-4">
             <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {currentView === 'offers' ? 'Incoming Offers' : 'Active Deals'}
            </h2>
            {filteredDeals.length === 0 ? (
               <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                 <div className="text-slate-300 mb-3">
                    <FileText size={48} className="mx-auto"/>
                 </div>
                 <h3 className="text-lg font-medium text-slate-900">No active deals</h3>
                 <p className="text-slate-500 mb-4">You haven't initiated any transactions yet.</p>
                 {currentUser.role === UserRole.BUYER && (
                    <button 
                        onClick={() => handleNavigate('marketplace')}
                        className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700"
                    >
                        Browse Marketplace
                    </button>
                 )}
               </div>
            ) : (
              filteredDeals.map(deal => (
              <div key={deal.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-md transition-shadow">
                 <div>
                   <h3 className="font-bold text-slate-900">{deal.mineName}</h3>
                   <p className="text-sm text-slate-500">{deal.commodity} • {deal.value > 0 ? `${deal.value.toLocaleString()} USD` : 'TBD'}</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        deal.stage === DealStage.COMPLETED ? 'bg-emerald-100 text-emerald-700' :
                        deal.stage === DealStage.NEGOTIATION ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                    }`}>
                        {deal.stage}
                    </span>
                    <button 
                      onClick={() => handleSelectDeal(deal)}
                      className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Enter Room
                    </button>
                 </div>
              </div>
            )))}
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
                <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm mb-6">
                    Manage your network and track commission payouts from closed deals.
                </div>
                 {/* Mock Table */}
                 <div className="overflow-hidden border border-slate-200 rounded-lg">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Deal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#D1 - Katanga</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Introducer</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-bold">$675,000</td>
                                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span></td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
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