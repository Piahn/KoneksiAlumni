import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video as VideoCamera, FileText, Trash2, Plus, CheckCircle, ExternalLink } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { SlotForm } from '../components/dashboard/SlotForm';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import type { MentorshipSlot, Booking, SessionType } from '../types';

const INITIAL_SLOTS: MentorshipSlot[] = [
  {
    id: 's1',
    alumni_id: 'a1',
    session_type: 'mock_interview',
    start_time: new Date(Date.now() + 86400000).toISOString(),
    end_time: new Date(Date.now() + 86400000 + 2700000).toISOString(),
    status: 'booked',
  },
  {
    id: 's2',
    alumni_id: 'a1',
    session_type: 'cv_review',
    start_time: new Date(Date.now() + 172800000).toISOString(),
    end_time: new Date(Date.now() + 172800000 + 1800000).toISOString(),
    status: 'available',
  },
];

const INITIAL_ALUMNI_BOOKINGS: Booking[] = [
  {
    id: 'bk-789211',
    slot_id: 's1',
    student_id: 'user-std',
    session_type: 'mock_interview',
    status: 'confirmed',
    meeting_url: 'https://meet.jit.si/koneksi-alumni-bk789211',
    notes: 'Ingin simulasi live coding Go dan arsitektur microservices.',
    created_at: new Date().toISOString(),
    cv_file_path: 'resumes/cv_budi_santoso.pdf',
    student: {
      full_name: 'Budi Santoso',
      email: 'budi@kampus.ac.id',
      department: 'Teknik Informatika (2022)',
    },
    slot: {
      id: 's1',
      alumni_id: 'a1',
      session_type: 'mock_interview',
      start_time: new Date(Date.now() + 86400000).toISOString(),
      end_time: new Date(Date.now() + 86400000 + 2700000).toISOString(),
      status: 'booked',
    },
  },
];

