import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header matching Image 1 */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 mb-2">
            About
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            They Started Where <br />
            You Are Today
          </h2>
        </div>

        {/* Row 1: Two Photos Side-by-Side matching Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20 items-stretch">
          {/* Left Photo: Classroom */}
          <div className="flex flex-col">
            <div className="aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/80">
              <img
                src="/assets/about_classroom.png"
                alt="A shared classroom, a thousand different journeys"
                width={615}
                height={435}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                A shared classroom.
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                A thousand different journeys.
              </p>
            </div>
          </div>

          {/* Right Photo: One lifelong connection (Graduates/Professionals) */}
          <div className="flex flex-col">
            <div className="aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/80">
              <img
                src="/assets/about_connection.png"
                alt="One lifelong connection"
                width={615}
                height={435}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                One lifelong connection.
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                One lifelong connection.
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: Builders. Leaders. Innovators. matching Image 1 */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Alumni in Action
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-8">
            Builders. Leaders. Innovators.
          </h3>

          <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200/90 aspect-21/9 max-h-[380px] bg-slate-100">
            <img
              src="/assets/about_leaders.png"
              alt="Builders Leaders Innovators Alumni"
              width={870}
              height={375}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          <p className="text-xs text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
            From first steps to leading organizations, our alumni continue to grow, far beyond campus.
          </p>
        </div>
      </div>
    </section>
  );
};
