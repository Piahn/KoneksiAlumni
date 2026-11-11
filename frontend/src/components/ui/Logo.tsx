import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  theme = 'light',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const isDark = theme === 'dark';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Bespoke KoneksiAlumni SVG Icon Mark: Cap + Interconnected Network Nodes */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex items-center justify-center shadow-xs shrink-0 ring-1 ring-blue-500/30 p-1.5 transition-transform duration-200 group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Top Diamond / Graduation Mortarboard */}
          <path
            d="M16 4.5L3.5 11.2L16 17.9L28.5 11.2L16 4.5Z"
            fill="white"
            fillOpacity="0.95"
          />
          {/* Interconnecting Network Arch */}
          <path
            d="M8.5 14.8V21.5C8.5 24 11.8 26.5 16 26.5C20.2 26.5 23.5 24 23.5 21.5V14.8"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central Connection Pulse Node */}
          <circle cx="16" cy="22" r="2.2" fill="#38BDF8" />
          {/* Left & Right Connection Hub Nodes */}
          <circle cx="10" cy="18" r="1.6" fill="#93C5FD" />
          <circle cx="22" cy="18" r="1.6" fill="#93C5FD" />
          {/* Tassel link */}
          <path
            d="M26 12.5V18.5M26 18.5C25.2 18.5 24.5 19.2 24.5 20C24.5 20.8 25.2 21.5 26 21.5C26.8 21.5 27.5 20.8 27.5 20C27.5 19.2 26.8 18.5 26 18.5Z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span
            className={`${textSizes[size]} font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Koneksi<span className="text-blue-600">Alumni</span>
          </span>
          <span
            className={`text-[9.5px] font-bold tracking-wider uppercase mt-0.5 ${
              isDark ? 'text-blue-200' : 'text-slate-400'
            }`}
          >
            Portal Mentorship & Karir
          </span>
        </div>
      )}
    </div>
  );
};
