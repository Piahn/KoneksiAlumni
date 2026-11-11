import { Router } from 'express';
import { createBooking, getMyBookings, getBookingById, cancelBooking, completeBooking } from '../controllers/bookingController';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';
import { bookingLimiter } from '../middlewares/rateLimiter';
import { idempotencyCheck } from '../middlewares/idempotency';

const router = Router();

router.post('/', bookingLimiter, authenticate, authorize('student'), idempotencyCheck, createBooking);
router.get('/my', authenticate, getMyBookings);
router.get('/:id', authenticate, getBookingById);
router.patch('/:id/cancel', authenticate, cancelBooking);
router.patch('/:id/complete', authenticate, authorize('alumni'), completeBooking);

export default router;
