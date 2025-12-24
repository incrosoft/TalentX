import { Router } from 'express';
import {
    getApprovedAndPublishedTestimonials,
    getAllTestimonials,
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    approveTestimonial,
    togglePublish,
    deleteTestimonial,
} from '../controllers/testimonialController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getApprovedAndPublishedTestimonials);
router.get('/:id', getTestimonial);
router.post('/', createTestimonial);
router.put('/:id', updateTestimonial);

// Admin routes
router.get('/admin/all', authenticateToken("admin"), getAllTestimonials);
router.patch('/:id/approve', authenticateToken("admin"), approveTestimonial);
router.patch('/:id/publish', authenticateToken("admin"), togglePublish);
router.delete('/:id', authenticateToken("admin"), deleteTestimonial);

export default router;
