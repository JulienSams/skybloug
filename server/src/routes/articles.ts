import { Router } from 'express';
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
} from '../controllers/articleController';

const router = Router();

// Article routes
router.post('/articles', createArticle);
router.get('/articles', getArticles);
router.get('/articles/:id', getArticle);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);

export default router;
