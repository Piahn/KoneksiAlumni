import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { ArrowLeft } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Minimalist Top Bar (Focus on Authentication) */}
      <header className="h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-2.5 focus:outline-none group">
          <Logo size="sm" />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors py-1.5 px-3.5 rounded-full hover:bg-slate-100/80 border border-slate-200/60"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <Outlet />
      </main>

      {/* Minimalist 1-Line Footer */}
      <footer className="py-4 border-t border-slate-200/60 bg-white/70 text-center text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
        <span>© {new Date().getFullYear()} KoneksiAlumni Platform. Seluruh hak cipta dilindungi.</span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <div className="flex items-center gap-4 text-slate-500">
          <Link to="/#about" className="hover:text-blue-600 transition-colors">Bantuan</Link>
          <Link to="/#about" className="hover:text-blue-600 transition-colors">Privasi & Keamanan</Link>
        </div>
      </footer>
    </div>
  );
};
