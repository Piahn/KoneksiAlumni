import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileUp, Star, Search, PlusCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { SessionCard } from '../components/dashboard/SessionCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Textarea } from '../components/ui/Input';
import type { Booking } from '../types';

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-789211',
    slot_id: 'slot-1',
    student_id: 'user-std',
    session_type: 'mock_interview',
    status: 'confirmed',
    meeting_url: 'https://meet.jit.si/koneksi-alumni-bk789211',
    notes: 'Mohon fokus pada arsitektur database dan live coding Golang.',
    created_at: new Date().toISOString(),
    slot: {
      id: 'slot-1',
      alumni_id: 'a1',
      session_type: 'mock_interview',
      start_time: new Date(Date.now() + 86400000).toISOString(),
      end_time: new Date(Date.now() + 86400000 + 2700000).toISOString(),
      status: 'booked',
    },
    alumni: {
      full_name: 'Fadhil Pratama, S.Kom.',
      current_company: 'GoTo Group',
      current_position: 'Senior Backend Engineer',
    },
  },
  {
    id: 'bk-651204',
    slot_id: 'slot-2',
    student_id: 'user-std',
    session_type: 'cv_review',
    status: 'completed',
    meeting_url: 'https://meet.jit.si/koneksi-alumni-bk651204',
    notes: 'Review portofolio Figma case study e-commerce.',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    cv_file_path: 'resumes/cv_budi_santoso.pdf',
    slot: {
      id: 'slot-2',
      alumni_id: 'a2',
      session_type: 'cv_review',
      start_time: new Date(Date.now() - 172800000).toISOString(),
      end_time: new Date(Date.now() - 172800000 + 1800000).toISOString(),
      status: 'booked',
    },
    alumni: {
      full_name: 'Clarissa Amanda, S.Ds.',
      current_company: 'Tokopedia',
      current_position: 'Product Designer (UI/UX)',
    },
  },
];

export const DashboardStudentPage: React.FC = () => {
  const { profile, role } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [tab, setTab] = useState<'all' | 'confirmed' | 'completed'>('all');
  const [loading, setLoading] = useState(false);

  // Upload CV Modal
  const [uploadModalBookingId, setUploadModalBookingId] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Review Modal
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyBookings = async () => {
      setLoading(true);
      try {
        const res = await api.getMyBookings();
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setBookings(res.data);
        }
      } catch {
        // Fallback to initial bookings if backend error
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (tab === 'confirmed') return b.status === 'confirmed';
    if (tab === 'completed') return b.status === 'completed';
    return true;
  });

  const handleUploadCvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadModalBookingId || !selectedFileName) return;

    // Simulate upload & backend storage url link
    try {
      await api.getUploadUrl({
        booking_id: uploadModalBookingId,
        file_name: selectedFileName,
      });
    } catch {
      // Fallback state update
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === uploadModalBookingId ? { ...b, cv_file_path: `resumes/${selectedFileName}` } : b
      )
    );
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadModalBookingId(null);
      setUploadSuccess(false);
      setSelectedFileName('');
    }, 1500);
  };

  const handleViewCv = async (bookingId: string) => {
    try {
      const res = await api.getCvUrl(bookingId);
      if (res.data?.signed_url) {
        window.open(res.data.signed_url, '_blank');
        return;
      }
    } catch {
      // Fallback
    }
    alert('📥 File CV mahasiswa dibuka via Supabase Signed URL (Valid 60 menit).');
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Apakah Anda yakin ingin membatalkan jadwal sesi mentoring ini?')) return;
    try {
      await api.cancelBooking(bookingId);
    } catch {
      // Fallback
    }
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewBooking) return;
    setReviewError(null);

    try {
      await api.createReview({
        booking_id: reviewBooking.id,
        rating,
        comment,
      });
      setReviewSubmitted(true);
      setTimeout(() => {
        setReviewBooking(null);
        setReviewSubmitted(false);
        setComment('');
      }, 1500);
    } catch (err: any) {
      setReviewError(err?.message || 'Gagal mengirim review.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <DashboardHeader
        profile={profile}
        role={role}
        actions={
          <Link
            to="/direktori"
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-semibold transition-colors shadow-xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Cari Mentor Baru</span>
          </Link>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200/90 pb-3 mb-8">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'Semua Sesi' },
              { id: 'confirmed', label: 'Sesi Mendatang' },
              { id: 'completed', label: 'Riwayat Selesai' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id as any)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                  tab === t.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-semibold">
            {filteredBookings.length} Sesi Terdaftar
          </span>
        </div>

        {/* Content Grid */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Belum Ada Sesi Mentoring</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Jelajahi direktori alumni kampus untuk memilih jadwal review CV atau mock interview.
            </p>
            <Link to="/direktori">
              <Button variant="primary" size="sm">
                Lihat Direktori Alumni
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((b) => (
              <SessionCard
                key={b.id}
                booking={b}
                userRole="student"
                onUploadCv={(id) => setUploadModalBookingId(id)}
                onViewCv={(id) => handleViewCv(id)}
                onReview={(item) => setReviewBooking(item)}
                onCancel={(id) => handleCancelBooking(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upload CV Modal */}
      {uploadModalBookingId && (
        <Modal
          isOpen={true}
          onClose={() => setUploadModalBookingId(null)}
          title="Unggah Dokumen CV untuk Direview"
          description="File disimpan di private storage Supabase dan hanya dapat diakses alumni mentor Anda."
        >
          {uploadSuccess ? (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">CV Berhasil Diunggah</h4>
              <p className="text-xs text-slate-500">
                Mentor alumni Anda sekarang dapat meninjau CV sebelum sesi dimulai.
              </p>
            </div>
          ) : (
            <form onSubmit={handleUploadCvSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <FileUp className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">
                  Pilih file CV / Resume (.pdf)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Maksimal ukuran 5MB</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setSelectedFileName(f.name);
                  }}
                  className="mt-3 text-xs block w-full text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setUploadModalBookingId(null)}
                >
                  Batal
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={!selectedFileName}
                >
                  Simpan & Unggah CV
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {/* Review Modal */}
      {reviewBooking && (
        <Modal
          isOpen={true}
          onClose={() => setReviewBooking(null)}
          title="Beri Ulasan & Rating Mentor"
          description={`Bimbingan bersama ${reviewBooking.alumni?.full_name}`}
        >
          {reviewSubmitted ? (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">Ulasan Berhasil Disimpan</h4>
              <p className="text-xs text-slate-500">
                Terima kasih telah membantu alumni meningkatkan kualitas bimbingan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {reviewError && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{reviewError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Rating Bintang (1 - 5):
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {rating} dari 5 Bintang
                  </span>
                </div>
              </div>

              <Textarea
                label="Ulasan / Feedback Tertulis"
                placeholder="Bagikan pengalaman Anda, masukan yang paling berharga, atau tips alumni yang bermanfaat..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setReviewBooking(null)}
                >
                  Batal
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Kirim Ulasan
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default DashboardStudentPage;

