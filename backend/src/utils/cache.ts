/**
 * In-Memory Cache dengan TTL
 *
 * Cache sederhana berbasis Map untuk menyimpan data sementara
 * di memori server. Setiap entry memiliki waktu kedaluwarsa (TTL).
 */

interface CacheEntry<T = unknown> {
  data: T;
  /** Waktu kedaluwarsa dalam milidetik (timestamp) */
  expiresAt: number;
}

/** Penyimpanan utama cache */
const store = new Map<string, CacheEntry>();

/**
 * Ambil data dari cache.
 * Mengembalikan null jika key tidak ditemukan atau sudah kedaluwarsa.
 *
 * @param key - Kunci cache
 */
export function getCache<T>(key: string): T | null {
  const entry = store.get(key);

  if (!entry) {
    return null;
  }

  // Hapus otomatis jika sudah kedaluwarsa
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }

  return entry.data as T;
}

/**
 * Simpan data ke cache dengan TTL.
 *
 * @param key   - Kunci cache
 * @param data  - Data yang disimpan
 * @param ttlMs - Waktu hidup dalam milidetik (default: 5 menit)
 */
export function setCache(
  key: string,
  data: unknown,
  ttlMs: number = 5 * 60 * 1000
): void {
  store.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

/**
 * Hapus semua key yang diawali dengan pattern tertentu.
 * Berguna untuk invalidasi cache per-grup, misalnya "slots:" atau "profile:".
 *
 * @param pattern - Awalan key yang akan dihapus
 */
export function invalidateCache(pattern: string): void {
  for (const key of store.keys()) {
    if (key.startsWith(pattern)) {
      store.delete(key);
    }
  }
}

/**
 * Bersihkan seluruh cache.
 */
export function clearCache(): void {
  store.clear();
}
