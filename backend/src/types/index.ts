/**
 * Tipe dan Interface
 *
 * Definisi TypeScript yang sesuai dengan tabel-tabel di database Supabase
 * serta tipe utilitas untuk request/response API.
 */

import type { Request } from "express";
import type { User } from "@supabase/supabase-js";
import type {
  UserRoleType,
  SessionTypeType,
  SlotStatusType,
  BookingStatusType,
} from "../constants/enums";

// ─── Tabel Database ───────────────────────────────────────────────

/** Profil pengguna (tabel: profiles) */
export interface Profile {
  id: string;
  role: UserRoleType;
  full_name: string;
  university_email: string;
  bio?: string | null;
  current_company?: string | null;
  current_position?: string | null;
  linkedin_url?: string | null;
  is_verified: boolean;
  created_at: string;
}

/** Topik keahlian (tabel: topics) */
export interface Topic {
  id: number;
  name: string;
}

/** Relasi alumni ↔ topik (tabel: alumni_topics) */
export interface AlumniTopic {
  alumni_id: string;
  topic_id: number;
}

/** Slot waktu mentorship yang dibuka alumni (tabel: mentorship_slots) */
export interface MentorshipSlot {
  id: string;
  alumni_id: string;
  session_type: SessionTypeType;
  start_time: string;
  end_time: string;
  status: SlotStatusType;
  created_at: string;
}

/** Pemesanan sesi oleh mahasiswa (tabel: bookings) */
export interface Booking {
  id: string;
  slot_id: string;
  student_id: string;
  notes?: string | null;
  cv_file_path?: string | null;
  meeting_url?: string | null;
  status: BookingStatusType;
  created_at: string;
}

/** Ulasan setelah sesi selesai (tabel: reviews) */
export interface Review {
  id: string;
  booking_id: string;
  student_id: string;
  alumni_id: string;
  rating: number;
  comment?: string | null;
  created_at: string;
}

// ─── Global Request Extension ──────────────────────────────────────

declare global {
  namespace Express {
    interface Request {
      user?: User & { profile: Profile };
    }
  }
}

/**
 * Request yang sudah terautentikasi (req.user terjamin ada).
 */
export interface AuthenticatedRequest extends Request {
  user: User & { profile: Profile };
}

/**
 * Format standar respons API.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
