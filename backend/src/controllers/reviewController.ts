import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { getCache, setCache, invalidateCache } from '../utils/cache';

/**
 * Memberikan ulasan dan rating (1-5) setelah sesi selesai (Student).
 */
export async function createReview(req: Request, res: Response): Promise<Response> {
  try {
    const { booking_id, rating, comment } = req.body;

    if (!booking_id || rating === undefined) {
      return errorResponse(res, 'booking_id dan rating wajib diisi.', 400);
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return errorResponse(res, 'Rating harus bernilai antara 1 sampai 5.', 400);
    }

    // Ambil detail booking untuk validasi
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*, mentorship_slots(alumni_id)')
      .eq('id', booking_id)
      .single();

    if (bookingError || !booking) {
      return errorResponse(res, 'Data booking tidak ditemukan.', 404);
    }

    if (booking.student_id !== req.user!.id) {
      return errorResponse(res, 'Anda hanya dapat mengulas sesi yang Anda ikuti.', 403);
    }

    if (booking.status !== 'completed') {
      return errorResponse(res, 'Ulasan hanya dapat diberikan setelah sesi ditandai selesai oleh alumni.', 400);
    }

    // Cek apakah review untuk booking ini sudah pernah dibuat
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('booking_id', booking_id)
      .maybeSingle();

    if (existingReview) {
      return errorResponse(res, 'Anda sudah memberikan ulasan untuk sesi ini.', 400);
    }

    const slot = booking.mentorship_slots as { alumni_id: string } | null;
    const alumniId = slot?.alumni_id;

    if (!alumniId) {
      return errorResponse(res, 'Alumni untuk sesi ini tidak ditemukan.', 400);
    }

    const { data: review, error: insertError } = await supabase
      .from('reviews')
      .insert({
        booking_id,
        student_id: req.user!.id,
        alumni_id: alumniId,
        rating: numRating,
        comment: comment || null,
      })
      .select('*')
      .single();

    if (insertError) {
      return errorResponse(res, `Gagal menyimpan ulasan: ${insertError.message}`, 400);
    }

    // Invalidate cache alumni agar rata-rata rating ter-update
    invalidateCache('alumni:');
    invalidateCache(`reviews:${alumniId}`);

    return successResponse(res, review, 'Ulasan berhasil disimpan. Terima kasih atas feedback Anda!', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Mengambil daftar ulasan untuk alumni tertentu.
 */
export async function getReviews(req: Request, res: Response): Promise<Response> {
  try {
    const { alumniId } = req.query as { alumniId?: string };

    if (!alumniId) {
      return errorResponse(res, 'Parameter query alumniId wajib dicantumkan.', 400);
    }

    const cacheKey = `reviews:${alumniId}`;
    const cachedData = getCache<unknown>(cacheKey);
    if (cachedData) {
      return successResponse(res, cachedData, 'Daftar ulasan (cached).');
    }

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        comment,
        created_at,
        student:profiles!student_id(id, full_name)
      `)
      .eq('alumni_id', alumniId)
      .order('created_at', { ascending: false });

    if (error) {
      return errorResponse(res, `Gagal mengambil ulasan: ${error.message}`, 400);
    }

    setCache(cacheKey, reviews, 5 * 60 * 1000);

    return successResponse(res, reviews, 'Daftar ulasan berhasil diambil.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}
