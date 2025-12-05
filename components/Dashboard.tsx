import React from 'react';
import { User, UserRole, Deal } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { ArrowUpRight, TrendingUp, Users, AlertTriangle, FileCheck, ShieldCheck, DollarSign } from 'lucide-react';

interface DashboardProps {
  user: User;
  deals: Deal[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, deals }) => {
  
  // Mock data for charts
  const activityData = [
    { name: 'Jan', value: 400, uv: 240 },
    { name: 'Feb', value: 300, uv: 139 },
    { name: 'Mar', value: 600, uv: 980 },
    { name: 'Apr', value: 800, uv: 390 },
    { name: 'May', value: 500, uv: 480 },
    { name: 'Jun', value: 700, uv: 380 },
    { name: 'Jul', value: 900, uv: 430 },
  ];

  const StatCard = ({ title, value, sub, icon: Icon, color, delay }: any) => (
    <div className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-${color}-100 transition-all duration-300 transform hover:-translate-y-1 animate-slide-up ${delay}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
          <p className={`text-xs mt-2 font-medium ${color === 'red' ? 'text-red-600' : 'text-emerald-600'} flex items-center gap-1`}>
            {sub} <ArrowUpRight size={12} />
          </p>
        </div>
        <div className={`p-3.5 rounded-xl bg-${color}-50 text-${color}-600 shadow-sm`}>
          <Icon size={24} strokeWidth={2} />
        </div>
      </div>
    </div>
  );

  const renderBuyerDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Deals" value="3" sub="+1 this week" icon={FileCheck} color="emerald" delay="delay-100" />
        <StatCard title="Total Spend" value="$57.2M" sub="+12% vs last month" icon={DollarSignIcon} color="blue" delay="delay-200" />
        <StatCard title="Pending Actions" value="1" sub="Urgent: TT Proof" icon={AlertTriangle} color="amber" delay="delay-300" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-slide-up delay-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Spend Overview</h3>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none text-slate-600">
                <option>Last 6 Months</option>
                <option>This Year</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} 
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-slide-up delay-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Active Deals</h3>
            <button className="text-emerald-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {deals.slice(0, 3).map((deal, idx) => (
              <div key={deal.id} className="group flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white shadow-sm ${idx === 0 ? 'bg-amber-500' : 'bg-blue-500'}`}>
                    {deal.mineName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{deal.mineName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{deal.commodity} • {deal.quantity}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-full shadow-sm">
                    {deal.stage}
                  </span>
                  <span className="text-[10px] text-slate-400">{deal.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSellerDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Listings" value="2" sub="All verified" icon={ShieldCheck} color="emerald" delay="delay-100" />
        <StatCard title="Incoming Offers" value="5" sub="2 New today" icon={TrendingUp} color="blue" delay="delay-200" />
        <StatCard title="Revenue (YTD)" value="$12.4M" sub="Provisional" icon={DollarSignIcon} color="purple" delay="delay-300" />
      </div>

       <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-slide-up delay-500">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Interest Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="uv" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  );

  const renderIntermediaryDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Commissions" value="$890k" sub="Pending Payouts: $120k" icon={DollarSignIcon} color="emerald" delay="delay-100" />
        <StatCard title="Deals Facilitated" value="12" sub="Lifetime" icon={Users} color="blue" delay="delay-200" />
        <StatCard title="Disputes" value="0" sub="Clean Record" icon={ShieldCheck} color="emerald" delay="delay-300" />
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-slide-up delay-500">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Commission Pipeline</h3>
             <button className="text-slate-400 hover:text-emerald-600 transition-colors">
                <Users size={18} />
             </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead className="text-xs text-slate-400 uppercase">
              <tr>
                <th className="px-4 py-2 font-semibold">Deal ID</th>
                <th className="px-4 py-2 font-semibold">Role</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-200 rounded-lg group">
                <td className="px-4 py-4 rounded-l-lg font-bold text-slate-800">#D1 - Katanga</td>
                <td className="px-4 py-4 text-slate-600">Introducer</td>
                <td className="px-4 py-4"><span className="text-orange-700 bg-orange-100 border border-orange-200 px-2.5 py-1 rounded-full text-xs font-bold">Processing</span></td>
                <td className="px-4 py-4 rounded-r-lg text-right font-bold text-emerald-600">$675,000</td>
              </tr>
               <tr className="bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-200 rounded-lg group">
                <td className="px-4 py-4 rounded-l-lg font-bold text-slate-800">#D2 - Lithium</td>
                <td className="px-4 py-4 text-slate-600">Facilitator</td>
                <td className="px-4 py-4"><span className="text-slate-600 bg-slate-200 border border-slate-300 px-2.5 py-1 rounded-full text-xs font-bold">Pending Close</span></td>
                <td className="px-4 py-4 rounded-r-lg text-right text-slate-500 font-medium">$50,000 (Est)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  const renderAdminDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Users" value="1,240" sub="+45 this week" icon={Users} color="blue" delay="delay-100" />
        <StatCard title="Verification Queue" value="8" sub="Documents pending" icon={FileCheck} color="amber" delay="delay-150" />
        <StatCard title="Live Deals" value="24" sub="$140M Volume" icon={TrendingUp} color="emerald" delay="delay-200" />
        <StatCard title="Fraud Alerts" value="2" sub="High Priority" icon={AlertTriangle} color="red" delay="delay-300" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-slide-up delay-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 relative z-10">
            <AlertTriangle size={20} className="text-red-500"/> Recent Fraud Alerts
          </h3>
          <div className="space-y-3 relative z-10">
             <div className="p-4 bg-white border border-red-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-bold text-slate-900">Mismatched Bank Credentials</p>
                        <p className="text-xs text-red-500 mt-1 font-medium">User ID #U882 - Document AI Flagged</p>
                    </div>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
                <button className="mt-3 w-full text-xs font-bold text-red-700 bg-red-50 py-2 rounded-lg hover:bg-red-100 transition-colors">Review Incident</button>
             </div>
          </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-slide-up delay-700">
          <h3 className="text-lg font-bold text-slate-900 mb-6">System Health</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2 text-slate-700">
                <span>Server Load</span>
                <span>24%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full shadow-lg shadow-emerald-200" style={{width: '24%'}}></div>
              </div>
            </div>
             <div>
              <div className="flex justify-between text-xs font-bold mb-2 text-slate-700">
                <span>AI API Quota</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full shadow-lg shadow-blue-200" style={{width: '45%'}}></div>
              </div>
            </div>
             <div>
              <div className="flex justify-between text-xs font-bold mb-2 text-slate-700">
                <span>Database Connections</span>
                <span>12%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full shadow-lg shadow-purple-200" style={{width: '12%'}}></div>
              </div>
            </div>
          </div>
         </div>
      </div>
    </div>
  );

  // Helper Icon
  const DollarSignIcon = ({size, strokeWidth}: any) => <DollarSign size={size} strokeWidth={strokeWidth} />;

  return (
    <div className="pb-10">
      <div className="animate-fade-in mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="text-slate-500 mt-1">Here's what's happening in your network today.</p>
      </div>
      
      {user.role === UserRole.BUYER && renderBuyerDashboard()}
      {user.role === UserRole.SELLER && renderSellerDashboard()}
      {user.role === UserRole.INTERMEDIARY && renderIntermediaryDashboard()}
      {user.role === UserRole.ADMIN && renderAdminDashboard()}
    </div>
  );
};

export default Dashboard;