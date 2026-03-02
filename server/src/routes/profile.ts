import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';

const router = Router();

// Profile routes (single-user)
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;
