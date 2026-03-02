import { Request, Response } from 'express';
import prisma from '../config/database';

export const getComments = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { articleId },
      orderBy: {
        createdAt: 'asc' // Oldest first for chronological reading
      }
    });

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    const { authorName, content } = req.body;

    // Validate required fields
    if (!authorName || !content) {
      return res.status(400).json({ error: 'Author name and content are required' });
    }

    // Verify article exists
    const article = await prisma.article.findUnique({
      where: { id: articleId }
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        articleId,
        authorName,
        content
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};
