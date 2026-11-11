/**
 * Konfigurasi Supabase Client
 *
 * Membuat dan mengekspor Supabase admin client menggunakan service role key.
 * Bun secara otomatis membaca file .env tanpa perlu dotenv.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Ambil variabel lingkungan yang diperlukan (dengan fallback aman untuk mode test)
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key';

// Peringatan jika belum diatur di environment non-test
if (!process.env.SUPABASE_URL && process.env.NODE_ENV !== 'test') {
  console.warn('⚠️ [KoneksiAlumni] SUPABASE_URL belum diatur di file .env. Menggunakan placeholder.');
}

/**
 * Supabase admin client dengan service role key.
 * Client ini memiliki akses penuh dan melewati RLS (Row Level Security).
 * Gunakan hanya di sisi server.
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);
