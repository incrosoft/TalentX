import { Router } from 'express';
import { getMetrics, updateMetrics } from '../controllers/platformMetricsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getMetrics);

// Admin routes
router.put('/', authenticateToken("admin"), updateMetrics);

export default router;
