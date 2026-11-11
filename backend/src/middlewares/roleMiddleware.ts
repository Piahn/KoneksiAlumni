import type { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';

/**
 * Role-based authorization middleware factory.
 * Memeriksa apakah role pengguna termasuk dalam daftar role yang diizinkan.
 * Alumni wajib memiliki status is_verified === true.
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const profile = req.user?.profile;

    if (!profile) {
      errorResponse(res, 'Akses ditolak: profil pengguna tidak ditemukan.', 403);
      return;
    }

    if (!roles.includes(profile.role)) {
      errorResponse(res, 'Akses ditolak: Anda tidak memiliki izin untuk tindakan ini.', 403);
      return;
    }

    // Alumni harus terverifikasi oleh admin
    if (profile.role === 'alumni' && !profile.is_verified) {
      errorResponse(res, 'Akses ditolak: akun alumni Anda masih menunggu verifikasi admin kampus.', 403);
      return;
    }

    next();
  };
};
