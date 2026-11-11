import React from 'react';
import { Quote } from 'lucide-react';

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  avatarUrl,
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-colors">
      <div>
        <div className="text-blue-600 mb-4 inline-flex p-2 bg-blue-50 rounded-lg">
          <Quote className="w-5 h-5 fill-current" />
        </div>
        <p className="text-sm text-slate-700 leading-relaxed italic">
          "{quote}"
        </p>
      </div>

      <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-slate-100">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={author}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover border border-slate-200"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
            {author.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div>
          <h4 className="text-sm font-bold text-slate-900 leading-snug">{author}</h4>
          <p className="text-xs text-slate-500 font-medium">{role}</p>
        </div>
      </div>
    </div>
  );
};

