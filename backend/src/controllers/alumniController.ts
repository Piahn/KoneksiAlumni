import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { getCache, setCache } from '../utils/cache';

/**
 * Mengambil daftar alumni terverifikasi dengan filter topik, perusahaan, atau pencarian nama.
 * Menggunakan cache in-memory 5 menit.
 */
export async function getAlumni(req: Request, res: Response): Promise<Response> {
  try {
    const { topic, company, q } = req.query as {
      topic?: string;
      company?: string;
      q?: string;
    };

    const cacheKey = `alumni:list:${topic || ''}:${company || ''}:${q || ''}`;
    const cachedData = getCache<unknown>(cacheKey);
    if (cachedData) {
      return successResponse(res, cachedData, 'Daftar alumni (cached).');
    }

    let query = supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        university_email,
        bio,
        current_company,
        current_position,
        linkedin_url,
        is_verified,
        created_at,
        alumni_topics(topics(id, name)),
        reviews(rating)
      `)
      .eq('role', 'alumni')
      .eq('is_verified', true);

    if (company) {
      query = query.ilike('current_company', `%${company}%`);
    }

    if (q) {
      query = query.or(`full_name.ilike.%${q}%,current_position.ilike.%${q}%`);
    }

    const { data: alumniList, error } = await query;

    if (error) {
      return errorResponse(res, `Gagal mengambil alumni: ${error.message}`, 400);
    }

    // Hitung rata-rata rating dan rapikan format response
    const formatted = (alumniList || []).map((item: any) => {
      const ratings = item.reviews?.map((r: { rating: number }) => r.rating) || [];
      const avgRating = ratings.length > 0
        ? Number((ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length).toFixed(1))
        : 0;

      const topics = item.alumni_topics?.map((at: any) => at.topics).filter(Boolean) || [];

      // Filter topik di level aplikasi jika parameter topic ada
      if (topic) {
        const matchesTopic = topics.some(
          (t: { name: string }) => t.name.toLowerCase().includes(topic.toLowerCase())
        );
        if (!matchesTopic) return null;
      }

      const { reviews, alumni_topics, ...rest } = item;
      return {
        ...rest,
        average_rating: avgRating,
        total_reviews: ratings.length,
        topics,
      };
    }).filter(Boolean);

    // Simpan ke cache selama 5 menit (300.000 ms)
    setCache(cacheKey, formatted, 5 * 60 * 1000);

    return successResponse(res, formatted, 'Daftar alumni berhasil diambil.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Mengambil detail profil satu alumni berdasarkan ID.
 */
export async function getAlumniById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const cacheKey = `alumni:detail:${id}`;
    const cachedData = getCache<unknown>(cacheKey);
    if (cachedData) {
      return successResponse(res, cachedData, 'Detail alumni (cached).');
    }

    const { data: alumni, error } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        university_email,
        bio,
        current_company,
        current_position,
        linkedin_url,
        is_verified,
        created_at,
        alumni_topics(topics(id, name)),
        reviews(rating, comment, created_at, student:profiles!student_id(full_name))
      `)
      .eq('id', id)
      .eq('role', 'alumni')
      .single();

    if (error || !alumni) {
      return errorResponse(res, 'Alumni tidak ditemukan.', 404);
    }

    const ratings = alumni.reviews?.map((r: { rating: number }) => r.rating) || [];
    const avgRating = ratings.length > 0
      ? Number((ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length).toFixed(1))
      : 0;

    const topics = alumni.alumni_topics?.map((at: any) => at.topics).filter(Boolean) || [];

    const result = {
      ...alumni,
      average_rating: avgRating,
      total_reviews: ratings.length,
      topics,
    };

    setCache(cacheKey, result, 5 * 60 * 1000);

    return successResponse(res, result, 'Detail alumni berhasil diambil.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}
