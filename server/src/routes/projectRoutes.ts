import { Router } from 'express';
import { listProjects, getProject, createProject, updateProject } from '../controllers/projectController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, listProjects);
router.get('/:id', authenticateToken, getProject);
router.post('/', authenticateToken, createProject);
router.patch('/:id', authenticateToken, updateProject);

export default router;
