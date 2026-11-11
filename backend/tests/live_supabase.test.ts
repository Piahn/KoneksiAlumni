import { describe, it, expect } from 'bun:test';
import { supabase } from '../src/config/supabase';

describe('Live Supabase Integration Tests', () => {
  it('should connect to Supabase PostgreSQL and query topics', async () => {
    const { data, error } = await supabase.from('topics').select('*').order('name');

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data!.length).toBeGreaterThanOrEqual(12);

    const topicNames = data!.map((t) => t.name);
    expect(topicNames).toContain('Backend Web');
    expect(topicNames).toContain('Frontend Web');
    expect(topicNames).toContain('UI/UX Design');
    expect(topicNames).toContain('AI / Machine Learning');
  });

  it('should verify all core tables exist in PostgreSQL schema', async () => {
    const tables = [
      'profiles',
      'topics',
      'alumni_topics',
      'mentorship_slots',
      'bookings',
      'reviews',
      'idempotency_keys',
    ];

    for (const table of tables) {
      const { error } = await supabase.from(table).select('*').limit(1);
      expect(error).toBeNull();
    }
  });

  it('should verify storage bucket cv-resumes exists and is private', async () => {
    const { data: bucket, error } = await supabase.storage.getBucket('cv-resumes');

    expect(error).toBeNull();
    expect(bucket).toBeDefined();
    expect(bucket!.name).toBe('cv-resumes');
    expect(bucket!.public).toBe(false);
  });
});

