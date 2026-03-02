import { useState } from 'react';
import type { Comment } from '../types/Comment';

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);

  const getCommentsForArticle = (articleId: string): Comment[] => {
    return comments
      .filter((comment) => comment.articleId === articleId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  };

  const addComment = (articleId: string, authorName: string, content: string) => {
    const newComment: Comment = {
      id: crypto.randomUUID(),
      articleId,
      authorName,
      content,
      createdAt: new Date(),
    };
    setComments((prev) => [...prev, newComment]);
  };

  return {
    getCommentsForArticle,
    addComment,
  };
}
