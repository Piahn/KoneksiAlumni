import type { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { errorResponse } from '../utils/apiResponse';
import type { Profile } from '../types';

/**
 * Authentication middleware
 * Verifies the Bearer token from the Authorization header using Supabase Auth,
 * fetches the user's profile, and attaches both to the request object.
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      errorResponse(res, 'Token otentikasi tidak ditemukan atau tidak valid.', 401);
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verify token with Supabase Auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      errorResponse(res, 'Sesi tidak valid atau telah kadaluarsa.', 401);
      return;
    }

    // Fetch user profile from the profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      errorResponse(res, 'Profil pengguna tidak ditemukan.', 401);
      return;
    }

    // Attach user and profile to the request object
    req.user = { ...user, profile: profile as Profile };

    next();
  } catch (error) {
    errorResponse(res, 'Otentikasi gagal.', 401);
  }
};
