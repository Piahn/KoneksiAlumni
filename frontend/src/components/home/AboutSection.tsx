import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
            About
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            They Started Where You Are Today
          </h2>
        </div>

        {/* Two Photos Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20 items-stretch">
          {/* Left Photo: Classroom */}
          <div className="flex flex-col">
            <div className="aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/80">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                alt="A shared classroom, a thousand different journeys"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-base font-bold text-slate-900">A shared classroom.</h3>
              <p className="text-sm text-slate-500 mt-0.5">A thousand different journeys.</p>
            </div>
          </div>

          {/* Right Photo: Diverse Alumni Group */}
          <div className="flex flex-col">
            <div className="aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/80">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="One lifelong connection"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-base font-bold text-slate-900">One lifelong connection.</h3>
              <p className="text-sm text-slate-500 mt-0.5">Saling membimbing dan membuka peluang karir.</p>
            </div>
          </div>
        </div>

        {/* Bottom Callout: Builders. Leaders. Innovators. */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Not just graduates.
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-8">
            Builders. Leaders. Innovators.
          </h3>

          <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200/90 aspect-21/9 max-h-[380px] bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80"
              alt="Builders Leaders Innovators Alumni"
              width={1400}
              height={600}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
