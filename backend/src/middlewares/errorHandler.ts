import { Request, Response, NextFunction } from 'express';

/**
 * Global Express error handler.
 * Catches all unhandled errors and returns a consistent JSON response.
 *
 * In development mode (NODE_ENV === 'development'), the error message
 * is included in the response for easier debugging.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log the full error for server-side debugging
  console.error('Unhandled error:', err);

  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(isDevelopment && { error: err.message }),
  });
};
