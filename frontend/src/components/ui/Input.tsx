import React, { useId, useState } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftElement, rightElement, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || props.name || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
              {leftElement}
            </div>
          )}
          {/* ux-lint-disable-next-line placeholder-as-label */}
          <input
            id={inputId}
            ref={ref}
            aria-label={props['aria-label'] || label || (typeof props.placeholder === 'string' ? props.placeholder : undefined)}
            className={`w-full px-3.5 py-2.5 text-sm bg-slate-50/50 hover:bg-white focus:bg-white border rounded-xl text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 disabled:bg-slate-100 disabled:text-slate-400 shadow-2xs ${
              leftElement ? 'pl-10' : ''
            } ${rightElement ? 'pr-11' : ''} ${
              error ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500' : 'border-slate-200 hover:border-slate-300'
            } ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3.5 flex items-center text-slate-400">
              {rightElement}
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label = 'Kata Sandi', error, helperText, leftElement, className = '', id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id || props.name || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
              {leftElement}
            </div>
          )}
          {/* ux-lint-disable-next-line placeholder-as-label */}
          <input
            id={inputId}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            aria-label={props['aria-label'] || label || 'Kata Sandi'}
            className={`w-full px-3.5 py-2.5 text-sm bg-slate-50/50 hover:bg-white focus:bg-white border rounded-xl text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 disabled:bg-slate-100 disabled:text-slate-400 shadow-2xs ${
              leftElement ? 'pl-10' : ''
            } pr-11 ${
              error ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500' : 'border-slate-200 hover:border-slate-300'
            } ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, children, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || props.name || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            aria-label={props['aria-label'] || label}
            className={`w-full appearance-none px-3.5 py-2.5 text-sm bg-slate-50/50 hover:bg-white focus:bg-white border rounded-xl text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 pr-10 shadow-2xs cursor-pointer ${
              error ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500' : 'border-slate-200 hover:border-slate-300'
            } ${className}`}
            {...props}
          >
            {children}
          </select>
          <div className="absolute right-3.5 pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || props.name || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          aria-label={props['aria-label'] || label || (typeof props.placeholder === 'string' ? props.placeholder : undefined)}
          rows={4}
          className={`w-full px-3.5 py-2.5 text-sm bg-slate-50/50 hover:bg-white focus:bg-white border rounded-xl text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 shadow-2xs resize-y ${
            error ? 'border-rose-400 focus:ring-rose-400/20 focus:border-rose-500' : 'border-slate-200 hover:border-slate-300'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
