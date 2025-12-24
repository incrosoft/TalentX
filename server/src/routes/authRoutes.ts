import { Router } from 'express';
import { login, loginAgency, me } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
/*

* Returns a JWT if the user is an agency and credentials are valid.
 */
router.post('/login', login);
router.get('/me', authenticateToken, me);
router.post('/agency/login', loginAgency)

export default router;
