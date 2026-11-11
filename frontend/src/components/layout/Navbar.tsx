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
  HelpCircle,
  Brain,
  Handshake,
  Calendar,
  Globe2,
  HeartHandshake,
  Landmark,
  Award
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
    setNetworkDropdownOpen(false);
    setProgramsDropdownOpen(false);
  };

  const handleMouseLeaveAbout = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 180);
  };

  const handleMouseEnterNetwork = () => {
    if (networkTimeoutRef.current) clearTimeout(networkTimeoutRef.current);
    setNetworkDropdownOpen(true);
    setAboutDropdownOpen(false);
    setProgramsDropdownOpen(false);
  };

  const handleMouseLeaveNetwork = () => {
    networkTimeoutRef.current = setTimeout(() => {
      setNetworkDropdownOpen(false);
    }, 180);
  };

  const handleMouseEnterPrograms = () => {
    if (programsTimeoutRef.current) clearTimeout(programsTimeoutRef.current);
    setProgramsDropdownOpen(true);
    setAboutDropdownOpen(false);
    setNetworkDropdownOpen(false);
  };

  const handleMouseLeavePrograms = () => {
    programsTimeoutRef.current = setTimeout(() => {
      setProgramsDropdownOpen(false);
    }, 180);
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
              className="flex items-center gap-3 focus:outline-none rounded-lg group shrink-0"
            >
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation Links with Spacious Mega Menus (Exact Image 1 Style) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {/* 1. About Dropdown (Mega Menu Style) */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterAbout}
                onMouseLeave={handleMouseLeaveAbout}
              >
                <button
                  type="button"
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 cursor-pointer ${
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
                  <div className="absolute top-full -left-12 lg:-left-20 w-[740px] xl:w-[800px] bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-7 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-5">
                      Tentang Kami
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                      {/* Visi & Misi */}
                      <button
                        type="button"
                        onClick={() => openAboutWithTab('visi')}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="text-blue-600 shrink-0 mt-0.5">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Visi & Misi Platform
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Inisiatif digital akselerasi karir dan sinergi almamater lintas angkatan.
                          </p>
                        </div>
                      </button>

                      {/* Cerita Lulusan */}
                      <Link
                        to="/#about"
                        onClick={() => setAboutDropdownOpen(false)}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="text-emerald-600 shrink-0 mt-0.5">
                          <Target className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Cerita Lulusan
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Dari ruang kuliah yang sama menuju panggung karir industri global.
                          </p>
                        </div>
                      </Link>

                      {/* Standar & Kode Etik */}
                      <button
                        type="button"
                        onClick={() => openAboutWithTab('alur')}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="text-indigo-600 shrink-0 mt-0.5">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Kode Etik Mentoring
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Standar profesionalisme mentoring & keamanan data CV terenkripsi.
                          </p>
                        </div>
                      </button>

                      {/* FAQ & Pusat Bantuan */}
                      <button
                        type="button"
                        onClick={() => openAboutWithTab('faq')}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="text-amber-600 shrink-0 mt-0.5">
                          <HelpCircle className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            FAQ & Tanya Jawab
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Jawaban lengkap seputar pemesanan jadwal, Jitsi Meet, dan akun.
                          </p>
                        </div>
                      </button>

                      {/* Sekretariat Kampus */}
                      <button
                        type="button"
                        onClick={() => openAboutWithTab('kontak')}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="text-sky-600 shrink-0 mt-0.5">
                          <Landmark className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Sekretariat Kampus
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Gedung Rektorat Lt. 2, jam layanan operasional, email & hotline.
                          </p>
                        </div>
                      </button>

                      {/* 100% Bebas Biaya */}
                      <button
                        type="button"
                        onClick={() => openAboutWithTab('visi')}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="text-rose-600 shrink-0 mt-0.5">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              100% Bebas Biaya
                            </h4>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                              Gratis
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Pengabdian sukarela alumni tanpa komersialisasi bagi mahasiswa aktif.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Network Dropdown (Mega Menu Style) */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterNetwork}
                onMouseLeave={handleMouseLeaveNetwork}
              >
                <button
                  type="button"
                  onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 cursor-pointer ${
                    networkDropdownOpen ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Network</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      networkDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {networkDropdownOpen && (
                  <div className="absolute top-full -left-48 lg:-left-56 w-[740px] xl:w-[820px] bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-7 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-5">
                      Jejaring Alumni
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                      {/* Direktori Mentor */}
                      <Link
                        to="/direktori"
                        onClick={() => setNetworkDropdownOpen(false)}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="text-blue-600 shrink-0 mt-0.5">
                          <Users className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Direktori Mentor
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Temukan 25,000+ senior kampus dan jadwalkan sesi tatap muka 1-on-1.
                          </p>
                        </div>
                      </Link>

                      {/* Statistik Daya Serap */}
                      <button
                        type="button"
                        onClick={() => openNetworkWithTab('overview')}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="text-emerald-600 shrink-0 mt-0.5">
                          <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Statistik Daya Serap
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            86% lulusan terserap kerja &lt; 6 bulan & 1,200+ posisi manajerial.
                          </p>
                        </div>
                      </button>

                      {/* Mitra 300+ Perusahaan */}
                      <button
                        type="button"
                        onClick={() => openNetworkWithTab('mitra')}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="text-indigo-600 shrink-0 mt-0.5">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Mitra 300+ Perusahaan
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Persebaran alumni di GoTo, BCA, Mandiri, Shopee, Google & Telkom.
                          </p>
                        </div>
                      </button>

                      {/* Alumni Gathering */}
                      <Link
                        to="/#events"
                        onClick={() => setNetworkDropdownOpen(false)}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="text-amber-600 shrink-0 mt-0.5">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Alumni Gathering & Event
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Temu akbar tahunan, webinar karir, dan sesi sharing berkala.
                          </p>
                        </div>
                      </Link>

                      {/* Hub Wilayah & Remote */}
                      <button
                        type="button"
                        onClick={() => openNetworkWithTab('wilayah')}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="text-sky-600 shrink-0 mt-0.5">
                          <Globe2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Hub Wilayah & Global
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Konsentrasi alumni di Jabodetabek, Bandung, Surabaya, dan mancanegara.
                          </p>
                        </div>
                      </button>

                      {/* Gabung Jadi Mentor */}
                      <Link
                        to="/register"
                        onClick={() => setNetworkDropdownOpen(false)}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="text-teal-600 shrink-0 mt-0.5">
                          <HeartHandshake className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              Gabung Jadi Mentor
                            </h4>
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                              Alumni
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Buka slot luang Anda dan bantu bimbing adik tingkat almamater.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Programs Dropdown (Exact Mega Menu Layout Matching Image 1) */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterPrograms}
                onMouseLeave={handleMouseLeavePrograms}
              >
                <button
                  type="button"
                  onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 cursor-pointer ${
                    programsDropdownOpen ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Program</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      programsDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {programsDropdownOpen && (
                  <div className="absolute top-full -left-64 lg:-left-72 w-[760px] xl:w-[840px] bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-7 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Header Heading matching Image 1 */}
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-5">
                      Program
                    </h3>

                    {/* 3-Column x 2-Row Mega Menu Grid Matching Image 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                      {/* Col 1, Row 1: Review CV & Portofolio (Like Online Course) */}
                      <Link
                        to="/direktori"
                        onClick={() => setProgramsDropdownOpen(false)}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="text-teal-700 shrink-0 mt-0.5">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Review CV & Portofolio
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Bedah resume standar ATS & studi kasus portofolio 30 menit bersama praktisi.
                          </p>
                        </div>
                      </Link>

                      {/* Col 2, Row 1: Simulasi Mock Interview (Like Bootcamp) */}
                      <Link
                        to="/direktori"
                        onClick={() => setProgramsDropdownOpen(false)}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="text-teal-700 shrink-0 mt-0.5">
                          <VideoCamera className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Simulasi Mock Interview
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Latihan wawancara teknis, live coding, dan problem solving via Jitsi Meet.
                          </p>
                        </div>
                      </Link>

                      {/* Col 3, Row 1: Kemitraan Karir Industri (Like Partnership) */}
                      <Link
                        to="/#career"
                        onClick={() => setProgramsDropdownOpen(false)}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="text-teal-700 shrink-0 mt-0.5">
                          <Handshake className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Kemitraan Karir Industri
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Kerjasama rekrutmen langsung & magang dengan 300+ korporasi dan startup.
                          </p>
                        </div>
                      </Link>

                      {/* Col 1, Row 2: 1-on-1 Career Sharing (Like Talks) */}
                      <Link
                        to="/direktori"
                        onClick={() => setProgramsDropdownOpen(false)}
                        className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="text-teal-700 shrink-0 mt-0.5">
                          <Compass className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            1-on-1 Career Sharing
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Tanya jawab jenjang karir, negosiasi gaji, dan rujukan kerja (referral) internal.
                          </p>
                        </div>
                      </Link>

                      {/* Col 2, Row 2: AI Career Coach (Like AI Guru - Segera Hadir) */}
                      <div className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl text-left opacity-90">
                        <div className="text-slate-600 shrink-0 mt-0.5">
                          <Brain className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">
                              AI Career Coach
                            </h4>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                              Segera Hadir
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Analisis instan kesesuaian kata kunci resume dengan kualifikasi lowongan.
                          </p>
                        </div>
                      </div>

                      {/* Col 3, Row 2: Tracer Study & Corporate Training (Like Corporate Training - Segera Hadir) */}
                      <div className="group flex items-start gap-3.5 -m-2.5 p-2.5 rounded-xl text-left opacity-90">
                        <div className="text-slate-600 shrink-0 mt-0.5">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">
                              Corporate Training
                            </h4>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                              Segera Hadir
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed mt-1">
                            Pelatihan peningkatan kapasitas talenta kerja sama instansi & almamater.
                          </p>
                        </div>
                      </div>
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

            {/* Auth Action (Pill Buttons) */}
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
              Program Mentorship
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
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 rounded-full border border-slate-200 text-slate-700 text-sm font-semibold shadow-2xs"
                  >
                    Daftar
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-xs"
                  >
                    Masuk
                  </Link>
                </div>
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
