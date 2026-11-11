import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { getCache, setCache, invalidateCache } from '../utils/cache';

/**
 * Membuat slot waktu ketersediaan baru oleh Alumni.
 * Memvalidasi rentang waktu dan memeriksa jadwal bentrok (*overlap*).
 */
export async function createSlot(req: Request, res: Response): Promise<Response> {
  try {
    const { session_type, start_time, end_time } = req.body;

    if (!session_type || !start_time || !end_time) {
      return errorResponse(res, 'Tipe sesi, waktu mulai, dan waktu selesai wajib diisi.', 400);
    }

    const start = new Date(start_time);
    const end = new Date(end_time);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return errorResponse(res, 'Format tanggal tidak valid. Gunakan format ISO (UTC).', 400);
    }

    if (end <= start) {
      return errorResponse(res, 'Waktu selesai harus lebih besar dari waktu mulai.', 400);
    }

    // Pastikan tidak menjadwalkan di masa lalu
    if (start < new Date()) {
      return errorResponse(res, 'Tidak dapat membuat slot pada waktu yang sudah lewat.', 400);
    }

    // Cek apakah ada jadwal yang tumpang tindih (overlap) milik alumni yang sama
    const { data: overlappingSlots, error: checkError } = await supabase
      .from('mentorship_slots')
      .select('id')
      .eq('alumni_id', req.user!.id)
      .neq('status', 'cancelled')
      .lt('start_time', end.toISOString())
      .gt('end_time', start.toISOString());

    if (checkError) {
      return errorResponse(res, `Gagal memvalidasi jadwal: ${checkError.message}`, 400);
    }

    if (overlappingSlots && overlappingSlots.length > 0) {
      return errorResponse(res, 'Waktu slot bertabrakan dengan jadwal Anda yang lain.', 409);
    }

    const { data: newSlot, error: insertError } = await supabase
      .from('mentorship_slots')
      .insert({
        alumni_id: req.user!.id,
        session_type,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        status: 'available',
      })
      .select('*')
      .single();

    if (insertError) {
      return errorResponse(res, `Gagal membuat slot: ${insertError.message}`, 400);
    }

    invalidateCache('slots:');

    return successResponse(res, newSlot, 'Slot berhasil dibuat.', 201);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Mengambil daftar slot yang tersedia (status = 'available').
 * Bisa difilter berdasarkan alumniId, tanggal, atau session type.
 */
export async function getSlots(req: Request, res: Response): Promise<Response> {
  try {
    const { alumniId, date, type } = req.query as {
      alumniId?: string;
      date?: string;
      type?: string;
    };

    const cacheKey = `slots:list:${alumniId || ''}:${date || ''}:${type || ''}`;
    const cachedData = getCache<unknown>(cacheKey);
    if (cachedData) {
      return successResponse(res, cachedData, 'Daftar slot (cached).');
    }

    let query = supabase
      .from('mentorship_slots')
      .select('*, profiles(id, full_name, current_company, current_position)')
      .eq('status', 'available')
      .gt('start_time', new Date().toISOString())
      .order('start_time', { ascending: true });

    if (alumniId) {
      query = query.eq('alumni_id', alumniId);
    }

    if (type) {
      query = query.eq('session_type', type);
    }

    if (date) {
      // Filter tanggal (YYYY-MM-DD)
      const dayStart = `${date}T00:00:00.000Z`;
      const dayEnd = `${date}T23:59:59.999Z`;
      query = query.gte('start_time', dayStart).lte('start_time', dayEnd);
    }

    const { data: slots, error } = await query;

    if (error) {
      return errorResponse(res, `Gagal mengambil slot: ${error.message}`, 400);
    }

    // Cache pendek (30 detik) agar slot yang baru di-booking cepat ter-refresh
    setCache(cacheKey, slots, 30 * 1000);

    return successResponse(res, slots, 'Daftar slot berhasil diambil.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Memperbarui slot waktu milik sendiri (hanya jika masih berstatus 'available').
 */
export async function updateSlot(req: Request, res: Response): Promise<Response> {
  try {
    const id = req.params.id as string;
    const { session_type, start_time, end_time } = req.body;

    // Pastikan slot milik alumni ini dan masih available
    const { data: existingSlot, error: fetchError } = await supabase
      .from('mentorship_slots')
      .select('*')
      .eq('id', id)
      .eq('alumni_id', req.user!.id)
      .single();

    if (fetchError || !existingSlot) {
      return errorResponse(res, 'Slot tidak ditemukan atau bukan milik Anda.', 404);
    }

    if (existingSlot.status !== 'available') {
      return errorResponse(res, 'Slot yang sudah dipesan atau dibatalkan tidak dapat diubah.', 400);
    }

    const updatePayload: Record<string, unknown> = {};
    if (session_type) updatePayload.session_type = session_type;
    if (start_time) updatePayload.start_time = new Date(start_time).toISOString();
    if (end_time) updatePayload.end_time = new Date(end_time).toISOString();

    const { data: updatedSlot, error: updateError } = await supabase
      .from('mentorship_slots')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      return errorResponse(res, `Gagal memperbarui slot: ${updateError.message}`, 400);
    }

    invalidateCache('slots:');

    return successResponse(res, updatedSlot, 'Slot berhasil diperbarui.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Menghapus slot milik sendiri (hanya jika masih berstatus 'available').
 */
export async function deleteSlot(req: Request, res: Response): Promise<Response> {
  try {
    const id = req.params.id as string;

    const { data: slot, error: fetchError } = await supabase
      .from('mentorship_slots')
      .select('*')
      .eq('id', id)
      .eq('alumni_id', req.user!.id)
      .single();

    if (fetchError || !slot) {
      return errorResponse(res, 'Slot tidak ditemukan atau bukan milik Anda.', 404);
    }

    if (slot.status !== 'available') {
      return errorResponse(res, 'Slot yang sudah dipesan tidak dapat dihapus langsung.', 400);
    }

    const { error: deleteError } = await supabase
      .from('mentorship_slots')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return errorResponse(res, `Gagal menghapus slot: ${deleteError.message}`, 400);
    }

    invalidateCache('slots:');

    return successResponse(res, null, 'Slot berhasil dihapus.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}
