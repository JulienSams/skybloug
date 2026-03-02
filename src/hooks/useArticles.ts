import { useState, useMemo, useEffect } from 'react';
import type { NewArticle } from '../types/Article';
import type { Article  } from '../types/Article';
import * as api from '../services/api';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles on mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await api.getArticles();
        // Convert backend format (isDraft) to frontend format (status)
        const convertedArticles = data.map((article: any) => ({
          ...article,
          status: article.isDraft ? 'draft' : 'published',
          createdAt: new Date(article.createdAt),
          updatedAt: new Date(article.updatedAt)
        }));
        setArticles(convertedArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const createArticle = async (newArticle: NewArticle): Promise<Article> => {
    try {
      // Convert frontend format (status) to backend format (isDraft)
      const data = await api.createArticle({
        title: newArticle.title,
        content: newArticle.content,
        isDraft: newArticle.status === 'draft',
        tags: newArticle.tags
      });

      const article: Article = {
        ...data,
        status: data.isDraft ? 'draft' : 'published',
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
      };

      setArticles(prev => [...prev, article]);
      return article;
    } catch (error) {
      console.error('Failed to create article:', error);
      throw error;
    }
  };

  const updateArticle = async (id: string, updates: Partial<Omit<Article, 'id' | 'createdAt'>>): Promise<void> => {
    try {
      // Optimistically update UI
      setArticles(prev =>
        prev.map(article =>
          article.id === id
            ? { ...article, ...updates, updatedAt: new Date() }
            : article
        )
      );

      // Convert frontend format to backend format
      const backendUpdates: any = {};
      if (updates.title) backendUpdates.title = updates.title;
      if (updates.content) backendUpdates.content = updates.content;
      if (updates.status) backendUpdates.isDraft = updates.status === 'draft';
      if (updates.tags) backendUpdates.tags = updates.tags;

      const data = await api.updateArticle(id, backendUpdates);

      // Update with server response
      setArticles(prev =>
        prev.map(article =>
          article.id === id
            ? {
                ...data,
                status: data.isDraft ? 'draft' : 'published',
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt)
              }
            : article
        )
      );
    } catch (error) {
      console.error('Failed to update article:', error);
      // Revert optimistic update on error
      const fetchArticles = async () => {
        const data = await api.getArticles();
        const convertedArticles = data.map((article: any) => ({
          ...article,
          status: article.isDraft ? 'draft' : 'published',
          createdAt: new Date(article.createdAt),
          updatedAt: new Date(article.updatedAt)
        }));
        setArticles(convertedArticles);
      };
      fetchArticles();
    }
  };

  const deleteArticle = async (id: string): Promise<void> => {
    try {
      // Optimistically remove from UI
      setArticles(prev => prev.filter(article => article.id !== id));

      await api.deleteArticle(id);
    } catch (error) {
      console.error('Failed to delete article:', error);
      // Revert on error
      const data = await api.getArticles();
      const convertedArticles = data.map((article: any) => ({
        ...article,
        status: article.isDraft ? 'draft' : 'published',
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt)
      }));
      setArticles(convertedArticles);
    }
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
    loading,
  };
}
