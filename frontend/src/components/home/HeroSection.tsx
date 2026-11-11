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

      {/* Hero Card with Floating Badge (Clean, High-Res & Professional) */}
      <div className="relative mt-12 sm:mt-16 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200/90 shadow-xl bg-white aspect-21/9 max-h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=85"
            alt="KoneksiAlumni Graduates Celebration"
            width={1600}
            height={680}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />

          {/* Floating Graduates Badge Composition */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3.5 max-w-md w-[92%] sm:w-auto z-20">
            <div className="flex -space-x-2.5 overflow-hidden">
              <img
                width={36}
                height={36}
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Alumni Graduate 1"
              />
              <img
                width={36}
                height={36}
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Alumni Graduate 2"
              />
              <img
                width={36}
                height={36}
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                alt="Alumni Graduate 3"
              />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                25,000+ Alumni Terhubung
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Siap membimbing karir & review resume Anda
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
