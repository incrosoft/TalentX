import { Router } from 'express';
import { listMessages, createMessage } from '../controllers/messageController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, listMessages);
router.post('/', authenticateToken, createMessage);

export default router;
