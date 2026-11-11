import type { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

/**
 * Idempotency middleware
 * Mencegah eksekusi ganda jika client mengirimkan header Idempotency-Key.
 */
export const idempotencyCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const idempotencyKey = req.headers['idempotency-key'] as string | undefined;

  // Lewati jika request tidak menyertakan Idempotency-Key
  if (!idempotencyKey) {
    next();
    return;
  }

  try {
    const { data: existing, error: fetchError } = await supabase
      .from('idempotency_keys')
      .select('*')
      .eq('key', idempotencyKey)
      .maybeSingle();

    if (fetchError) {
      console.error('Idempotency lookup error:', fetchError);
      next();
      return;
    }

    // Jika key ada dan berusia kurang dari 24 jam, kembalikan response tersimpan
    if (existing) {
      const createdAt = new Date(existing.created_at).getTime();
      const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

      if (createdAt > twentyFourHoursAgo) {
        res.status(200).json(existing.response);
        return;
      }
    }

    // Intercept res.json untuk menyimpan response baru
    const originalJson = res.json.bind(res);

    res.json = ((body: any) => {
      supabase
        .from('idempotency_keys')
        .upsert(
          {
            key: idempotencyKey,
            response: body,
            created_at: new Date().toISOString(),
          },
          { onConflict: 'key' }
        )
        .then(({ error: insertError }: { error: any }) => {
          if (insertError) {
            console.error('Failed to store idempotency key:', insertError);
          }
        });

      return originalJson(body);
    }) as Response['json'];

    next();
  } catch (error) {
    console.error('Idempotency middleware error:', error);
    next();
  }
};
