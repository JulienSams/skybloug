import type { Article } from '../../types/Article';
import type { Profile } from '../../types/Profile';
import { ArticlePreview } from './ArticlePreview';

interface BlogHomeProps {
  articles: Article[];
  profile: Profile;
  onArticleClick: (id: string) => void;
  onTagClick: (tag: string) => void;
  selectedTag: string | null;
  onClearTagFilter: () => void;
}

export function BlogHome({ articles, profile, onArticleClick, onTagClick, selectedTag, onClearTagFilter }: BlogHomeProps) {
  // Filter to only published articles and sort by date (newest first)
  const publishedArticles = articles
    .filter((article) => !article.isDraft)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="blog-content">
      {selectedTag && (
        <div
          style={{
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#1a1a1a',
            borderLeft: '4px solid #00FF00',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#00FF00', fontSize: '13px', fontFamily: 'Verdana, Arial, sans-serif' }}>
            Articles avec le tag: <strong>{selectedTag}</strong>
          </span>
          <button
            onClick={onClearTagFilter}
            style={{
              padding: '6px 12px',
              backgroundColor: '#333',
              color: '#00FF00',
              border: '1px solid #00FF00',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              fontFamily: 'Verdana, Arial, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00FF00';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
              e.currentTarget.style.color = '#00FF00';
            }}
          >
            ✕ Voir tous les articles
          </button>
        </div>
      )}

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
          {selectedTag ? `Aucun article avec le tag "${selectedTag}".` : 'Aucun article publié pour le moment.'}
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
