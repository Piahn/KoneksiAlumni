import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  MapPin,
  ArrowRight,
  Globe2,
  CheckCircle2
} from 'lucide-react';

interface NetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'overview' | 'industri' | 'mitra' | 'wilayah';
}

interface CompanyItem {
  name: string;
  category: string;
  alumniCount: string;
  badge: string;
}

const TOP_COMPANIES: CompanyItem[] = [
  { name: 'GoTo Group', category: 'Tech Ecosystem', alumniCount: '180+ Alumni', badge: 'Tier 1 Tech' },
  { name: 'Shopee Indonesia', category: 'E-Commerce & Fin', alumniCount: '145+ Alumni', badge: 'Regional' },
  { name: 'Bank Central Asia (BCA)', category: 'Banking & Fintech', alumniCount: '210+ Alumni', badge: 'Enterprise' },
  { name: 'Bank Mandiri', category: 'State Banking', alumniCount: '190+ Alumni', badge: 'Enterprise' },
  { name: 'Telkom Indonesia', category: 'Telecommunication', alumniCount: '260+ Alumni', badge: 'National Telco' },
  { name: 'Tokopedia', category: 'Marketplace', alumniCount: '130+ Alumni', badge: 'Tech Titan' },
  { name: 'Traveloka', category: 'OTA & Lifestyle', alumniCount: '85+ Alumni', badge: 'Tech Titan' },
  { name: 'Google Indonesia', category: 'Global Tech', alumniCount: '35+ Alumni', badge: 'Global MNC' },
  { name: 'Astra International', category: 'Automotive & Conglomerate', alumniCount: '175+ Alumni', badge: 'Conglomerate' },
];

export const NetworkModal: React.FC<NetworkModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'industri' | 'mitra' | 'wilayah'>(defaultTab);
  const navigate = useNavigate();

  const handleGoToDirectory = () => {
    onClose();
    navigate('/direktori');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Jejaring Alumni KoneksiAlumni"
      description="Eksplorasi ekosistem karir, sebaran industri, dan 300+ korporasi mitra tempat alumni berkarir."
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Shadcn-style Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Statistik
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('industri')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'industri'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sebaran Industri
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mitra')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'mitra'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mitra Perusahaan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wilayah')}
            className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'wilayah'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hub Wilayah
          </button>
        </div>

        {/* Tab 1: Overview & Key Metrics */}
        {activeTab === 'overview' && (
          <div className="space-y-4 text-xs text-slate-600 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <Users className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-xl font-extrabold text-slate-900">25,000+</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Alumni Terdaftar</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-900 text-white">
                <TrendingUp className="w-5 h-5 text-blue-400 mb-2" />
                <p className="text-xl font-extrabold text-white">86%</p>
                <p className="text-[11px] text-slate-300 mt-0.5">Kerja &lt; 6 Bulan</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <Building2 className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-xl font-extrabold text-slate-900">300+</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Perusahaan Mitra</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <Briefcase className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-xl font-extrabold text-slate-900">1,200+</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Posisi Manajerial</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-950 text-xs">Jejaring Aktif, Responsif & Terverifikasi</h4>
                <p className="text-[11px] text-blue-900/80 mt-1 leading-relaxed">
                  Seluruh mentor yang terdaftar di KoneksiAlumni telah melalui validasi status alumni resmi dan verifikasi riwayat karir via akun LinkedIn profesional, memastikan kualitas bimbingan terbaik.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sebaran Industri */}
        {activeTab === 'industri' && (
          <div className="space-y-3.5 text-xs text-slate-600 animate-in fade-in duration-200">
            <p className="text-[11px] text-slate-500">
              Distribusi lulusan berdasarkan sektor industri dan bidang keahlian terkini:
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-semibold text-slate-900 text-xs mb-1">
                  <span>Teknologi, AI & Produk Digital</span>
                  <span className="text-blue-600 font-bold">42%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-900 text-xs mb-1">
                  <span>Perbankan, Fintech & Keuangan</span>
                  <span className="text-blue-600 font-bold">26%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '26%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-900 text-xs mb-1">
                  <span>Telekomunikasi & Konglomerasi Industri</span>
                  <span className="text-blue-600 font-bold">18%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '18%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-900 text-xs mb-1">
                  <span>Agensi Kreatif, Desain UI/UX & Media</span>
                  <span className="text-blue-600 font-bold">14%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '14%' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mitra Perusahaan */}
        {activeTab === 'mitra' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <p className="text-[11px] text-slate-500">
              Perusahaan terkemuka dengan konsentrasi alumni tertinggi yang aktif membimbing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {TOP_COMPANIES.map((company) => (
                <div
                  key={company.name}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {company.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-900">{company.alumniCount}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mt-2">{company.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{company.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Hub Wilayah */}
        {activeTab === 'wilayah' && (
          <div className="space-y-3.5 text-xs text-slate-600 animate-in fade-in duration-200">
            <p className="text-[11px] text-slate-500">
              Pusat domisili karir alumni KoneksiAlumni baik secara on-site maupun *full-remote*:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Jabodetabek</h5>
                    <p className="text-[11px] text-slate-400">Headquarters & Tech Center</p>
                  </div>
                </div>
                <span className="font-extrabold text-blue-600 text-sm">55%</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Bandung & Jawa Barat</h5>
                    <p className="text-[11px] text-slate-400">Startups & Creative Studio</p>
                  </div>
                </div>
                <span className="font-extrabold text-blue-600 text-sm">15%</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Surabaya & Jawa Timur</h5>
                    <p className="text-[11px] text-slate-400">Manufaktur & FMCG</p>
                  </div>
                </div>
                <span className="font-extrabold text-blue-600 text-sm">12%</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Globe2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">Singapura & Remote Global</h5>
                    <p className="text-[11px] text-slate-400">Silicon Valley & APAC</p>
                  </div>
                </div>
                <span className="font-extrabold text-blue-600 text-sm">8%</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2 text-xs font-semibold transition-colors cursor-pointer"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={handleGoToDirectory}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Buka Direktori Alumni</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
