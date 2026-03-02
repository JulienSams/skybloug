import { useState, useCallback } from 'react';
import type { Comment } from '../types/Comment';
import * as api from '../services/api';

export function useComments() {
  const [loading, setLoading] = useState(false);

  const getCommentsForArticle = useCallback(async (articleId: string): Promise<Comment[]> => {
    setLoading(true);
    try {
      const data = await api.getComments(articleId);
      // Convert createdAt strings to Date objects
      return data.map((comment: any) => ({
        ...comment,
        createdAt: new Date(comment.createdAt)
      }));
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const addComment = async (articleId: string, authorName: string, content: string): Promise<Comment | null> => {
    try {
      const data = await api.createComment(articleId, { authorName, content });
      return {
        ...data,
        createdAt: new Date(data.createdAt)
      };
    } catch (error) {
      console.error('Failed to create comment:', error);
      return null;
    }
  };

  return {
    getCommentsForArticle,
    addComment,
    loading,
  };
}
