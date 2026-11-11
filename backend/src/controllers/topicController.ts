import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { getCache, setCache, invalidateCache } from '../utils/cache';

const CACHE_KEY = 'topics:all';

/**
 * Mengambil seluruh daftar topik keahlian mentorship (Cache: 30 menit).
 */
export async function getTopics(_req: Request, res: Response): Promise<Response> {
  try {
    const cachedData = getCache<unknown>(CACHE_KEY);
    if (cachedData) {
      return successResponse(res, cachedData, 'Daftar topik (cached).');
    }

    const { data: topics, error } = await supabase
      .from('topics')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return errorResponse(res, `Gagal mengambil topik: ${error.message}`, 400);
    }

    setCache(CACHE_KEY, topics, 30 * 60 * 1000);

    return successResponse(res, topics, 'Daftar topik berhasil diambil.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Menambahkan topik keahlian baru (Admin Only).
 */
export async function createTopic(req: Request, res: Response): Promise<Response> {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return errorResponse(res, 'Nama topik wajib diisi.', 400);
    }

    const { data: topic, error } = await supabase
      .from('topics')
      .insert({ name: name.trim() })
      .select('*')
      .single();

    if (error) {
      return errorResponse(res, `Gagal membuat topik: ${error.message}`, 400);
    }

    invalidateCache('topics:');

    return successResponse(res, topic, 'Topik berhasil ditambahkan.', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Mengubah nama topik keahlian (Admin Only).
 */
export async function updateTopic(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return errorResponse(res, 'Nama topik baru wajib diisi.', 400);
    }

    const { data: topic, error } = await supabase
      .from('topics')
      .update({ name: name.trim() })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return errorResponse(res, `Gagal memperbarui topik: ${error.message}`, 400);
    }

    invalidateCache('topics:');

    return successResponse(res, topic, 'Topik berhasil diperbarui.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Menghapus topik keahlian (Admin Only).
 */
export async function deleteTopic(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('topics')
      .delete()
      .eq('id', id);

    if (error) {
      return errorResponse(res, `Gagal menghapus topik: ${error.message}`, 400);
    }

    invalidateCache('topics:');

    return successResponse(res, null, 'Topik berhasil dihapus.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}
