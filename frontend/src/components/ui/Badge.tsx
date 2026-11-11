import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'green' | 'amber' | 'gray' | 'rose';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md font-semibold',
    md: 'text-xs px-2.5 py-1 rounded-full font-semibold',
  };

  const variantStyles = {
    blue: 'bg-blue-50 text-blue-700 border border-blue-200/80',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    gray: 'bg-slate-100 text-slate-700 border border-slate-200',
    rose: 'bg-rose-50 text-rose-700 border border-rose-200/80',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 leading-none tracking-tight ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

