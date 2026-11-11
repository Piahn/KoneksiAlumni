import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <GraduationCap className="w-7 h-7" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-slate-800 mt-2">Halaman Tidak Ditemukan</h2>
      <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">
        Halaman yang Anda cari mungkin telah dipindahkan atau tautan yang Anda tuju salah.
      </p>
      <Link to="/">
        <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;

