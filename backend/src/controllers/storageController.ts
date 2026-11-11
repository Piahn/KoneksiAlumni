import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { successResponse, errorResponse } from '../utils/apiResponse';

const BUCKET_NAME = 'cv-resumes';

/**
 * Menghasilkan Signed Upload URL bagi mahasiswa untuk mengunggah CV langsung ke Supabase Storage.
 */
export async function getUploadUrl(req: Request, res: Response): Promise<Response> {
  try {
    const { file_name, booking_id } = req.body;

    if (!file_name || !booking_id) {
      return errorResponse(res, 'file_name dan booking_id wajib dicantumkan.', 400);
    }

    // Pastikan booking tersebut milik mahasiswa ini
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, student_id')
      .eq('id', booking_id)
      .eq('student_id', req.user!.id)
      .single();

    if (bookingError || !booking) {
      return errorResponse(res, 'Booking tidak ditemukan atau bukan milik Anda.', 404);
    }

    // Sanitasi nama file dan susun storage path yang aman
    const sanitizedFileName = file_name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `cv/${req.user!.id}/${booking_id}/${Date.now()}_${sanitizedFileName}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUploadUrl(storagePath);

    if (error) {
      return errorResponse(res, `Gagal membuat URL upload: ${error.message}`, 400);
    }

    // Simpan path sementara ke data booking jika diinginkan
    await supabase
      .from('bookings')
      .update({ cv_file_path: storagePath })
      .eq('id', booking_id);

    return successResponse(
      res,
      {
        upload_url: data.signedUrl,
        token: data.token,
        file_path: storagePath,
      },
      'Signed upload URL berhasil dibuat. Berlaku selama 15 menit.'
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Menghasilkan Signed Download URL privat bagi Alumni untuk membaca CV mahasiswa (TTL: 60 menit).
 */
export async function getCvUrl(req: Request, res: Response): Promise<Response> {
  try {
    const bookingId = req.params.bookingId as string;

    // Ambil data booking beserta alumni_id dari slot
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*, mentorship_slots(alumni_id)')
      .eq('id', bookingId)
      .single();

    if (fetchError || !booking) {
      return errorResponse(res, 'Booking tidak ditemukan.', 404);
    }

    const slot = booking.mentorship_slots as { alumni_id: string } | null;
    const isSlotOwner = slot?.alumni_id === req.user!.id;
    const isAdmin = req.user!.profile.role === 'admin';

    if (!isSlotOwner && !isAdmin) {
      return errorResponse(res, 'Anda tidak berhak mengakses dokumen CV untuk sesi ini.', 403);
    }

    if (!booking.cv_file_path) {
      return errorResponse(res, 'Mahasiswa belum mengunggah file CV untuk sesi ini.', 404);
    }

    // Buat Signed URL berdurasi 60 menit (3600 detik)
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(booking.cv_file_path, 3600);

    if (error || !data) {
      return errorResponse(res, `Gagal membuat URL akses CV: ${error?.message}`, 400);
    }

    return successResponse(
      res,
      {
        cv_url: data.signedUrl,
        expires_in_seconds: 3600,
      },
      'Signed download URL CV berhasil dibuat.'
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}
