import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  User,
  BookOpen,
  Target,
  ShieldCheck,
  Video as VideoCamera,
  FileText,
  Compass,
  Users,
  Building2,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from '../ui/Logo';
import { AboutModal } from '../home/AboutModal';
import { NetworkModal } from '../home/NetworkModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [aboutModalTab, setAboutModalTab] = useState<'visi' | 'alur' | 'faq' | 'kontak'>('visi');

  const [networkModalOpen, setNetworkModalOpen] = useState(false);
  const [networkModalTab, setNetworkModalTab] = useState<'overview' | 'industri' | 'mitra' | 'wilayah'>('overview');

  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, role, signOut } = useAuth();

  const aboutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const networkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleMouseEnterAbout = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setAboutDropdownOpen(true);
  };

  const handleMouseLeaveAbout = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 150);
  };

  const handleMouseEnterNetwork = () => {
    if (networkTimeoutRef.current) clearTimeout(networkTimeoutRef.current);
    setNetworkDropdownOpen(true);
  };

  const handleMouseLeaveNetwork = () => {
    networkTimeoutRef.current = setTimeout(() => {
      setNetworkDropdownOpen(false);
    }, 150);
  };

  const handleMouseEnterPrograms = () => {
    if (programsTimeoutRef.current) clearTimeout(programsTimeoutRef.current);
    setProgramsDropdownOpen(true);
  };

  const handleMouseLeavePrograms = () => {
    programsTimeoutRef.current = setTimeout(() => {
      setProgramsDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    setAboutDropdownOpen(false);
    setNetworkDropdownOpen(false);
    setProgramsDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const openAboutWithTab = (tab: 'visi' | 'alur' | 'faq' | 'kontak') => {
    setAboutDropdownOpen(false);
    setAboutModalTab(tab);
    setAboutModalOpen(true);
  };

  const openNetworkWithTab = (tab: 'overview' | 'industri' | 'mitra' | 'wilayah') => {
    setNetworkDropdownOpen(false);
    setNetworkModalTab(tab);
    setNetworkModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Brand Logo: KoneksiAlumni */}
            <Link
              to="/"
              className="flex items-center gap-3 focus:outline-none rounded-lg group"
            >
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {/* About Dropdown (shadcn NavigationMenu style) */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterAbout}
                onMouseLeave={handleMouseLeaveAbout}
              >
                <button
                  type="button"
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors py-2 cursor-pointer ${
                    aboutDropdownOpen ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>About</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      aboutDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 w-84 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => openAboutWithTab('visi')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Tentang KoneksiAlumni
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Visi, misi, dan latar belakang platform jembatan karir.
                          </p>
                        </div>
                      </button>

                      <Link
                        to="/#about"
                        className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Target className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Cerita Lulusan
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Dari ruang kelas yang sama menuju panggung industri.
                          </p>
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => openAboutWithTab('alur')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Kode Etik & Alur Bimbingan
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Standar profesionalisme & perlindungan privasi mahasiswa.
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => openAboutWithTab('faq')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            FAQ & Pertanyaan Umum
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Jawaban lengkap seputar pendaftaran, sesi, dan teknis.
                          </p>
                        </div>
                      </button>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100 px-2 flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">25,000+ Alumni Terhubung</span>
                      <button
                        type="button"
                        onClick={() => openAboutWithTab('visi')}
                        className="text-blue-600 font-bold hover:underline cursor-pointer"
                      >
                        Buka Detail
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Network Dropdown (shadcn NavigationMenu style) */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterNetwork}
                onMouseLeave={handleMouseLeaveNetwork}
              >
                <div className="inline-flex items-center gap-1">
                  <Link
                    to="/direktori"
                    className={`text-sm font-semibold transition-colors py-2 ${
                      location.pathname === '/direktori'
                        ? 'text-blue-600 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Network
                  </Link>
                  <button
                    type="button"
                    onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
                    aria-label="Toggle network dropdown"
                    className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        networkDropdownOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                </div>

                {networkDropdownOpen && (
                  <div className="absolute top-full left-0 w-84 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="space-y-1">
                      <Link
                        to="/direktori"
                        className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Direktori Mentor Alumni
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Temukan senior kampus terverifikasi dan pesan slot bimbingan.
                          </p>
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => openNetworkWithTab('overview')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Statistik & Daya Serap
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            86% lulusan terserap kerja & 1,200+ posisi manajerial.
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => openNetworkWithTab('mitra')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Mitra 300+ Perusahaan
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Jejaring di GoTo, BCA, Mandiri, Shopee, Google, dan Telkom.
                          </p>
                        </div>
                      </button>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100 px-2 flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">300+ Perusahaan Mitra</span>
                      <button
                        type="button"
                        onClick={() => openNetworkWithTab('overview')}
                        className="text-blue-600 font-bold hover:underline cursor-pointer"
                      >
                        Lihat Infografis
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Programs Dropdown (shadcn NavigationMenu style) */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterPrograms}
                onMouseLeave={handleMouseLeavePrograms}
              >
                <button
                  type="button"
                  onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                  className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors py-2 cursor-pointer ${
                    programsDropdownOpen ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Programs</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      programsDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {programsDropdownOpen && (
                  <div className="absolute top-full left-0 w-84 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="space-y-1">
                      <Link
                        to="/direktori"
                        className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Review CV & Portofolio
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Bedah resume standar ATS & studi kasus Figma 30 menit.
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/direktori"
                        className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <VideoCamera className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Simulasi Mock Interview
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Latihan wawancara teknis & live coding via Jitsi Meet.
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/direktori"
                        className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            1-on-1 Career Sharing
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Diskusi jalur karir, negosiasi gaji, dan rujukan kerja.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Career Link */}
              <Link
                to="/#career"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Career
              </Link>

              {/* Events Link */}
              <Link
                to="/#events"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Events
              </Link>

              {/* News Link */}
              <Link
                to="/#news"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                News
              </Link>

              {/* Awards Link */}
              <Link
                to="/#impact"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Awards
              </Link>
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
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
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
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAboutModalOpen(true);
              }}
              className="w-full text-left px-3.5 py-2.5 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              About KoneksiAlumni
            </button>
            <Link
              to="/direktori"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Network (Direktori Alumni)
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setNetworkModalOpen(true);
              }}
              className="w-full text-left px-3.5 py-2.5 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Statistik & Jejaring Mitra
            </button>
            <Link
              to="/#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Programs
            </Link>
            <Link
              to="/#career"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Career
            </Link>
            <Link
              to="/#events"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Events
            </Link>
            <Link
              to="/#news"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-50"
            >
              News
            </Link>

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
                    className="block w-full text-center py-2.5 rounded-full border border-slate-200 text-slate-700 text-sm font-semibold cursor-pointer"
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

      {/* About Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        defaultTab={aboutModalTab}
      />

      {/* Network Modal */}
      <NetworkModal
        isOpen={networkModalOpen}
        onClose={() => setNetworkModalOpen(false)}
        defaultTab={networkModalTab}
      />
    </>
  );
};
