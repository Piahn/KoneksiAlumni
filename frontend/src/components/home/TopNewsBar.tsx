import React from 'react';
import { Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
}

export const TopNewsBar: React.FC = () => {
  const news: NewsItem[] = [
    {
      id: 'n1',
      title: 'Alumni Return to Campus to Inspire Students...',
      date: '15 April 2026',
      readTime: '2 min read',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'n2',
      title: 'Alumni Gathering 2026 Strengthens Graduate Network',
      date: '15 April 2026',
      readTime: '2 min read',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'n3',
      title: 'Successful Alumni Shares Career Insights at Student Seminar',
      date: '10 April 2026',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'n4',
      title: 'Graduation 2026: Thousands of Students Officially Join Alumni Community',
      date: '10 April 2026',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200/80 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 group cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                <img
                  src={item.image}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.readTime}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

