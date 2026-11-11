import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Video as VideoCamera, FileText, ArrowLeft, ExternalLink, ShieldCheck, User } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import type { Booking } from '../types';

export const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;
      try {
        const res = await api.getBookingById(id);
        if (res.data) setBooking(res.data);
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-slate-500">Memuat rincian sesi...</p>
      </div>
    );
  }

  const title =
    booking?.session_type === 'mock_interview'
      ? 'Simulasi Mock Interview'
      : booking?.session_type === 'cv_review'
      ? 'Review CV & Portfolio'
      : 'Career Sharing Session';

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </Link>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="green">Sesi Terkonfirmasi</Badge>
                <span className="text-xs font-mono text-slate-400">ID: #{id}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h1>
            </div>

            {booking?.meeting_url && (
              <a href={booking.meeting_url} target="_blank" rel="noreferrer">
                <Button variant="primary" size="md" rightIcon={<ExternalLink className="w-4 h-4" />}>
                  Masuk Ruang Jitsi
                </Button>
              </a>
            )}
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Partner Konsultasi
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {booking?.alumni?.full_name?.charAt(0) || <User className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {booking?.alumni?.full_name || 'Alumni Mentor'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {booking?.alumni?.current_position} • {booking?.alumni?.current_company}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Jadwal & Waktu
              </span>
              <div className="space-y-1 text-xs text-slate-700">
                <p className="flex items-center gap-2 font-semibold">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>
                    {booking?.slot?.start_time
                      ? new Date(booking.slot.start_time).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'Jadwal Ditentukan'}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>
                    {booking?.slot?.start_time
                      ? `${new Date(booking.slot.start_time).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })} WIB`
                      : ''}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-100 space-y-2 text-xs text-blue-900">
            <h4 className="font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Petunjuk & Etika Sesi Mentoring:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>Hadir 5 menit sebelum jadwal sesi dimulai.</li>
              <li>Pastikan mikrofon dan kamera berfungsi dengan baik.</li>
              <li>Siapkan dokumen CV atau portofolio Figma yang hendak dibahas.</li>
              <li>Catat pertanyaan dan poin masukan dari alumni untuk evaluasi diri.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;

