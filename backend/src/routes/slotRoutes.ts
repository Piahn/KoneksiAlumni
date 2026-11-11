import { Router } from 'express';
import { createSlot, getSlots, updateSlot, deleteSlot } from '../controllers/slotController';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

const router = Router();

router.post('/', authenticate, authorize('alumni'), createSlot);
router.get('/', authenticate, getSlots);
router.patch('/:id', authenticate, authorize('alumni'), updateSlot);
router.delete('/:id', authenticate, authorize('alumni'), deleteSlot);

export default router;
