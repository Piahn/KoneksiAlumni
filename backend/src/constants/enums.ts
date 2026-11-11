/**
 * Enum Constants
 *
 * Menggunakan `as const` agar tipe literal terjaga.
 * Tidak menggunakan TypeScript enum demi kompatibilitas dan tree-shaking.
 */

/** Peran pengguna dalam sistem */
export const UserRole = {
  STUDENT: "student",
  ALUMNI: "alumni",
  ADMIN: "admin",
} as const;

/** Jenis sesi mentorship yang tersedia */
export const SessionType = {
  MOCK_INTERVIEW: "mock_interview",
  CV_REVIEW: "cv_review",
  CAREER_SHARING: "career_sharing",
} as const;

/** Status slot waktu mentorship */
export const SlotStatus = {
  AVAILABLE: "available",
  BOOKED: "booked",
  CANCELLED: "cancelled",
} as const;

/** Status pemesanan (booking) sesi */
export const BookingStatus = {
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

// --- Tipe turunan dari const objects ---

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
export type SessionTypeType = (typeof SessionType)[keyof typeof SessionType];
export type SlotStatusType = (typeof SlotStatus)[keyof typeof SlotStatus];
export type BookingStatusType =
  (typeof BookingStatus)[keyof typeof BookingStatus];
