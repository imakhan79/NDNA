import React from 'react';
import { User, UserRole, Deal } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, TrendingUp, Users, AlertTriangle, FileCheck, ShieldCheck, DollarSign } from 'lucide-react';

interface DashboardProps {
  user: User;
  deals: Deal[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, deals }) => {
  
  // Mock data for charts
  const activityData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];

  const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
        <p className={`text-xs mt-1 ${color === 'red' ? 'text-red-600' : 'text-emerald-600'} flex items-center gap-1`}>
          {sub} <ArrowUpRight size={12} />
        </p>
      </div>
      <div className={`p-3 rounded-lg bg-${color}-50 text-${color}-600`}>
        <Icon size={24} />
      </div>
    </div>
  );

  const renderBuyerDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Active Deals" value="3" sub="+1 this week" icon={FileCheck} color="emerald" />
        <StatCard title="Total Spend" value="$57.2M" sub="+12% vs last month" icon={DollarSignIcon} color="blue" />
        <StatCard title="Pending Actions" value="1" sub="Urgent: TT Proof" icon={AlertTriangle} color="amber" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Spend Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Active Deals</h3>
          <div className="space-y-4">
            {deals.slice(0, 3).map(deal => (
              <div key={deal.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="font-semibold text-slate-900">{deal.mineName}</p>
                  <p className="text-xs text-slate-500">{deal.commodity} • {deal.quantity}</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {deal.stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSellerDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Active Listings" value="2" sub="All verified" icon={ShieldCheck} color="emerald" />
        <StatCard title="Incoming Offers" value="5" sub="2 New today" icon={TrendingUp} color="blue" />
        <StatCard title="Revenue (YTD)" value="$12.4M" sub="Provisional" icon={DollarSignIcon} color="emerald" />
      </div>

       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Interest Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  );

  const renderIntermediaryDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Commissions" value="$890k" sub="Pending Payouts: $120k" icon={DollarSignIcon} color="emerald" />
        <StatCard title="Deals Facilitated" value="12" sub="Lifetime" icon={Users} color="blue" />
        <StatCard title="Disputes" value="0" sub="Clean Record" icon={ShieldCheck} color="emerald" />
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Commission Pipeline</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3">Deal ID</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">#D1 - Katanga</td>
                <td className="px-4 py-3">Introducer</td>
                <td className="px-4 py-3"><span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-xs">Processing</span></td>
                <td className="px-4 py-3 text-right font-bold text-emerald-600">$675,000</td>
              </tr>
               <tr className="border-b hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">#D2 - Lithium</td>
                <td className="px-4 py-3">Facilitator</td>
                <td className="px-4 py-3"><span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-xs">Pending Deal Close</span></td>
                <td className="px-4 py-3 text-right text-slate-500">$50,000 (Est)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Users" value="1,240" sub="+45 this week" icon={Users} color="blue" />
        <StatCard title="Verification Queue" value="8" sub="Documents pending" icon={FileCheck} color="amber" />
        <StatCard title="Live Deals" value="24" sub="$140M Volume" icon={TrendingUp} color="emerald" />
        <StatCard title="Fraud Alerts" value="2" sub="High Priority" icon={AlertTriangle} color="red" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-500"/> Recent Fraud Alerts
          </h3>
          <div className="space-y-3">
             <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm font-semibold text-red-800">Mismatched Bank Credentials</p>
                <p className="text-xs text-red-600 mt-1">User ID #U882 - Document AI Flagged</p>
                <button className="mt-2 text-xs bg-white border border-red-200 text-red-700 px-2 py-1 rounded hover:bg-red-100">Review</button>
             </div>
          </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Server Load</span>
                <span>24%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{width: '24%'}}></div>
              </div>
            </div>
             <div>
              <div className="flex justify-between text-xs mb-1">
                <span>AI API Quota</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
          </div>
         </div>
      </div>
    </div>
  );

  // Helper Icon
  const DollarSignIcon = ({size}: {size:number}) => <DollarSign size={size} />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back, {user.name.split(' ')[0]}</h1>
      <p className="text-slate-500 mb-6">Here's what's happening in your network today.</p>
      
      {user.role === UserRole.BUYER && renderBuyerDashboard()}
      {user.role === UserRole.SELLER && renderSellerDashboard()}
      {user.role === UserRole.INTERMEDIARY && renderIntermediaryDashboard()}
      {user.role === UserRole.ADMIN && renderAdminDashboard()}
    </div>
  );
};

export default Dashboard;