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
      <div className="relative mt-12 sm:mt-16 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        <div className="relative w-full max-w-4xl flex justify-center items-end">
          {/* Neoclassical campus building illustration facade */}
          <div className="relative w-full overflow-hidden rounded-t-3xl border-t border-x border-slate-200/90 shadow-2xl bg-white">
            {/* Campus building background image */}
            <div className="relative h-[260px] sm:h-[340px] md:h-[400px] w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=85"
                alt="University Neoclassical Campus Facade"
                width={1600}
                height={520}
                className="w-full h-full object-cover object-center brightness-105"
                loading="eager"
              />

              {/* Classical Campus Building overlay illustration (Columns & Pediment) */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent pointer-events-none" />

              {/* Two Smiling Graduates in Regalia Centered (Image 1 Composition) */}
              <div className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none">
                <div className="relative flex items-end justify-center -space-x-8 sm:-space-x-12 translate-y-2">
                  {/* Male Graduate (Glasses & Gown) */}
                  <div className="relative z-10 w-44 sm:w-56 md:w-64 drop-shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85"
                      alt="Alumni Graduate"
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover rounded-t-full border-4 border-white shadow-xl"
                    />
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                      Alumni 2025
                    </div>
                  </div>

                  {/* Female Graduate (Long Hair, Cap & Gown) */}
                  <div className="relative z-20 w-44 sm:w-56 md:w-64 drop-shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=85"
                      alt="Alumni Graduate"
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover rounded-t-full border-4 border-white shadow-xl"
                    />
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                      Alumni 2025
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom floating badge matching Image 1 */}
            <div className="relative z-30 py-3.5 px-6 bg-white border-t border-slate-100 flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">
                  25,000+ Alumni Terhubung di 300+ Perusahaan
                </span>
              </div>
              <Link
                to="/direktori"
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Jelajahi Direktori →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
