import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-100/70 via-sky-50/40 to-white pt-16 sm:pt-20 lg:pt-24 pb-0 text-center">
      {/* Subtle cloud / dot grid ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline matching Image 1 */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          Beyond Graduation Starts <br className="hidden sm:inline" />
          Your Real Growth
        </h1>

        {/* Subtitle matching Image 1 */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-4 leading-relaxed font-normal">
          A lifelong network for KoneksiAlumni graduates to grow careers, build meaningful connections, and give back.
        </p>

        {/* Two Pill Buttons matching Image 1 */}
        <div className="flex items-center justify-center gap-3.5 mt-7">
          <Link
            to="/direktori"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-7 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Explore Opportunities
          </Link>
          <Link
            to="/login"
            className="rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-7 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-2xs"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Hero Campus Facade & Two Graduates Composition (1:1 with Image 1) */}
      <div className="relative mt-12 sm:mt-14 w-full max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl sm:shadow-2xl bg-white aspect-21/9 max-h-[440px]">
          <img
            src="/assets/hero_graduates_campus.png"
            alt="KoneksiAlumni Graduates in front of Campus Facade"
            width={1260}
            height={516}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};
