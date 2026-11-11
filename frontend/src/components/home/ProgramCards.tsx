import React from 'react';
import { Link } from 'react-router-dom';

export const ProgramCards: React.FC = () => {
  const events = [
    {
      id: 'e1',
      title: 'Career Growth Webinar Series',
      description:
        'Learn practical career strategies from successful alumni across various industries.',
      date: '25 October 2026',
      image: '/assets/event_webinar.png',
    },
    {
      id: 'e2',
      title: 'Alumni Networking Night 2026',
      description:
        'Reconnect with fellow alumni and expand your professional network in an evening of meaningful connection.',
      date: '15 June 2026',
      image: '/assets/event_networking.png',
    },
    {
      id: 'e3',
      title: 'Annual Alumni Homecoming',
      description:
        'Celebrate traditions, relive memories, and enjoy campus activities with alumni from all generations.',
      date: '20 April 2026',
      image: '/assets/event_homecoming.png',
    },
  ];

  return (
    <section id="events" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 mb-2">
              Events
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Stay Connected Through Events
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Explore meaningful events where alumni come together to learn, share, and grow.
            </p>
          </div>

          <Link
            to="/direktori"
            className="self-start sm:self-auto rounded-full border border-slate-300 hover:border-slate-400 bg-white text-slate-700 px-5 py-2 text-xs font-semibold transition-colors shadow-2xs"
          >
            View Events
          </Link>
        </div>

        {/* 3 Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((e) => (
            <div
              key={e.id}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={e.image}
                    alt={e.title}
                    width={600}
                    height={375}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {e.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {e.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Date
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {e.date}
                  </span>
                </div>
                <Link
                  to="/direktori"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-semibold transition-colors shadow-xs"
                >
                  Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
