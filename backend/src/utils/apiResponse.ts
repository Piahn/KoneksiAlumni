/**
 * Helper Respons API
 *
 * Fungsi utilitas untuk mengirim respons JSON yang konsisten
 * di seluruh endpoint.
 */

import type { Response } from "express";
import type { ApiResponse } from "../types";

/**
 * Kirim respons sukses.
 *
 * @param res      - Express Response object
 * @param data     - Data yang dikembalikan ke klien
 * @param message  - Pesan deskriptif
 * @param statusCode - HTTP status code (default: 200)
 */
export function successResponse<T>(
  res: Response,
  data: T,
  message: string = "Berhasil",
  statusCode: number = 200
): Response {
  const body: ApiResponse<T> = {
    success: true,
    message,
    data,
  };

  return res.status(statusCode).json(body);
}

/**
 * Kirim respons error.
 *
 * @param res        - Express Response object
 * @param message    - Pesan error
 * @param statusCode - HTTP status code (default: 400)
 */
export function errorResponse(
  res: Response,
  message: string = "Terjadi kesalahan",
  statusCode: number = 400
): Response {
  const body: ApiResponse = {
    success: false,
    message,
  };

  return res.status(statusCode).json(body);
}
