import { useState, useMemo } from 'react';
import { Article, NewArticle } from '../types/Article';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  const createArticle = (newArticle: NewArticle): Article => {
    const article: Article = {
      ...newArticle,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setArticles(prev => [...prev, article]);
    return article;
  };

  const updateArticle = (id: string, updates: Partial<Omit<Article, 'id' | 'createdAt'>>): void => {
    setArticles(prev =>
      prev.map(article =>
        article.id === id
          ? { ...article, ...updates, updatedAt: new Date() }
          : article
      )
    );
  };

  const deleteArticle = (id: string): void => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  const getArticle = (id: string): Article | undefined => {
    return articles.find(article => article.id === id);
  };

  // Computed filtered lists
  const drafts = useMemo(
    () => articles.filter(article => article.status === 'draft'),
    [articles]
  );

  const published = useMemo(
    () => articles.filter(article => article.status === 'published'),
    [articles]
  );

  return {
    articles,
    drafts,
    published,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticle,
  };
}
