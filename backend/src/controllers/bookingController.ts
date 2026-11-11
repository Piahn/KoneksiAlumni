import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { successResponse, errorResponse } from '../utils/apiResponse';
import { invalidateCache } from '../utils/cache';
import * as bookingService from '../services/bookingService';

/**
 * Membuat booking baru (Student).
 * Menjalankan atomic lock dan otomatis membuat Jitsi room link.
 */
export async function createBooking(req: Request, res: Response): Promise<Response> {
  try {
    const { slot_id, notes, cv_file_path } = req.body;

    if (!slot_id) {
      return errorResponse(res, 'slot_id wajib dicantumkan.', 400);
    }

    const booking = await bookingService.createBooking(
      slot_id,
      req.user!.id,
      notes,
      cv_file_path
    );

    invalidateCache('slots:');

    return successResponse(res, booking, 'Booking berhasil dibuat!', 201);
  } catch (err: any) {
    const status = err.status || 500;
    return errorResponse(res, err.message || 'Gagal memproses booking.', status);
  }
}

/**
 * Mengambil daftar riwayat sesi booking milik user saat ini (mahasiswa atau alumni).
 */
export async function getMyBookings(req: Request, res: Response): Promise<Response> {
  try {
    const isAlumni = req.user!.profile.role === 'alumni';

    let query = supabase
      .from('bookings')
      .select(`
        *,
        mentorship_slots!inner(
          id,
          session_type,
          start_time,
          end_time,
          alumni_id,
          alumni:profiles!alumni_id(id, full_name, current_company, current_position)
        ),
        student:profiles!student_id(id, full_name, university_email)
      `)
      .order('created_at', { ascending: false });

    if (isAlumni) {
      query = query.eq('mentorship_slots.alumni_id', req.user!.id);
    } else {
      query = query.eq('student_id', req.user!.id);
    }

    const { data: bookings, error } = await query;

    if (error) {
      return errorResponse(res, `Gagal mengambil riwayat booking: ${error.message}`, 400);
    }

    return successResponse(res, bookings, 'Daftar booking berhasil diambil.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Mengambil detail satu booking berdasarkan ID.
 * Hanya bisa diakses oleh mahasiswa atau alumni pemilik sesi tersebut.
 */
export async function getBookingById(req: Request, res: Response): Promise<Response> {
  try {
    const id = req.params.id as string;

    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        mentorship_slots(
          id,
          session_type,
          start_time,
          end_time,
          alumni_id,
          alumni:profiles!alumni_id(id, full_name, current_company, current_position)
        ),
        student:profiles!student_id(id, full_name, university_email)
      `)
      .eq('id', id)
      .single();

    if (error || !booking) {
      return errorResponse(res, 'Booking tidak ditemukan.', 404);
    }

    const slot = booking.mentorship_slots as { alumni_id: string } | null;
    const isOwner = booking.student_id === req.user!.id || slot?.alumni_id === req.user!.id;
    const isAdmin = req.user!.profile.role === 'admin';

    if (!isOwner && !isAdmin) {
      return errorResponse(res, 'Anda tidak memiliki akses ke detail booking ini.', 403);
    }

    return successResponse(res, booking, 'Detail booking berhasil diambil.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Membatalkan booking dan mengembalikan slot menjadi available.
 */
export async function cancelBooking(req: Request, res: Response): Promise<Response> {
  try {
    const id = req.params.id as string;
    const updatedBooking = await bookingService.cancelBooking(id, req.user!.id);

    invalidateCache('slots:');

    return successResponse(res, updatedBooking, 'Booking berhasil dibatalkan dan slot telah dibuka kembali.');
  } catch (err: any) {
    const status = err.status || 500;
    return errorResponse(res, err.message || 'Gagal membatalkan booking.', status);
  }
}

/**
 * Menandai sesi mentoring telah selesai (Alumni).
 * Membuka akses untuk mahasiswa menulis ulasan (review).
 */
export async function completeBooking(req: Request, res: Response): Promise<Response> {
  try {
    const id = req.params.id as string;

    // Pastikan alumni pemilik slot
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*, mentorship_slots(alumni_id)')
      .eq('id', id)
      .single();

    if (fetchError || !booking) {
      return errorResponse(res, 'Booking tidak ditemukan.', 404);
    }

    const slot = booking.mentorship_slots as { alumni_id: string } | null;
    if (slot?.alumni_id !== req.user!.id && req.user!.profile.role !== 'admin') {
      return errorResponse(res, 'Hanya alumni pemilik sesi yang dapat menyelesaikan sesi ini.', 403);
    }

    const { data: updatedBooking, error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'completed' })
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      return errorResponse(res, `Gagal menyelesaikan sesi: ${updateError.message}`, 400);
    }

    return successResponse(res, updatedBooking, 'Sesi berhasil ditandai selesai.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}
