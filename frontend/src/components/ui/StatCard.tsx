import React from 'react';

export interface StatCardProps {
  number: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  highlighted?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  number,
  label,
  sublabel,
  icon,
  highlighted = false,
}) => {
  if (highlighted) {
    return (
      <div className="bg-slate-950 text-white rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-md border border-slate-900 transition-colors">
        <div className="flex items-start justify-between">
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {number}
          </div>
          {icon && (
            <div className="text-slate-300 p-2 rounded-lg bg-slate-800/60">
              {icon}
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm font-semibold text-slate-100">{label}</p>
          {sublabel && (
            <p className="text-xs text-slate-400 mt-1 leading-snug">{sublabel}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-xs transition-colors hover:border-slate-300">
      <div className="flex items-start justify-between">
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
          {number}
        </div>
        {icon && (
          <div className="text-slate-500 p-2 rounded-lg bg-slate-100/80">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        {sublabel && (
          <p className="text-xs text-slate-500 mt-1 leading-snug">{sublabel}</p>
        )}
      </div>
    </div>
  );
};

