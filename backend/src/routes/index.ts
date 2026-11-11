import type { Application } from 'express';
import authRoutes from './authRoutes';
import alumniRoutes from './alumniRoutes';
import slotRoutes from './slotRoutes';
import bookingRoutes from './bookingRoutes';
import reviewRoutes from './reviewRoutes';
import storageRoutes from './storageRoutes';
import topicRoutes from './topicRoutes';
import adminRoutes from './adminRoutes';

/**
 * Register all API route modules on the Express application.
 */
export function registerRoutes(app: Application): void {
  app.use('/api/auth', authRoutes);
  app.use('/api/alumni', alumniRoutes);
  app.use('/api/slots', slotRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/storage', storageRoutes);
  app.use('/api/topics', topicRoutes);
  app.use('/api/admin', adminRoutes);
}
