import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { errorResponse } from '../utils/apiResponse';

/**
 * Validation middleware factory.
 * Memvalidasi req.body menggunakan skema Zod.
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessages = result.error.errors.map(
        (err) => `${err.path.join('.')}: ${err.message}`
      );

      errorResponse(res, `Validasi gagal: ${errorMessages.join(', ')}`, 400);
      return;
    }

    req.body = result.data;
    next();
  };
};
