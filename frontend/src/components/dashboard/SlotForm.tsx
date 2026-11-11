import React, { useState } from 'react';
import { Plus, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Select, Input } from '../ui/Input';
import type { SessionType } from '../../types';

interface SlotFormProps {
  onSubmit: (data: {
    session_type: SessionType;
    start_time: string;
    end_time: string;
  }) => Promise<boolean>;
  isLoading?: boolean;
}

export const SlotForm: React.FC<SlotFormProps> = ({ onSubmit, isLoading = false }) => {
  const [sessionType, setSessionType] = useState<SessionType>('cv_review');
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(19, 0, 0, 0);
    return d.toISOString().slice(0, 16);
  });
  const [duration, setDuration] = useState<number>(30);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
      setError('Format waktu mulai tidak valid.');
      return;
    }

    if (start.getTime() <= Date.now()) {
      setError('Jadwal slot harus berada di masa depan.');
      return;
    }

    const end = new Date(start.getTime() + duration * 60 * 1000);

    const success = await onSubmit({
      session_type: sessionType,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
    });

    if (success) {
      // reset to next day
      const d = new Date();
      d.setDate(d.getDate() + 2);
      d.setHours(19, 0, 0, 0);
      setStartDate(d.toISOString().slice(0, 16));
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Plus className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Buka Slot Mentoring Baru
          </h3>
          <p className="text-xs text-slate-500">
            Tentukan jenis sesi dan waktu luang yang Anda sediakan.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-800 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          id="session-type-select"
          label="Jenis Sesi Mentoring"
          aria-label="Jenis Sesi Mentoring"
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value as SessionType)}
        >
          <option value="cv_review">Review CV & Portfolio</option>
          <option value="mock_interview">Simulasi Technical Mock Interview</option>
          <option value="career_sharing">Casual Career Sharing & Tanya Jawab</option>
        </Select>

        <Input
          label="Waktu & Tanggal Mulai"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Durasi Sesi
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[15, 30, 45].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setDuration(mins)}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  duration === mins
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{mins} Menit</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="w-full mt-2"
        >
          Publikasikan Slot Mentoring
        </Button>
      </form>
    </div>
  );
};

