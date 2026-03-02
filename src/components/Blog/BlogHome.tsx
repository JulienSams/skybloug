import type { Article } from '../../types/Article';
import type { Profile } from '../../types/Profile';
import { ArticlePreview } from './ArticlePreview';

interface BlogHomeProps {
  articles: Article[];
  profile: Profile;
  onArticleClick: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export function BlogHome({ articles, profile, onArticleClick, onTagClick }: BlogHomeProps) {
  // Filter to only published articles and sort by date (newest first)
  const publishedArticles = articles
    .filter((article) => !article.isDraft)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="blog-content">
      {publishedArticles.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#999',
            fontSize: '14px',
            fontFamily: 'Verdana, Arial, sans-serif',
          }}
        >
          Aucun article publié pour le moment.
        </div>
      ) : (
        publishedArticles.map((article) => (
          <ArticlePreview
            key={article.id}
            article={article}
            onArticleClick={onArticleClick}
            onTagClick={onTagClick}
          />
        ))
      )}
    </div>
  );
}
