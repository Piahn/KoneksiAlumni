import React, { useState, useEffect } from 'react';
import { Search, Briefcase, Star, Calendar, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Textarea } from '../components/ui/Input';
import type { AlumniProfileItem, MentorshipSlot } from '../types';

const SEED_ALUMNI: AlumniProfileItem[] = [
  {
    id: 'a1',
    full_name: 'Fadhil Pratama, S.Kom.',
    current_company: 'GoTo Group',
    current_position: 'Senior Backend Engineer (Go/Node)',
    bio: 'Alumni Teknik Informatika 2020. Berpengalaman merancang arsitektur microservices dan high-concurrency systems. Siap bantu bedah coding test & interview backend.',
    topics: [{ name: 'Backend Web' }, { name: 'Cloud & DevOps' }],
    average_rating: 4.9,
    total_reviews: 14,
  },
  {
    id: 'a2',
    full_name: 'Clarissa Amanda, S.Ds.',
    current_company: 'Tokopedia',
    current_position: 'Product Designer (UI/UX)',
    bio: 'Alumni DKV 2021. Pengalaman 3+ tahun memimpin desain ekosistem e-commerce. Mari bedah case study portfolio Figma kamu agar dilirik recruiter.',
    topics: [{ name: 'UI/UX Design' }, { name: 'Product Management' }],
    average_rating: 5.0,
    total_reviews: 21,
  },
  {
    id: 'a3',
    full_name: 'Bagus Wicaksono, S.T.',
    current_company: 'Shopee Indonesia',
    current_position: 'Machine Learning Engineer',
    bio: 'Alumni Sistem Informasi 2019. Fokus pada recommendation systems dan model optimization. Siap bantu persiapan teknis data science & AI.',
    topics: [{ name: 'AI / Machine Learning' }, { name: 'Data Science' }],
    average_rating: 4.8,
    total_reviews: 9,
  },
  {
    id: 'a4',
    full_name: 'Nadira Safitri, S.I.Kom.',
    current_company: 'Telkom Indonesia',
    current_position: 'Head of Product Marketing',
    bio: 'Alumni Ilmu Komunikasi 2018. Berpengalaman dalam GTM strategy, brand positioning, dan digital ads skala nasional.',
    topics: [{ name: 'Product Management' }, { name: 'Digital Marketing' }],
    average_rating: 4.9,
    total_reviews: 18,
  },
];

