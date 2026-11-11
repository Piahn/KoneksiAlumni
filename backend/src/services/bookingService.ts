import { supabase } from '../config/supabase';
import { generateMeetingUrl } from './meetingService';
import type { Booking } from '../types';

export interface BookingError extends Error {
  status?: number;
}

/**
 * Membuat booking baru secara atomik (pencegahan race-condition).
 */
export async function createBooking(
  slotId: string,
  studentId: string,
  notes?: string,
  cvFilePath?: string
): Promise<Booking> {
  // 1. ATOMIC CONDITIONAL UPDATE:
  // Hanya kunci slot jika status masih 'available'
  const { data: slot, error: slotError } = await supabase
    .from('mentorship_slots')
    .update({ status: 'booked' })
    .eq('id', slotId)
    .eq('status', 'available')
    .select('*')
    .single();

  if (slotError || !slot) {
    const error: BookingError = new Error('Slot sudah dipesan atau tidak lagi tersedia.');
    error.status = 409;
    throw error;
  }

  // 2. Generate UUID & Jitsi Meeting URL
  const bookingId = crypto.randomUUID();
  const meetingUrl = generateMeetingUrl(bookingId);

  // 3. Simpan record booking
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      id: bookingId,
      slot_id: slotId,
      student_id: studentId,
      notes: notes || null,
      cv_file_path: cvFilePath || null,
      meeting_url: meetingUrl,
      status: 'confirmed',
    })
    .select('*')
    .single();

  if (bookingError || !booking) {
    // Rollback: kembalikan status slot ke 'available' jika insert booking gagal
    await supabase
      .from('mentorship_slots')
      .update({ status: 'available' })
      .eq('id', slotId);

    const error: BookingError = new Error(`Gagal membuat booking: ${bookingError?.message}`);
    error.status = 500;
    throw error;
  }

  return booking as Booking;
}

/**
 * Membatalkan sesi booking dan mengembalikan slot menjadi 'available'.
 */
export async function cancelBooking(bookingId: string, userId: string): Promise<Booking> {
  // Ambil data booking beserta slot untuk cek kepemilikan
  const { data: booking, error: fetchError } = await supabase
    .from('bookings')
    .select('*, mentorship_slots(alumni_id)')
    .eq('id', bookingId)
    .single();

  if (fetchError || !booking) {
    const error: BookingError = new Error('Booking tidak ditemukan.');
    error.status = 404;
    throw error;
  }

  const slot = booking.mentorship_slots as { alumni_id: string } | null;
  const isStudent = booking.student_id === userId;
  const isAlumni = slot?.alumni_id === userId;

  if (!isStudent && !isAlumni) {
    const error: BookingError = new Error('Anda tidak memiliki izin membatalkan sesi ini.');
    error.status = 403;
    throw error;
  }

  if (booking.status === 'cancelled') {
    const error: BookingError = new Error('Sesi ini sudah dibatalkan sebelumnya.');
    error.status = 400;
    throw error;
  }

  // Update status booking ke cancelled
  const { data: updatedBooking, error: updateError } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId)
    .select('*')
    .single();

  if (updateError || !updatedBooking) {
    const error: BookingError = new Error('Gagal memperbarui status booking.');
    error.status = 500;
    throw error;
  }

  // Kembalikan slot ke status available agar bisa dipesan kembali
  await supabase
    .from('mentorship_slots')
    .update({ status: 'available' })
    .eq('id', booking.slot_id);

  return updatedBooking as Booking;
}