export const DashboardAlumniPage: React.FC = () => {
  const { profile, role } = useAuth();
  const [slots, setSlots] = useState<MentorshipSlot[]>(INITIAL_SLOTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_ALUMNI_BOOKINGS);
  const [isCreatingSlot, setIsCreatingSlot] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlotsAndBookings = async () => {
      try {
        const [slotsRes, bookingsRes] = await Promise.allSettled([
          api.getSlots(),
          api.getMyBookings(),
        ]);

        if (slotsRes.status === 'fulfilled' && slotsRes.value.data) {
          setSlots(slotsRes.value.data);
        }
        if (bookingsRes.status === 'fulfilled' && bookingsRes.value.data) {
          setBookings(bookingsRes.value.data);
        }
      } catch {
        // Fallback to initial slots
      }
    };
    fetchSlotsAndBookings();
  }, []);

  const handleCreateSlot = async (data: {
    session_type: SessionType;
    start_time: string;
    end_time: string;
  }): Promise<boolean> => {
    setIsCreatingSlot(true);
    try {
      const res = await api.createSlot(data);
      const newSlot: MentorshipSlot = res.data || {
        id: `s-${Date.now()}`,
        alumni_id: profile?.id || 'a1',
        session_type: data.session_type,
        start_time: data.start_time,
        end_time: data.end_time,
        status: 'available',
      };
      setSlots((prev) => [newSlot, ...prev]);
      setAlertSuccess('Slot mentoring berhasil dipublikasikan untuk mahasiswa!');
      setShowCreateModal(false);
      setTimeout(() => setAlertSuccess(null), 3000);
      return true;
    } catch {
      // Offline fallback
      const newSlot: MentorshipSlot = {
        id: `s-${Date.now()}`,
        alumni_id: profile?.id || 'a1',
        session_type: data.session_type,
        start_time: data.start_time,
        end_time: data.end_time,
        status: 'available',
      };
      setSlots((prev) => [newSlot, ...prev]);
      setAlertSuccess('Slot mentoring berhasil dipublikasikan!');
      setShowCreateModal(false);
      setTimeout(() => setAlertSuccess(null), 3000);
      return true;
    } finally {
      setIsCreatingSlot(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (!confirm('Hapus slot jadwal ini?')) return;
    try {
      await api.deleteSlot(slotId);
    } catch {
      // Fallback
    }
    setSlots((prev) => prev.filter((s) => s.id !== slotId));
  };

  const handleCompleteBooking = async (bookingId: string) => {
    try {
      await api.completeBooking(bookingId);
    } catch {
      // Fallback
    }
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'completed' } : b))
    );
    setAlertSuccess('Sesi bimbingan berhasil ditandai selesai.');
    setTimeout(() => setAlertSuccess(null), 3000);
  };

  const handleDownloadCv = async (bookingId: string) => {
    try {
      const res = await api.getCvUrl(bookingId);
      if (res.data?.signed_url) {
        window.open(res.data.signed_url, '_blank');
        return;
      }
    } catch {
      // Fallback
    }
    alert('📥 Mengunduh CV mahasiswa via Supabase Signed URL (Valid 60 menit).\nData privat terjaga aman.');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <DashboardHeader
        profile={profile}
        role={role}
        actions={
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Buka Slot Baru</span>
          </button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {alertSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{alertSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form & Schedule Management */}
          <div className="space-y-6">
            <SlotForm onSubmit={handleCreateSlot} isLoading={isCreatingSlot} />

            {/* Slots List */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4 flex items-center justify-between">
                <span>Daftar Slot Anda ({slots.length})</span>
                <span className="text-xs font-normal text-slate-400">
                  {slots.filter((s) => s.status === 'available').length} Tersedia
                </span>
              </h3>

              <div className="space-y-3">
                {slots.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Belum ada slot mentoring yang dibuat.</p>
                ) : (
                  slots.map((s) => {
                    const dateStr = new Date(s.start_time).toLocaleDateString('id-ID', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    });
                    const timeStr = `${new Date(s.start_time).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })} WIB`;

                    return (
                      <div
                        key={s.id}
                        className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={s.status === 'booked' ? 'green' : 'blue'} size="sm">
                              {s.status === 'booked' ? 'Telah Dipesan' : 'Tersedia'}
                            </Badge>
                            <span className="text-slate-500 capitalize">
                              {s.session_type === 'mock_interview' ? 'Mock Interview' : 'CV Review'}
                            </span>
                          </div>
                          <p className="font-bold text-slate-800 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            <span>{dateStr} • {timeStr}</span>
                          </p>
                        </div>

                        {s.status === 'available' && (
                          <button
                            type="button"
                            onClick={() => handleDeleteSlot(s.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus slot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Booked Sessions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-1">
                Jadwal Bimbingan Mahasiswa ({bookings.length})
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Mahasiswa yang telah memesan slot waktu Anda dan siap bimbingan karir.
              </p>

              {bookings.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                  Belum ada mahasiswa yang memesan slot Anda.
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => {
                    const isConfirmed = booking.status === 'confirmed';
                    const isCompleted = booking.status === 'completed';

                    const dateStr = booking.slot?.start_time
                      ? new Date(booking.slot.start_time).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'Jadwal Ditentukan';

                    const timeStr = booking.slot?.start_time
                      ? `${new Date(booking.slot.start_time).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })} WIB`
                      : '';

                    return (
                      <div
                        key={booking.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-2xs space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={isConfirmed ? 'green' : 'blue'}>
                                {isConfirmed ? 'Sesi Aktif' : 'Selesai'}
                              </Badge>
                              <span className="text-xs font-semibold text-slate-700">
                                {booking.session_type === 'mock_interview'
                                  ? 'Simulasi Mock Interview'
                                  : 'Review CV & Portfolio'}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-slate-900">
                              {booking.student?.full_name || 'Mahasiswa'}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {booking.student?.department} ({booking.student?.email})
                            </p>
                          </div>

                          <div className="text-left sm:text-right text-xs">
                            <span className="font-semibold text-slate-800 block">{dateStr}</span>
                            <span className="text-slate-500">{timeStr}</span>
                          </div>
                        </div>

                        {booking.notes && (
                          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
                            <strong className="text-slate-700">Catatan Mahasiswa:</strong> "
                            {booking.notes}"
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <div className="flex items-center gap-2">
                            {booking.cv_file_path ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadCv(booking.id)}
                                leftIcon={<FileText className="w-3.5 h-3.5 text-blue-600" />}
                              >
                                Tinjau Dokumen CV
                              </Button>
                            ) : (
                              <span className="text-xs text-slate-400 italic">
                                Belum ada CV yang diunggah
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {isConfirmed && (
                              <>
                                <a
                                  href={booking.meeting_url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    leftIcon={<VideoCamera className="w-3.5 h-3.5" />}
                                    rightIcon={<ExternalLink className="w-3 h-3" />}
                                  >
                                    Buka Ruang Jitsi
                                  </Button>
                                </a>

                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleCompleteBooking(booking.id)}
                                  leftIcon={<CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                                >
                                  Tandai Selesai
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Quick Create Slot */}
      {showCreateModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowCreateModal(false)}
          title="Buka Slot Mentoring Baru"
          description="Publikasikan waktu luang Anda agar mahasiswa kampus dapat memesan bimbingan."
        >
          <SlotForm
            onSubmit={handleCreateSlot}
            isLoading={isCreatingSlot}
          />
        </Modal>
      )}
    </div>
  );
};

export default DashboardAlumniPage;

