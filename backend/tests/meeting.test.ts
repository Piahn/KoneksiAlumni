import { describe, it, expect } from 'bun:test';
import { generateMeetingUrl } from '../src/services/meetingService';

describe('Meeting Service', () => {
  it('should generate a valid Jitsi Meet URL with clean alphanumeric room id', () => {
    const bookingId = '550e8400-e29b-41d4-a716-446655440000';
    const url = generateMeetingUrl(bookingId);

    expect(url).toBe('https://meet.jit.si/koneksi-alumni-550e8400e29b41d4a716446655440000');
    expect(url.startsWith('https://meet.jit.si/koneksi-alumni-')).toBe(true);
  });
});
