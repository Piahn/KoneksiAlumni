import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Building, AlertCircle, CheckCircle, GraduationCap, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Input, PasswordInput, Select } from '../components/ui/Input';
import type { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('Teknik Informatika');
  const [graduationYear, setGraduationYear] = useState('2026');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName || !email || !password) {
      setErrorMessage('Harap lengkapi semua kolom wajib.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Kata sandi minimal harus terdiri dari 6 karakter.');
      return;
    }

    if (role === 'alumni' && (!company || !position)) {
      setErrorMessage('Alumni mentor wajib mengisi nama instansi/perusahaan dan posisi saat ini.');
      return;
    }

    setIsLoading(true);
    const { error } = await signUp({
      email,
      password,
      fullName,
      role,
      department,
      graduationYear: parseInt(graduationYear) || undefined,
      company: role === 'alumni' ? company : undefined,
      position: role === 'alumni' ? position : undefined,
    });
    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Gagal mendaftar. Silakan coba kembali.');
      return;
    }

    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-50">
      <div className="w-full max-w-5xl bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* Left Pane: Visual & Brand Showcase (5 cols) */}
        <div className="lg:col-span-5 relative bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
              alt="Campus students texture"
              width={1000}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
              <GraduationCap className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-wider uppercase text-blue-100">
                Registrasi Akun Komunitas
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {role === 'student'
                  ? 'Buka Peluang Karir Nyata Bersama Para Senior'
                  : 'Dedikasikan Pengalaman Anda untuk Almamater'}
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/80 mt-2.5 leading-relaxed font-normal">
                {role === 'student'
                  ? 'Dapatkan bimbingan resume, simulasi wawancara kerja, dan tips lolos seleksi industri langsung dari alumni terverifikasi.'
                  : 'Bantu junior Anda menembus seleksi perusahaan impian melalui sesi review 15–45 menit yang fleksibel.'}
              </p>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <p className="text-xl font-extrabold text-white">25,000+</p>
                <p className="text-[10px] text-blue-200 mt-0.5">Alumni Lulusan</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <p className="text-xl font-extrabold text-white">86%</p>
                <p className="text-[10px] text-blue-200 mt-0.5">Terserap Kerja 6 Bln</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 mt-6 border-t border-white/10 text-[11px] text-blue-200 flex items-center gap-2">
            <Users className="w-4 h-4 shrink-0 text-white" />
            <span>Terhubung dengan lebih dari 300+ perusahaan mitra nasional & multinasional.</span>
          </div>
        </div>

        {/* Right Pane: Register Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                Pendaftaran Akun
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Bergabung dengan Nusantara Network
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pilih peran Anda dan lengkapi profil akademik/profesional.
              </p>
            </div>

            {/* Segmented Role Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Daftar Sebagai:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    role === 'student'
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                      Mahasiswa
                    </span>
                    <span className="text-[10px] text-slate-500">Cari bimbingan karir</span>
                  </div>
                  {role === 'student' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setRole('alumni')}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    role === 'alumni'
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                      Alumni Mentor
                    </span>
                    <span className="text-[10px] text-slate-500">Buka slot bimbingan</span>
                  </div>
                  {role === 'alumni' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <Input
                label="Nama Lengkap Beserta Gelar"
                aria-label="Nama Lengkap"
                placeholder="Contoh: Budi Santoso, S.Kom."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                leftElement={<User className="w-4 h-4" />}
              />

              <Input
                label="Alamat Email"
                aria-label="Alamat Email"
                type="email"
                placeholder="nama@kampus.ac.id atau email pribadi"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftElement={<Mail className="w-4 h-4" />}
              />

              <PasswordInput
                label="Kata Sandi (Minimal 6 Karakter)"
                aria-label="Kata Sandi"
                placeholder="Buat kata sandi yang aman"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                leftElement={<Lock className="w-4 h-4" />}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select
                  label="Program Studi / Jurusan"
                  aria-label="Program Studi"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Desain Komunikasi Visual">Desain Komunikasi Visual</option>
                  <option value="Ilmu Komunikasi">Ilmu Komunikasi</option>
                  <option value="Manajemen Bisnis">Manajemen Bisnis</option>
                  <option value="Teknik Elektro">Teknik Elektro</option>
                </Select>

                <Input
                  label={role === 'student' ? 'Angkatan / Tahun Masuk' : 'Tahun Kelulusan'}
                  aria-label="Tahun"
                  type="number"
                  placeholder="2026"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                />
              </div>

              {role === 'alumni' && (
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <Input
                    label="Perusahaan / Instansi Saat Ini"
                    aria-label="Perusahaan Saat Ini"
                    placeholder="Contoh: PT GoTo Gojek Tokopedia"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required={role === 'alumni'}
                    leftElement={<Building className="w-4 h-4" />}
                  />
                  <Input
                    label="Posisi / Jabatan"
                    aria-label="Posisi Jabatan"
                    placeholder="Contoh: Senior Backend Engineer"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required={role === 'alumni'}
                    leftElement={<Briefcase className="w-4 h-4" />}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 px-6 text-sm font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <span>{isLoading ? 'Mendaftarkan Akun...' : 'Daftarkan Akun Sekarang'}</span>
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Sudah memiliki akun?{' '}
                <Link to="/login" className="font-bold text-blue-600 hover:underline">
                  Masuk ke Portal
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
