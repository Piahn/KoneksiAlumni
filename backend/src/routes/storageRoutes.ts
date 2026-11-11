import { Router } from 'express';
import { getUploadUrl, getCvUrl } from '../controllers/storageController';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

const router = Router();

router.post('/upload-url', authenticate, authorize('student'), getUploadUrl);
router.get('/cv-url/:bookingId', authenticate, authorize('alumni'), getCvUrl);

export default router;
