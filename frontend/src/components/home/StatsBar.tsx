import React from 'react';
import { GraduationCap, Building2, Users } from 'lucide-react';

export const StatsBar: React.FC = () => {
  return (
    <section id="impact" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Impact in Numbers
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            A snapshot of how our alumni thrive, fast employment, strong networks, and leadership growth.
          </p>
        </div>

        {/* 4 Connected Cards Grid Matching Image 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0 border border-slate-200 rounded-2xl overflow-hidden shadow-xs divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {/* Card 1 */}
          <div className="bg-white p-7 flex flex-col justify-between min-h-[160px]">
            <div className="flex items-start justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                25,000+
              </span>
              <GraduationCap className="w-5 h-5 text-slate-800" />
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">
              Graduates building their careers
            </p>
          </div>

          {/* Card 2: Inverted Black Card */}
          <div className="bg-black text-white p-7 flex flex-col justify-between min-h-[160px]">
            <div className="flex items-start justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                86%
              </span>
              <GraduationCap className="w-5 h-5 text-slate-300" />
            </div>
            <p className="text-xs text-slate-300 mt-4 leading-relaxed font-medium">
              Employed within 6 months
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-7 flex flex-col justify-between min-h-[160px]">
            <div className="flex items-start justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                300+
              </span>
              <Building2 className="w-5 h-5 text-slate-800" />
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">
              Companies trust our alumni
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-7 flex flex-col justify-between min-h-[160px]">
            <div className="flex items-start justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                1,200+
              </span>
              <Users className="w-5 h-5 text-slate-800" />
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">
              Now leading teams & organizations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
