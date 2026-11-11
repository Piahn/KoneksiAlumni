import { Router } from 'express';
import { createReview, getReviews } from '../controllers/reviewController';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';
import { idempotencyCheck } from '../middlewares/idempotency';

const router = Router();

router.post('/', authenticate, authorize('student'), idempotencyCheck, createReview);
router.get('/', authenticate, getReviews);

export default router;
