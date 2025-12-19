import { Router } from 'express';
import { listTeams, getTeam } from '../controllers/teamController';

const router = Router();

router.get('/', listTeams);
router.get('/:id', getTeam);

export default router;
