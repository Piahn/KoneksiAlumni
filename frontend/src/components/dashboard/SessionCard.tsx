import React from 'react';
import { Calendar, Clock, Video as VideoCamera, FileText, Star, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { Booking, UserRole } from '../../types';

interface SessionCardProps {
  booking: Booking;
  userRole: UserRole;
  onUploadCv?: (bookingId: string) => void;
  onViewCv?: (bookingId: string) => void;
  onReview?: (booking: Booking) => void;
  onCancel?: (bookingId: string) => void;
  onComplete?: (bookingId: string) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  booking,
  userRole,
  onUploadCv,
  onViewCv,
  onReview,
  onCancel,
  onComplete,
}) => {
  const isStudent = userRole === 'student';
  const isConfirmed = booking.status === 'confirmed';
  const isCompleted = booking.status === 'completed';
  const isCancelled = booking.status === 'cancelled';

  const typeLabels = {
    cv_review: 'Review CV & Portfolio',
    mock_interview: 'Simulasi Mock Interview',
    career_sharing: 'Career Sharing Session',
  };

  const formattedDate = booking.slot?.start_time
    ? new Date(booking.slot.start_time).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Jadwal Ditentukan';

  const formattedTime = booking.slot?.start_time
    ? `${new Date(booking.slot.start_time).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })} WIB`
    : '';

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between">
      <div>
        {/* Header: Status & ID */}
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant={
              isConfirmed ? 'green' : isCompleted ? 'blue' : isCancelled ? 'rose' : 'gray'
            }
          >
            {isConfirmed
              ? '● Sesi Terkonfirmasi'
              : isCompleted
              ? '✓ Selesai Terlaksana'
              : 'Dibatalkan'}
          </Badge>
          <span className="text-[11px] font-mono text-slate-400">
            #{booking.id.slice(0, 8)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug">
          {typeLabels[booking.session_type] || 'Mentorship Session'}
        </h3>

        {/* Counterpart */}
        <p className="text-xs text-slate-500 mt-1 mb-4">
          {isStudent ? (
            <>
              Bersama Mentor:{' '}
              <strong className="text-slate-800">
                {booking.alumni?.full_name || 'Alumni Mentor'}
              </strong>{' '}
              {booking.alumni?.current_company && `(${booking.alumni.current_company})`}
            </>
          ) : (
            <>
              Mahasiswa:{' '}
              <strong className="text-slate-800">
                {booking.student?.full_name || 'Mahasiswa'}
              </strong>{' '}
              {booking.student?.department && `• ${booking.student.department}`}
            </>
          )}
        </p>

        {/* Schedule Box */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-800">{formattedDate}</span>
          </div>
          {formattedTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{formattedTime}</span>
            </div>
          )}
          {booking.notes && (
            <p className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 italic">
              Catatan: "{booking.notes}"
            </p>
          )}
        </div>

        {/* CV Status (if CV review or uploaded) */}
        <div className="mb-4 text-xs">
          {booking.cv_file_path ? (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50/70 border border-blue-100">
              <div className="flex items-center gap-2 text-blue-800 font-medium">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="truncate max-w-[180px]">CV Terunggah</span>
              </div>
              <button
                type="button"
                onClick={() => onViewCv?.(booking.id)}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Buka CV
              </button>
            </div>
          ) : isStudent && isConfirmed ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUploadCv?.(booking.id)}
              leftIcon={<FileText className="w-3.5 h-3.5" />}
              className="w-full justify-center"
            >
              Unggah Dokumen CV
            </Button>
          ) : null}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
        {isConfirmed && booking.meeting_url && (
          <a
            href={booking.meeting_url}
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center rounded-full"
              leftIcon={<VideoCamera className="w-4 h-4" />}
              rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              Masuk Ruang Jitsi
            </Button>
          </a>
        )}

        <div className="flex items-center gap-2">
          {isConfirmed && !isStudent && onComplete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onComplete(booking.id)}
              leftIcon={<CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
              className="flex-1 justify-center text-xs rounded-full"
            >
              Tandai Selesai
            </Button>
          )}

          {isCompleted && isStudent && onReview && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onReview(booking)}
              leftIcon={<Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
              className="w-full justify-center text-xs rounded-full"
            >
              Beri Ulasan & Rating
            </Button>
          )}

          {isConfirmed && onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCancel(booking.id)}
              className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs px-3 rounded-full"
            >
              Batalkan
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

