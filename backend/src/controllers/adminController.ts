import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { getCache, setCache, invalidateCache } from '../utils/cache';

/**
 * Mengambil daftar seluruh pengguna (Admin Only).
 * Bisa difilter berdasarkan role dan status verifikasi.
 */
export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    const { role, verified } = req.query as {
      role?: string;
      verified?: string;
    };

    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (role) {
      query = query.eq('role', role);
    }

    if (verified !== undefined) {
      query = query.eq('is_verified', verified === 'true');
    }

    const { data: users, error } = await query;

    if (error) {
      return errorResponse(res, `Gagal mengambil daftar pengguna: ${error.message}`, 400);
    }

    return successResponse(res, users, 'Daftar pengguna berhasil diambil.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Memverifikasi akun alumni (Admin Only).
 * Mengubah is_verified menjadi true agar profil tampil di direktori publik.
 */
export async function verifyAlumni(req: Request, res: Response): Promise<Response> {
  try {
    const { userId } = req.params;

    const { data: profile, error } = await supabase
      .from('profiles')
      .update({ is_verified: true })
      .eq('id', userId)
      .eq('role', 'alumni')
      .select('*')
      .single();

    if (error || !profile) {
      return errorResponse(res, 'Alumni tidak ditemukan atau gagal diverifikasi.', 404);
    }

    invalidateCache('alumni:');

    return successResponse(res, profile, `Alumni ${profile.full_name} berhasil diverifikasi.`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Mengubah role pengguna (Admin Only).
 */
export async function updateUserRole(req: Request, res: Response): Promise<Response> {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!role || !['student', 'alumni', 'admin'].includes(role)) {
      return errorResponse(res, "Role harus salah satu dari: 'student', 'alumni', 'admin'.", 400);
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .select('*')
      .single();

    if (error || !profile) {
      return errorResponse(res, 'Pengguna tidak ditemukan atau gagal diperbarui.', 404);
    }

    invalidateCache('alumni:');

    return successResponse(res, profile, `Role pengguna berhasil diubah menjadi ${role}.`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Menghapus akun pengguna dari database (Admin Only).
 */
export async function deleteUser(req: Request, res: Response): Promise<Response> {
  try {
    const { userId } = req.params;

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (error) {
      return errorResponse(res, `Gagal menghapus pengguna: ${error.message}`, 400);
    }

    invalidateCache('alumni:');

    return successResponse(res, null, 'Pengguna berhasil dihapus.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Mengambil ringkasan statistik dashboard admin (Cache: 5 menit).
 */
export async function getStats(_req: Request, res: Response): Promise<Response> {
  try {
    const cacheKey = 'admin:stats';
    const cachedData = getCache<unknown>(cacheKey);
    if (cachedData) {
      return successResponse(res, cachedData, 'Statistik admin (cached).');
    }

    // Ambil agregat dari database
    const [profilesRes, bookingsRes, reviewsRes] = await Promise.all([
      supabase.from('profiles').select('role, is_verified'),
      supabase.from('bookings').select('status'),
      supabase.from('reviews').select('rating'),
    ]);

    const profiles = profilesRes.data || [];
    const bookings = bookingsRes.data || [];
    const reviews = reviewsRes.data || [];

    const totalStudents = profiles.filter((p) => p.role === 'student').length;
    const totalAlumni = profiles.filter((p) => p.role === 'alumni').length;
    const pendingVerification = profiles.filter((p) => p.role === 'alumni' && !p.is_verified).length;

    const totalBookings = bookings.length;
    const completedBookings = bookings.filter((b) => b.status === 'completed').length;
    const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;

    const avgRating = reviews.length > 0
      ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1))
      : 0;

    const stats = {
      users: {
        total_students: totalStudents,
        total_alumni: totalAlumni,
        pending_verification: pendingVerification,
      },
      bookings: {
        total: totalBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
      },
      reviews: {
        total_reviews: reviews.length,
        average_rating: avgRating,
      },
    };

    setCache(cacheKey, stats, 5 * 60 * 1000);

    return successResponse(res, stats, 'Statistik berhasil dimuat.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}
