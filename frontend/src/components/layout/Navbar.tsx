import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, role, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { label: 'About', to: '/#about', hasDropdown: true },
    { label: 'Network', to: '/direktori' },
    { label: 'Programs', to: '/#programs', hasDropdown: true },
    { label: 'Career', to: '/#career' },
    { label: 'Events', to: '/#events' },
    { label: 'News', to: '/#news' },
    { label: 'Awards', to: '/#impact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo matching Nusantara University style */}
          <Link
            to="/"
            className="flex items-center gap-3 focus:outline-none rounded-lg group"
          >
            {/* SVG University Crest Logo */}
            <div className="w-9 h-9 flex items-center justify-center text-blue-600">
              <svg
                aria-hidden="true"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9"
              >
                <path
                  d="M4 10C8 7 14 7 18 10C22 7 28 7 32 10V26C28 23 22 23 18 26C14 23 8 23 4 26V10Z"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 10V26"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 6C12 4 16 4 18 6C20 4 24 4 28 6"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                Nusantara
              </span>
              <span className="text-xs font-bold tracking-tight text-blue-600 leading-none">
                University
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-blue-600 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Auth Action (Pill Login Button) */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-5 py-2 text-sm font-semibold transition-colors border border-blue-200/80"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard ({role === 'alumni' ? 'Alumni' : 'Mahasiswa'})</span>
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold">
                    {profile?.full_name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Keluar akun"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-7 py-2 text-sm font-semibold transition-colors shadow-xs"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Buka navigasi menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold"
                >
                  Buka Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-center py-2.5 rounded-full border border-slate-200 text-slate-700 text-sm font-semibold"
                >
                  Keluar Akun
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-xs"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
