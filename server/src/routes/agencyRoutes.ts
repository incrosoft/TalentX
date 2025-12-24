import { Router } from 'express';
import { listAgencies, getAgency } from '../controllers/agencyController';
import { authenticateToken, authorizeAgency } from '../middleware/auth';
const router = Router();

/**
 * Agency-only endpoints
 * ---------------------
 * These routes are protected by both authentication and role-based authorization
 * to ensure only users with the `agency` role can access them.
 */
router.get('/', authenticateToken, authorizeAgency, listAgencies);
router.get('/:id', authenticateToken, authorizeAgency, getAgency);

export default router;
