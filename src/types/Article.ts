export interface Article {
  id: string;
  title: string;
  content: string; // TipTap HTML content
  status: 'draft' | 'published';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type NewArticle = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>;
