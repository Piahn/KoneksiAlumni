import React from 'react';
import { Badge } from '../ui/Badge';
import { User, CheckCircle2 } from 'lucide-react';
import type { UserProfile, UserRole } from '../../types';

interface DashboardHeaderProps {
  profile: UserProfile | null;
  role: UserRole;
  actions?: React.ReactNode;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  profile,
  role,
  actions,
}) => {
  const isAlumni = role === 'alumni';

  return (
    <div className="bg-white border-b border-slate-200/90 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-xs">
            {profile?.full_name ? (
              profile.full_name.charAt(0).toUpperCase()
            ) : (
              <User className="w-7 h-7" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Halo, {profile?.full_name || 'Pengguna'}!
              </h1>
              <Badge variant={isAlumni ? 'green' : 'blue'}>
                {isAlumni ? 'Mentor Alumni' : 'Mahasiswa'}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
              {isAlumni ? (
                <>
                  <span>{profile?.current_position || 'Mentor'}</span>
                  <span>•</span>
                  <strong className="text-slate-700">{profile?.current_company || 'Perusahaan'}</strong>
                  {profile?.verified_at && (
                    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span>{profile?.department || 'Teknik Informatika'}</span>
                  <span>•</span>
                  <span>Angkatan {profile?.graduation_year || '2026'}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
