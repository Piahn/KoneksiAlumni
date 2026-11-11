import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Input, PasswordInput } from '../components/ui/Input';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Harap isi alamat email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      setErrorMessage(
        error.message === 'Invalid login credentials'
          ? 'Email atau kata sandi tidak valid. Silakan periksa kembali atau gunakan akun demo.'
          : error.message || 'Gagal masuk akun. Silakan coba beberapa saat lagi.'
      );
      return;
    }

    navigate(from, { replace: true });
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Password123!');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-50">
      <div className="w-full max-w-5xl bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Pane: Visual & Brand Showcase (5 cols) */}
        <div className="lg:col-span-5 relative bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
          {/* Subtle background campus image texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
              alt="Campus background texture"
              width={1000}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Crest Logo */}
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
              <svg
                aria-hidden="true"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  d="M4 10C8 7 14 7 18 10C22 7 28 7 32 10V26C28 23 22 23 18 26C14 23 8 23 4 26V10Z"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M18 10V26" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-bold tracking-wider uppercase text-blue-100">
                Nusantara University Portal
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Beyond Graduation Starts Your Real Growth
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/80 mt-2.5 leading-relaxed font-normal">
                Satu akun untuk terhubung dengan ribuan senior kampus di industri teknologi, perbankan, dan kreatif.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-3 pt-2 text-xs text-blue-50/90">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Simulasi Mock Interview & Live Coding 1-on-1</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Review Mendalam Portofolio & Format CV ATS</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Privasi Dokumen Terenkripsi di Private Cloud</span>
              </div>
            </div>
          </div>

          {/* Testimonial Quote in Left Pane */}
          <div className="relative z-10 pt-8 mt-6 border-t border-white/10">
            <p className="text-xs italic text-blue-100 leading-relaxed font-light">
              "Bimbingan alumni membantu saya langsung mendapatkan tawaran kerja backend di GoTo dalam waktu 2 bulan setelah wisuda."
            </p>
            <div className="flex items-center gap-2.5 mt-3">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white">
                F
              </div>
              <div>
                <p className="text-xs font-bold text-white">Fadhil Pratama, S.Kom.</p>
                <p className="text-[10px] text-blue-200">Senior Backend Engineer @ GoTo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Login Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                Autentikasi Akun
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Selamat Datang Kembali
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Silakan masuk dengan email dan kata sandi akun Anda.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Alamat Email"
                aria-label="Alamat Email"
                type="email"
                placeholder="nama@kampus.ac.id atau email terdaftar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                leftElement={<Mail className="w-4 h-4" />}
              />

              <PasswordInput
                label="Kata Sandi"
                aria-label="Kata Sandi"
                placeholder="Masukkan kata sandi akun Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                leftElement={<Lock className="w-4 h-4" />}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 px-6 text-sm font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{isLoading ? 'Memverifikasi Akun...' : 'Masuk Sekarang'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Demo Helper Section with interactive badges */}
            <div className="pt-5 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Isi Cepat Akun Demo (Testing Instan):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillDemo('student@koneksialumni.test')}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-left transition-colors cursor-pointer group flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                      Akun Mahasiswa
                    </p>
                    <p className="text-[10px] text-slate-400">student@koneksialumni.test</p>
                  </div>
                  <UserCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                </button>

                <button
                  type="button"
                  onClick={() => handleFillDemo('alumni@koneksialumni.test')}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-left transition-colors cursor-pointer group flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                      Akun Mentor Alumni
                    </p>
                    <p className="text-[10px] text-slate-400">alumni@koneksialumni.test</p>
                  </div>
                  <UserCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                </button>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Belum memiliki akun?{' '}
                <Link to="/register" className="font-bold text-blue-600 hover:underline">
                  Daftar Akun Mahasiswa / Alumni
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
