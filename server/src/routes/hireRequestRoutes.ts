import { Router } from 'express';
import { createHireRequest, listHireRequests } from '../controllers/hireRequestController';

const router = Router();

router.post('/', createHireRequest);
router.get('/', listHireRequests);

export default router;
