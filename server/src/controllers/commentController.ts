import { Request, Response } from 'express';
import prisma from '../config/database';

export const getComments = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;

    // Ensure articleId is a string (Express can provide string | string[])
    const id = Array.isArray(articleId) ? articleId[0] : articleId;

    const comments = await prisma.comment.findMany({
      where: { articleId: id },
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

    // Ensure articleId is a string (Express can provide string | string[])
    const id = Array.isArray(articleId) ? articleId[0] : articleId;

    // Validate required fields
    if (!authorName || !content) {
      return res.status(400).json({ error: 'Author name and content are required' });
    }

    // Verify article exists
    const article = await prisma.article.findUnique({
      where: { id }
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        articleId: id,
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
