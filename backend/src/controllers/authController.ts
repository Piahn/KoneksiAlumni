import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { successResponse, errorResponse } from '../utils/apiResponse';

/**
 * Sinkronisasi data profil pengguna setelah registrasi atau login Supabase.
 */
export async function syncProfile(req: Request, res: Response): Promise<Response> {
  try {
    const {
      role = 'student',
      full_name,
      university_email,
      bio,
      current_company,
      current_position,
      linkedin_url,
    } = req.body;

    if (!full_name || !university_email) {
      return errorResponse(res, 'Nama lengkap dan email universitas wajib diisi.', 400);
    }

    // Validasi email kampus untuk mahasiswa
    if (role === 'student' && !university_email.endsWith('.ac.id') && !university_email.endsWith('.edu')) {
      return errorResponse(res, 'Email mahasiswa harus menggunakan domain kampus (.ac.id / .edu).', 400);
    }

    const isAlumni = role === 'alumni';

    const { data: profile, error } = await supabase
      .from('profiles')
      .upsert({
        id: req.user!.id,
        role,
        full_name,
        university_email,
        bio: bio || null,
        current_company: isAlumni ? current_company || null : null,
        current_position: isAlumni ? current_position || null : null,
        linkedin_url: linkedin_url || null,
        // Alumni baru harus diverifikasi oleh admin terlebih dahulu
        is_verified: isAlumni ? false : true,
      })
      .select('*')
      .single();

    if (error) {
      return errorResponse(res, `Gagal menyimpan profil: ${error.message}`, 400);
    }

    return successResponse(res, profile, 'Profil berhasil disinkronisasi.', 200);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Mengambil profil diri sendiri dari token yang terautentikasi.
 */
export async function getMe(req: Request, res: Response): Promise<Response> {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user!.id)
      .single();

    if (error || !profile) {
      return errorResponse(res, 'Profil tidak ditemukan.', 404);
    }

    return successResponse(res, profile, 'Berhasil mengambil data profil.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}

/**
 * Memperbarui data profil pengguna (bio, linkedin, company, position).
 */
export async function updateProfile(req: Request, res: Response): Promise<Response> {
  try {
    const { bio, current_company, current_position, linkedin_url } = req.body;

    const updatePayload: Record<string, unknown> = {};
    if (bio !== undefined) updatePayload.bio = bio;
    if (current_company !== undefined) updatePayload.current_company = current_company;
    if (current_position !== undefined) updatePayload.current_position = current_position;
    if (linkedin_url !== undefined) updatePayload.linkedin_url = linkedin_url;

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updatePayload)
      .eq('id', req.user!.id)
      .select('*')
      .single();

    if (error) {
      return errorResponse(res, `Gagal memperbarui profil: ${error.message}`, 400);
    }

    return successResponse(res, profile, 'Profil berhasil diperbarui.');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Kesalahan server';
    return errorResponse(res, message, 500);
  }
}
