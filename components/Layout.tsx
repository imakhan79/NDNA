import React, { useState } from 'react';
import { 
  Menu, X, Home, Briefcase, FileText, Users, Settings, 
  Bell, LogOut, ShieldCheck, DollarSign 
} from 'lucide-react';
import { User, UserRole, Notification } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
  notifications: Notification[];
}

const Layout: React.FC<LayoutProps> = ({ 
  children, user, activeTab, onNavigate, onLogout, notifications 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  if (!user) return <>{children}</>;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getMenuItems = (role: UserRole) => {
    const common = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    switch (role) {
      case UserRole.BUYER:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'marketplace', label: 'Marketplace', icon: Briefcase },
          { id: 'active-deals', label: 'Active Deals', icon: FileText },
          { id: 'payments', label: 'Payments', icon: DollarSign },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case UserRole.SELLER:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'my-mines', label: 'My Mines', icon: ShieldCheck },
          { id: 'offers', label: 'Deal Requests', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case UserRole.INTERMEDIARY:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'commissions', label: 'Commissions', icon: DollarSign },
          { id: 'network', label: 'My Network', icon: Users },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case UserRole.ADMIN:
        return [
          { id: 'dashboard', label: 'Overview', icon: Home },
          { id: 'verification', label: 'Verification Queue', icon: ShieldCheck },
          { id: 'all-deals', label: 'Live Deals', icon: Briefcase },
          { id: 'fraud-alerts', label: 'Fraud Alerts', icon: Bell },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      default:
        return common;
    }
  };

  const menuItems = getMenuItems(user.role);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white">N</div>
            <span className="text-xl font-bold tracking-tight">NDNA</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6 px-2">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Role</p>
            <div className="bg-slate-800 rounded px-3 py-2 text-sm text-emerald-400 font-medium border border-slate-700">
              {user.role}
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm z-40">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </button>

                {showNotifs && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-slate-500">No notifications</div>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className={`p-3 border-b border-slate-50 hover:bg-slate-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                            <p className="text-sm font-medium text-slate-900">{n.title}</p>
                            <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                            <p className="text-[10px] text-slate-400 mt-2 text-right">{n.timestamp}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.companyName}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                  <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=10b981&color=fff`} alt="User" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6 relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
