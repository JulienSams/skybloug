import { Router } from 'express';
import { getComments, createComment } from '../controllers/commentController';

const router = Router();

// Comment routes (nested under articles)
router.get('/articles/:articleId/comments', getComments);
router.post('/articles/:articleId/comments', createComment);

export default router;
