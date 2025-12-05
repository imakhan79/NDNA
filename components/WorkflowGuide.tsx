import React from 'react';
import { User, ShieldCheck, Briefcase, FileText, CheckCircle, Users, ArrowRight, PlayCircle } from 'lucide-react';

interface WorkflowGuideProps {
  onNavigate: (view: string) => void;
}

const WorkflowGuide: React.FC<WorkflowGuideProps> = ({ onNavigate }) => {
  const steps = [
    {
      title: "1. Authentication & Role",
      description: "Users sign up and select their specific role (Buyer, Seller, Intermediary). Identity is verified via KYC checks.",
      icon: User,
      color: "blue",
      action: "settings",
      delay: "delay-100"
    },
    {
      title: "2. Marketplace Discovery",
      description: "Buyers browse verified mines. Sellers list commodities. Advanced filters help match supply with demand.",
      icon: Briefcase,
      color: "emerald",
      action: "marketplace",
      delay: "delay-200"
    },
    {
      title: "3. Deal Initiation",
      description: "Buyer requests a deal. A secure 'Deal Room' is created. Seller receives an incoming offer notification.",
      icon: FileText,
      color: "indigo",
      action: "active-deals",
      delay: "delay-300"
    },
    {
      title: "4. Negotiation & Milestones",
      description: "Parties chat, share documents, and track milestones (SPA, LC, Logistics) in real-time within the Deal Room.",
      icon: Users,
      color: "purple",
      action: "active-deals",
      delay: "delay-500"
    },
    {
      title: "5. Compliance & Verification",
      description: "Admins and AI algorithms verify uploaded documents (Licenses, POF) to prevent fraud.",
      icon: ShieldCheck,
      color: "amber",
      action: "verification",
      delay: "delay-700"
    },
    {
      title: "6. Closure & Commissions",
      description: "Deal completes. Funds are released via Escrow. Intermediaries receive automated commission payouts.",
      icon: CheckCircle,
      color: "green",
      action: "commissions",
      delay: "delay-700"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-12 text-center animate-slide-up">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Platform Workflow</h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">Master the NDNA ecosystem lifecycle from onboarding to deal closure.</p>
      </div>

      <div className="relative">
        {/* Vertical Connector Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-slate-200 via-emerald-200 to-slate-200 hidden md:block rounded-full"></div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} animate-slide-up ${step.delay}`}>
              
              {/* Content Card */}
              <div className="flex-1 w-full md:w-auto group perspective-1000">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden group-hover:scale-[1.02]">
                   {/* Decorative background element */}
                   <div className={`absolute top-0 right-0 w-32 h-32 bg-${step.color}-50 rounded-bl-[100px] -mr-8 -mt-8 opacity-60 transition-transform duration-700 group-hover:scale-150`}></div>
                   
                   <div className={`w-14 h-14 rounded-2xl bg-${step.color}-50 text-${step.color}-600 flex items-center justify-center mb-6 relative z-10 shadow-sm group-hover:bg-${step.color}-600 group-hover:text-white transition-colors duration-300`}>
                     <step.icon size={28} />
                   </div>
                   
                   <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{step.title}</h3>
                   <p className="text-slate-600 leading-relaxed relative z-10 mb-6">{step.description}</p>
                   
                   <button 
                     onClick={() => onNavigate(step.action)}
                     className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-emerald-600 transition-colors"
                   >
                     Go to Module <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </div>

              {/* Center Dot */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white font-bold text-lg border-4 border-slate-50 shrink-0 shadow-lg ring-4 ring-slate-100/50">
                {index + 1}
              </div>

              {/* Spacer for alternate side to keep balance */}
              <div className="flex-1 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-20 p-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden animate-slide-up delay-700 group">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-3">Ready to start trading?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join the secure commodity network used by industry leaders.</p>
            <button 
            onClick={() => onNavigate('dashboard')}
            className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/50 transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
            <PlayCircle size={24} /> Go to Dashboard
            </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowGuide;