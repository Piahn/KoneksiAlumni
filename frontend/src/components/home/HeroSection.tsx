import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-white pt-16 sm:pt-20 lg:pt-24 pb-0 text-center">
      {/* Clouds effect subtle backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          Beyond Graduation Starts <br className="hidden sm:inline" />
          Your Real Growth
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          A lifelong network for KoneksiAlumni graduates to grow careers, build meaningful connections, and give back.
        </p>

        {/* Two Pill Buttons */}
        <div className="flex items-center justify-center gap-3.5 mt-8">
          <Link
            to="/direktori"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 text-sm font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Explore Opportunities
          </Link>
          <Link
            to="/login"
            className="rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-7 py-3 text-sm font-semibold transition-all shadow-xs"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Hero Campus Facade & Graduates Composition (Exact KoneksiAlumni Style) */}
      <div className="relative mt-12 sm:mt-16 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Neoclassical campus building illustration / image */}
        <div className="relative w-full max-h-[380px] overflow-hidden rounded-t-3xl border-t border-x border-slate-200/90 shadow-2xl bg-white">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=85"
            alt="KoneksiAlumni Campus Building and Graduates"
            width={1600}
            height={520}
            className="w-full h-[280px] sm:h-[360px] object-cover object-top"
            loading="eager"
          />

          {/* Gradient Overlay for bottom blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

          {/* Floating Graduates Badge Composition */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl px-6 py-3.5 shadow-lg flex items-center gap-4 max-w-md w-[90%] sm:w-auto">
            <div className="flex -space-x-2.5 overflow-hidden">
              <img
                width={40}
                height={40}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Alumni Graduate 1"
              />
              <img
                width={40}
                height={40}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Alumni Graduate 2"
              />
              <img
                width={40}
                height={40}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
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
