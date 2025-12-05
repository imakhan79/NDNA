import React, { useState } from 'react';
import { 
  Menu, X, Home, Briefcase, FileText, Users, Settings, 
  Bell, LogOut, ShieldCheck, DollarSign, BookOpen 
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
    // Common items now include Workflow Guide
    const common = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'workflow', label: 'Platform Guide', icon: BookOpen },
    ];

    const bottom = [
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    let roleItems = [];

    switch (role) {
      case UserRole.BUYER:
        roleItems = [
          { id: 'marketplace', label: 'Marketplace', icon: Briefcase },
          { id: 'active-deals', label: 'Active Deals', icon: FileText },
          { id: 'payments', label: 'Payments', icon: DollarSign },
        ];
        break;
      case UserRole.SELLER:
        roleItems = [
          { id: 'my-mines', label: 'My Mines', icon: ShieldCheck },
          { id: 'offers', label: 'Deal Requests', icon: FileText },
        ];
        break;
      case UserRole.INTERMEDIARY:
        roleItems = [
          { id: 'commissions', label: 'Commissions', icon: DollarSign },
          { id: 'network', label: 'My Network', icon: Users },
        ];
        break;
      case UserRole.ADMIN:
        roleItems = [
          { id: 'verification', label: 'Verification Queue', icon: ShieldCheck },
          { id: 'all-deals', label: 'Live Deals', icon: Briefcase },
          { id: 'fraud-alerts', label: 'Fraud Alerts', icon: Bell },
        ];
        break;
    }

    // Merge: Common (Top) -> Role Specific -> Settings (Bottom)
    return [...common, ...roleItems, ...bottom];
  };

  const menuItems = getMenuItems(user.role);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 shadow-2xl`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20 text-lg">N</div>
            <span className="text-xl font-bold tracking-tight">NDNA</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-8 px-2 mt-2">
            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-500/30 flex items-center justify-center shadow-inner">
                    <span className="text-xs font-bold text-slate-300">{user.role.charAt(0)}</span>
                </div>
                <div className="overflow-hidden">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Current Role</p>
                    <p className="text-sm font-bold text-emerald-400 truncate">{user.role}</p>
                </div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <item.icon size={20} className={activeTab === item.id ? 'text-emerald-100' : 'text-slate-500 group-hover:text-emerald-400 transition-colors'} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800/50 bg-slate-900">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group border border-transparent hover:border-red-500/20"
          >
            <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm z-40 sticky top-0">
          <div className="flex items-center justify-between px-6 py-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* Breadcrumb / Title placeholder */}
            <div className="hidden md:block">
               <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                 Platform / <span className="text-slate-900">{activeTab.replace('-', ' ')}</span>
               </h2>
            </div>

            <div className="flex items-center gap-6 ml-auto">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors hover:text-emerald-600"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </button>

                {showNotifs && (
                  <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-slide-up">
                    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                      <button className="text-xs text-emerald-600 font-bold hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-sm text-slate-500 flex flex-col items-center gap-2">
                           <Bell className="text-slate-300" size={32} />
                           No new notifications
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group ${!n.read ? 'bg-blue-50/30' : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{n.title}</p>
                                <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded">{n.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{user.companyName}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-md ring-2 ring-slate-50 cursor-pointer hover:ring-emerald-200 transition-all">
                  <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=10b981&color=fff`} alt="User" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-8 pb-20 md:pb-8 relative">
          <div className="max-w-7xl mx-auto h-full" key={activeTab}>
             {/* Key prop triggers re-animation on tab change if styles allow */}
             <div className="animate-fade-in h-full">
                {children}
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;