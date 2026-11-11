import { Router } from 'express';
import { getUsers, verifyAlumni, updateUserRole, deleteUser, getStats } from '../controllers/adminController';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

const router = Router();

router.get('/users', authenticate, authorize('admin'), getUsers);
router.patch('/verify/:userId', authenticate, authorize('admin'), verifyAlumni);
router.patch('/users/:userId/role', authenticate, authorize('admin'), updateUserRole);
router.delete('/users/:userId', authenticate, authorize('admin'), deleteUser);
router.get('/stats', authenticate, authorize('admin'), getStats);

export default router;
