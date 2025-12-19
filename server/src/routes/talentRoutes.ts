import { Router } from 'express';
import { listTalents, getTalent } from '../controllers/talentController';

const router = Router();

router.get('/', listTalents);
router.get('/:id', getTalent);

export default router;
