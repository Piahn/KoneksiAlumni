import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Logo } from '../ui/Logo';
import {
  ShieldCheck,
  Target,
  HeartHandshake,
  CheckCircle2,
  ChevronDown,
  Building2,
  Clock,
  Mail,
  Phone,
  HelpCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'visi' | 'alur' | 'faq' | 'kontak';
}

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Apakah seluruh sesi mentorship di KoneksiAlumni berbayar?',
    a: 'Tidak, 100% GRATIS. KoneksiAlumni adalah platform pengabdian almamater di mana para alumni secara sukarela mendedikasikan waktu mereka untuk membimbing adik tingkat.',
  },
  {
    q: 'Bagaimana cara menjadwalkan sesi bimbingan dengan mentor?',
    a: 'Buka menu Direktori Alumni, pilih mentor sesuai bidang minat atau industri impian Anda, pilih tanggal dan slot waktu yang tersedia, isi catatan ekspektasi dan tautan CV/portfolio Anda, lalu klik konfirmasi.',
  },
  {
    q: 'Bagaimana tautan video call disediakan?',
    a: 'Sistem KoneksiAlumni secara otomatis mengenerate tautan ruang rapat terenkripsi via Jitsi Meet untuk setiap booking yang disetujui. Tautan dapat diakses langsung dari Dashboard Anda.',
  },
  {
    q: 'Apakah alumni dari semua angkatan & fakultas boleh bergabung menjadi mentor?',
    a: 'Sangat terbuka! Kami menyambut seluruh alumni lintas fakultas (Teknik, Ilmu Komputer, DKV, Bisnis, Komunikasi, dll.) yang telah bekerja aktif dan ingin berbagi pengalaman karir.',
  },
  {
    q: 'Bagaimana keamanan data dan dokumen CV saya terjamin?',
    a: 'Setiap file CV disimpan di private storage Supabase dengan enkripsi tingkat industri dan hanya dapat diakses melalui signed-URL sementara oleh mentor yang bersangkutan.',
  },
];

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'visi',
}) => {
  const [activeTab, setActiveTab] = useState<'visi' | 'alur' | 'faq' | 'kontak'>(defaultTab);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tentang KoneksiAlumni Platform"
      description="Inisiatif digital akselerasi karir menghubungkan mahasiswa aktif dengan jejaring alumni profesional."
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Shadcn-style Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveTab('visi')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'visi'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Visi & Misi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('alur')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'alur'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Alur Bimbingan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FAQ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kontak')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'kontak'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kontak
          </button>
        </div>

        {/* Tab 1: Visi & Misi */}
        {activeTab === 'visi' && (
          <div className="space-y-4 text-xs text-slate-600 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3.5">
              <Logo size="sm" />
              <div>
                <p className="font-bold text-blue-950 text-xs">Jembatan Sinergi Lintas Angkatan</p>
                <p className="text-[11px] text-blue-800/80 mt-0.5">
                  Menghubungkan mahasiswa dengan lebih dari 25,000 alumni di berbagai perusahaan terkemuka dunia.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <Target className="w-5 h-5 text-blue-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-xs mb-1">Akselerasi Karir</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Menekan masa tunggu kerja lulusan baru di bawah 3 bulan melalui mentoring intensif.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-xs mb-1">Privasi Terjamin</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Penyimpanan dokumen CV berenkripsi Supabase dengan perlindungan signed-URL sementara.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <HeartHandshake className="w-5 h-5 text-amber-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-xs mb-1">100% Bebas Biaya</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Semangat kekeluargaan almamater tanpa pungutan komersial apa pun bagi mahasiswa.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Nilai Utama Ekosistem</span>
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                KoneksiAlumni meyakini bahwa kesuksesan seorang lulusan bukan semata nilai akademis, melainkan kesiapan menghadapi dinamika industri nyata melalui bimbingan praktis dari para praktisi yang telah melaluinya.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Alur Bimbingan */}
        {activeTab === 'alur' && (
          <div className="space-y-3.5 text-xs text-slate-600 animate-in fade-in duration-200">
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Pilih Mentor & Bidang Minat</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Telusuri direktori berdasarkan keahlian (Backend, UI/UX, AI, Product) atau perusahaan tujuan (GoTo, Shopee, Mandiri).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Reservasi Slot Waktu & Unggah Profil</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Pilih slot waktu luang yang dibuka mentor. Sertakan tautan resume atau portfolio Figma beserta catatan kendala yang ingin dibahas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Sesi Tatap Muka Virtual via Jitsi Meet</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Pada waktu yang dijadwalkan, masuk ke ruang rapat langsung dari Dashboard. Dapatkan umpan balik langsung dan arahan karir personal.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 flex items-center gap-2.5 text-[11px]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Kode etik: Seluruh sesi wajib menjaga etika profesionalisme dan kerahasiaan materi perusahaan.</span>
            </div>
          </div>
        )}

        {/* Tab 3: FAQ (Shadcn Accordion Style) */}
        {activeTab === 'faq' && (
          <div className="space-y-2 animate-in fade-in duration-200">
            {FAQS.map((faq, idx) => {
              const isOpenItem = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-white transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpenItem ? null : idx)}
                    className="w-full text-left p-3 flex items-center justify-between gap-3 text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpenItem ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpenItem && (
                    <div className="px-3 pb-3 pt-1 text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 4: Kontak & Kantor */}
        {activeTab === 'kontak' && (
          <div className="space-y-3.5 text-xs text-slate-600 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Sekretariat KoneksiAlumni</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Gedung Rektorat Lt. 2, Pusat Pengembangan Karir & Jejaring Alumni Terpadu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Jam Operasional Layanan</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Senin – Jumat: 09:00 – 17:00 WIB • Sabtu: 09:00 – 13:00 WIB
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Email Pengurus</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    alumni@koneksialumni.ac.id / halo@koneksialumni.id
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">WhatsApp Hotline</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    +62 812-3456-7890 (Respon cepat 1x24 jam)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>KoneksiAlumni Platform • Versi 2.0</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-semibold transition-colors cursor-pointer"
          >
            Tutup Dialog
          </button>
        </div>
      </div>
    </Modal>
  );
};
