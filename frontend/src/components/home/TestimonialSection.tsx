import React from 'react';

export const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      id: 't1',
      quote:
        'The academic environment and practical approach to learning prepared me for the real challenges I faced when stepping into my career after graduating.',
      name: 'Greesel Ornella',
      department: 'Information Systems',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 't2',
      quote:
        'The environment was very welcoming and encouraged me to grow both academically and personally. I gained not just knowledge, but also valuable connections and confidence to pursue my career in tech.',
      name: 'Budi Santoso',
      department: 'Communication Studies',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 't3',
      quote:
        'My experience here helped me discover my strengths and passion. The projects and teamwork really reflected what happens in the industry, which made the transition to work much smoother. I gained valuable connections in here.',
      name: 'Nadira Safitri',
      department: 'Management Studies',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 mb-2">
            Testimonial
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hear Our Alumni Voices
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto leading-relaxed">
            Hear how our graduates have turned their experiences into success stories across industries and around the world.
          </p>
        </div>

        {/* 3 Testimonials in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {testimonials.map((t) => (
            <div key={t.id} className="flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Large double quote mark matching reference */}
                <span className="text-3xl sm:text-4xl font-serif text-slate-900 block leading-none font-black mb-3">
                  ““
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {t.department}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Pagination Indicator matching reference */}
        <div className="flex items-center justify-center gap-1.5 mt-14">
          <span className="w-5 h-1.5 rounded-full bg-blue-600" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </div>
      </div>
    </section>
  );
};
