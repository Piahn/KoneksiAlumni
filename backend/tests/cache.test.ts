import { describe, it, expect } from 'bun:test';
import { getCache, setCache, invalidateCache, clearCache } from '../src/utils/cache';

describe('In-Memory Cache Utility', () => {
  it('should store and retrieve data within TTL', () => {
    clearCache();
    setCache('test:key1', { name: 'Budi' }, 5000);

    const data = getCache<{ name: string }>('test:key1');
    expect(data).not.toBeNull();
    expect(data?.name).toBe('Budi');
  });

  it('should return null for expired cache', async () => {
    clearCache();
    setCache('test:key2', { name: 'Siti' }, 50); // 50ms TTL

    await new Promise((resolve) => setTimeout(resolve, 60));

    const data = getCache<{ name: string }>('test:key2');
    expect(data).toBeNull();
  });

  it('should invalidate cache matching pattern prefix', () => {
    clearCache();
    setCache('alumni:1', { id: 1 }, 5000);
    setCache('alumni:2', { id: 2 }, 5000);
    setCache('slots:1', { id: 1 }, 5000);

    invalidateCache('alumni:');

    expect(getCache('alumni:1')).toBeNull();
    expect(getCache('alumni:2')).toBeNull();
    expect(getCache('slots:1')).not.toBeNull();
  });
});
