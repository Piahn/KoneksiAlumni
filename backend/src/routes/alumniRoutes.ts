import { Router } from 'express';
import { getAlumni, getAlumniById } from '../controllers/alumniController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticate, getAlumni);
router.get('/:id', authenticate, getAlumniById);

export default router;
