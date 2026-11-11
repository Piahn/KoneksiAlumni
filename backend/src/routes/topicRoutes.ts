import { Router } from 'express';
import { getTopics, createTopic, updateTopic, deleteTopic } from '../controllers/topicController';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

const router = Router();

router.get('/', authenticate, getTopics);
router.post('/', authenticate, authorize('admin'), createTopic);
router.patch('/:id', authenticate, authorize('admin'), updateTopic);
router.delete('/:id', authenticate, authorize('admin'), deleteTopic);

export default router;