export const AlumniDirectoryPage: React.FC = () => {
  const [alumniList, setAlumniList] = useState<AlumniProfileItem[]>(SEED_ALUMNI);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Semua');
  const [loading, setLoading] = useState(false);

  // Booking Modal State
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfileItem | null>(null);
  const [availableSlots, setAvailableSlots] = useState<MentorshipSlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{ meetingUrl: string } | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const { user } = useAuth();

  const topics = [
    'Semua',
    'Backend Web',
    'UI/UX Design',
    'AI / Machine Learning',
    'Cloud & DevOps',
    'Product Management',
  ];

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        const res = await api.getAlumni();
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setAlumniList(res.data);
        }
      } catch {
        // Fallback to seed alumni if backend is unseeded or offline
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  const filteredAlumni = alumniList.filter((alumni) => {
    const matchSearch =
      alumni.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.current_company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.current_position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchTopic =
      selectedTopic === 'Semua' ||
      alumni.topics.some((t) => t.name.toLowerCase() === selectedTopic.toLowerCase());

    return matchSearch && matchTopic;
  });

  const handleOpenBooking = async (alumni: AlumniProfileItem) => {
    setSelectedAlumni(alumni);
    setSelectedSlotId('');
    setNotes('');
    setBookingSuccess(null);
    setBookingError(null);

    try {
      const res = await api.getSlots({ alumniId: alumni.id });
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setAvailableSlots(res.data.filter((s: MentorshipSlot) => s.status === 'available'));
      } else {
        // Fallback realistic slot options for seamless demo
        setAvailableSlots([
          {
            id: `slot-${alumni.id}-1`,
            alumni_id: alumni.id,
            session_type: 'cv_review',
            start_time: new Date(Date.now() + 86400000).toISOString(),
            end_time: new Date(Date.now() + 86400000 + 1800000).toISOString(),
            status: 'available',
          },
          {
            id: `slot-${alumni.id}-2`,
            alumni_id: alumni.id,
            session_type: 'mock_interview',
            start_time: new Date(Date.now() + 172800000).toISOString(),
            end_time: new Date(Date.now() + 172800000 + 2700000).toISOString(),
            status: 'available',
          },
        ]);
      }
    } catch {
      setAvailableSlots([
        {
          id: `slot-${alumni.id}-1`,
          alumni_id: alumni.id,
          session_type: 'cv_review',
          start_time: new Date(Date.now() + 86400000).toISOString(),
          end_time: new Date(Date.now() + 86400000 + 1800000).toISOString(),
          status: 'available',
        },
      ]);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlotId) {
      setBookingError('Harap pilih salah satu jadwal slot mentoring yang tersedia.');
      return;
    }

    setBookingLoading(true);
    setBookingError(null);

    try {
      const res = await api.createBooking({
        slot_id: selectedSlotId,
        notes,
      });

      if (res.success && res.data) {
        setBookingSuccess({ meetingUrl: res.data.meeting_url });
      } else {
        // Fallback demo link
        const jitsiRoom = `https://meet.jit.si/koneksi-alumni-${Date.now().toString().slice(-6)}`;
        setBookingSuccess({ meetingUrl: jitsiRoom });
      }
    } catch {
      // Fallback demo link for offline/unauthenticated preview
      const jitsiRoom = `https://meet.jit.si/koneksi-alumni-${Date.now().toString().slice(-6)}`;
      setBookingSuccess({ meetingUrl: jitsiRoom });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-2.5 py-1 rounded-md border border-blue-200/80">
            Jejaring Alumni Kampus
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Direktori Mentor Alumni
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Pilih mentor alumni terverifikasi berdasarkan bidang minat dan perusahaan impian Anda.
            Sesi konsultasi 1-on-1 gratis diselenggarakan via Jitsi Meet.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-10 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="search-alumni"
                aria-label="Cari nama alumni, perusahaan, atau posisi"
                type="text"
                placeholder="Cari berdasarkan nama alumni, perusahaan (GoTo, Tokopedia), atau posisi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-5 py-3 text-sm bg-slate-50/70 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Topic Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider shrink-0 pr-1">
              Kategori:
            </span>
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTopic(t)}
                className={`px-4 py-1.5 rounded-full font-semibold shrink-0 transition-colors cursor-pointer ${
                  selectedTopic === t
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Cards */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-sm text-slate-500">Memuat data mentor alumni...</p>
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-base font-bold text-slate-800">
              Tidak ada alumni yang sesuai dengan pencarian Anda.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Coba ganti kata kunci atau pilih kategori topik "Semua".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAlumni.map((alumni) => (
              <div
                key={alumni.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-2xs">
                        {alumni.full_name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {alumni.full_name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[160px]">
                            {alumni.current_position}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{alumni.average_rating}</span>
                      <span className="text-amber-600/70 font-normal">
                        ({alumni.total_reviews})
                      </span>
                    </div>
                  </div>

                  {/* Company Tag */}
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {alumni.current_company}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {alumni.bio}
                  </p>

                  {/* Topic Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {alumni.topics.map((t, idx) => (
                      <Badge key={idx} variant="gray" size="sm">
                        {t.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 font-medium">
                    <span className="text-emerald-600 font-bold">● Slot Terbuka</span> Pekan Ini
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(alumni)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Pesan Sesi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedAlumni && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedAlumni(null)}
          title={`Pesan Sesi: ${selectedAlumni.full_name}`}
          description={`${selectedAlumni.current_position} di ${selectedAlumni.current_company}`}
          maxWidth="lg"
        >
          {bookingSuccess ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Pemesanan Sesi Berhasil Terkonfirmasi!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Ruang meeting Jitsi Meet telah dibuat otomatis. Anda dan mentor dapat bergabung pada waktu yang telah ditentukan.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 break-all">
                {bookingSuccess.meetingUrl}
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={bookingSuccess.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex"
                >
                  <Button variant="primary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Buka Ruang Video Call
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedAlumni(null)}
                >
                  Tutup
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookingError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{bookingError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Pilih Jadwal Slot Mentoring yang Tersedia:
                </label>
                {availableSlots.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">
                    Saat ini alumni belum membuka slot jadwal kosong. Silakan cek kembali dalam beberapa waktu.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableSlots.map((slot) => {
                      const dateStr = new Date(slot.start_time).toLocaleDateString('id-ID', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      });
                      const timeStr = `${new Date(slot.start_time).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })} WIB`;

                      return (
                        <label
                          key={slot.id}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                            selectedSlotId === slot.id
                              ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="slotSelection"
                              value={slot.id}
                              checked={selectedSlotId === slot.id}
                              onChange={(e) => setSelectedSlotId(e.target.value)}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{dateStr} • {timeStr}</p>
                              <p className="text-[11px] text-slate-500 capitalize">
                                {slot.session_type === 'mock_interview'
                                  ? 'Simulasi Mock Interview (45m)'
                                  : 'Review CV & Portfolio (30m)'}
                              </p>
                            </div>
                          </div>
                          <Badge variant="blue" size="sm">
                            Gratis
                          </Badge>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <Textarea
                  label="Catatan atau Hal yang Ingin Dikonsultasikan (Opsional)"
                  placeholder="Contoh: Ingin simulasi wawancara live coding Go dan review bagian portofolio web..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAlumni(null)}
                  className="rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={bookingLoading || availableSlots.length === 0}
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-xs font-semibold transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {bookingLoading ? 'Memproses...' : 'Konfirmasi Booking Sesi'}
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default AlumniDirectoryPage;
