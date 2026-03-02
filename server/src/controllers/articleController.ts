import { Request, Response } from 'express';
import prisma from '../config/database';

export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, isDraft, tags } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Create article with tags
    const article = await prisma.article.create({
      data: {
        title,
        content,
        isDraft: isDraft ?? true,
        tags: {
          create: (tags || []).map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName }
              }
            }
          }))
        }
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    // Format response with simplified tags
    const formattedArticle = {
      ...article,
      tags: article.tags.map(at => at.tag.name)
    };

    res.status(201).json(formattedArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const { draft } = req.query;

    const where = draft !== undefined ? { isDraft: draft === 'true' } : {};

    const articles = await prisma.article.findMany({
      where,
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        _count: {
          select: { comments: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format response with simplified tags
    const formattedArticles = articles.map(article => ({
      ...article,
      tags: article.tags.map(at => at.tag.name),
      commentCount: article._count.comments
    }));

    res.json(formattedArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Ensure id is a string (Express can provide string | string[])
    const articleId = Array.isArray(id) ? id[0] : id;

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        tags: {
          include: {
            tag: true
          }
        },
        comments: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Format response with simplified tags
    const formattedArticle = {
      ...article,
      tags: article.tags.map(at => at.tag.name)
    };

    res.json(formattedArticle);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, isDraft, tags } = req.body;

    // Ensure id is a string (Express can provide string | string[])
    const articleId = Array.isArray(id) ? id[0] : id;

    // Check if article exists
    const existing = await prisma.article.findUnique({ where: { id: articleId } });
    if (!existing) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Delete existing tag associations
    await prisma.articleTag.deleteMany({
      where: { articleId }
    });

    // Update article with new tags
    const article = await prisma.article.update({
      where: { id: articleId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(isDraft !== undefined && { isDraft }),
        ...(tags && {
          tags: {
            create: tags.map((tagName: string) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName }
                }
              }
            }))
          }
        })
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    // Format response with simplified tags
    const formattedArticle = {
      ...article,
      tags: article.tags.map(at => at.tag.name)
    };

    res.json(formattedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Ensure id is a string (Express can provide string | string[])
    const articleId = Array.isArray(id) ? id[0] : id;

    // Check if article exists
    const existing = await prisma.article.findUnique({ where: { id: articleId } });
    if (!existing) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Delete article (cascade will handle ArticleTag and Comments)
    await prisma.article.delete({
      where: { id: articleId }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
};
