import React from 'react';
import { Link } from 'react-router-dom';

export const LatestNewsSection: React.FC = () => {
  const news = [
    {
      id: 'n1',
      title: 'Alumni Return to Campus to Inspire Students',
      date: '15 April 2026',
      readTime: '2 min read',
      image: '/assets/news_1.jpg',
    },
    {
      id: 'n2',
      title: 'Alumni Gathering 2026 Strengthens Graduate Network',
      date: '15 April 2026',
      readTime: '2 min read',
      image: '/assets/news_2.jpg',
    },
    {
      id: 'n3',
      title: 'Successful Alumni Shares Career Insights at Student Seminar',
      date: '10 April 2026',
      readTime: '3 min read',
      image: '/assets/news_3.jpg',
    },
    {
      id: 'n4',
      title: 'Graduation 2026: Thousands of Students Officially Join Alumni C...',
      date: '10 April 2026',
      readTime: '3 min read',
      image: '/assets/news_4.jpg',
    },
  ];

  return (
    <section id="news" className="py-20 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Image 1 */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest News
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Stay updated with recent stories, gatherings, and almamater milestones.
            </p>
          </div>
          <Link
            to="/#news"
            className="text-xs font-bold text-blue-600 hover:underline shrink-0"
          >
            View All News
          </Link>
        </div>

        {/* 4 Cards Grid in a Row matching Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={375}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/news_1.png';
                  }}
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-3 font-medium">
                  {item.date} • {item.readTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

