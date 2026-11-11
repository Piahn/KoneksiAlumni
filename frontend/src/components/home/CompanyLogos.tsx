import React from 'react';
import { Shield, Sparkles, Globe, Compass, Box, Layers, Cpu } from 'lucide-react';

export const CompanyLogos: React.FC = () => {
  const companies = [
    { name: 'Sunderland Company', icon: <Shield className="w-4 h-4 text-slate-500" /> },
    { name: 'Starlight Agency', icon: <Sparkles className="w-4 h-4 text-slate-500" /> },
    { name: 'Sea World', icon: <Compass className="w-4 h-4 text-slate-500" /> },
    { name: 'SuperShield', icon: <Globe className="w-4 h-4 text-slate-500" /> },
    { name: '3Portals', icon: <Box className="w-4 h-4 text-slate-500" /> },
    { name: 'Alt+Shift', icon: <Layers className="w-4 h-4 text-slate-500" /> },
    { name: 'BuildingBlock', icon: <Cpu className="w-4 h-4 text-slate-500" /> },
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-sm font-bold text-slate-900 mb-8">
          Our Alumni Trusted by Companies
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-slate-500">
          {companies.map((c) => (
            <div key={c.name} className="flex items-center gap-2 hover:text-slate-800 transition-colors">
              {c.icon}
              <span className="text-xs sm:text-sm font-semibold tracking-tight">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
