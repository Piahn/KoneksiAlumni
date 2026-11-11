/**
 * Service untuk generate link video call room (Jitsi Meet).
 */

export function generateMeetingUrl(bookingId: string): string {
  // Membuat link unik Jitsi Meet room berdasarkan UUID booking
  const cleanId = bookingId.replace(/[^a-zA-Z0-9]/g, '');
  return `https://meet.jit.si/koneksi-alumni-${cleanId}`;
}
