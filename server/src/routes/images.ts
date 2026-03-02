import { Router } from 'express';
import upload from '../middleware/upload';
import { uploadImage } from '../controllers/imageController';

const router = Router();

// Image upload route - use multer middleware for single file upload
router.post('/images', upload.single('image'), uploadImage);

export default router;
