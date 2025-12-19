import { Router } from 'express';
import { listAgencies, getAgency } from '../controllers/agencyController';

const router = Router();

router.get('/', listAgencies);
router.get('/:id', getAgency);

export default router;
