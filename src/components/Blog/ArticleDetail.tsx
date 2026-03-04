import { useState } from 'react';
import type { Article } from '../../types/Article';
import type { Comment } from '../../types/Comment';
import { CommentForm } from '../Comments/CommentForm';
import { CommentList } from '../Comments/CommentList';
import { kiffArticle } from '../../services/api';

interface ArticleDetailProps {
  article: Article;
  comments: Comment[];
  onBack: () => void;
  onTagClick: (tag: string) => void;
  onAddComment: (authorName: string, content: string) => void;
}

export function ArticleDetail({ article, comments, onBack, onTagClick, onAddComment }: ArticleDetailProps) {
  const [kiffs, setKiffs] = useState(article.kiffs);
  const [hasKiffed, setHasKiffed] = useState(false);

  const handleKiff = async () => {
    if (hasKiffed) return;

    try {
      const result = await kiffArticle(article.id);
      setKiffs(result.kiffs);
      setHasKiffed(true);
    } catch (error) {
      console.error('Error kiffing article:', error);
    }
  };
  // Format date as DD/MM/YYYY à HH:MM
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} à ${hours}:${minutes}`;
  };

  return (
    <div className="blog-content">
      <button
        onClick={onBack}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: '#0099FF',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          fontFamily: 'Verdana, Arial, sans-serif',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0077CC')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0099FF')}
      >
        ← Retour au blog
      </button>

      <article style={{ marginBottom: '30px' }}>
        <h1
          style={{
            color: '#FF1493',
            borderBottom: '2px solid #FF1493',
            paddingBottom: '5px',
            marginBottom: '10px',
            fontSize: '28px',
            fontFamily: 'Verdana, Arial, sans-serif',
          }}
        >
          {article.title}
        </h1>

        <p
          className="text-muted"
          style={{
            marginBottom: '20px',
            fontSize: '11px',
            color: '#999',
          }}
        >
          Publié le {formatDate(article.createdAt)} |
          <span style={{ marginLeft: '5px' }}>{article.kiffs} kiff{article.kiffs !== 1 ? 's' : ''}</span> |
          <span style={{ marginLeft: '5px' }}>{comments.length} commentaire{comments.length !== 1 ? 's' : ''}</span>
        </p>

        <div
          style={{
            color: '#CCCCCC',
            fontSize: '13px',
            lineHeight: '1.8',
            marginBottom: '20px',
            fontFamily: 'Verdana, Arial, sans-serif',
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags.length > 0 && (
          <div
            style={{
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #444',
            }}
          >
            <p style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#CCCCCC', fontSize: '13px' }}>Tags:</strong>{' '}
              {article.tags.map((tag, index) => (
                <span key={index}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onTagClick(tag);
                    }}
                    style={{
                      color: '#00FF00',
                      textDecoration: 'none',
                      fontSize: '12px',
                      marginLeft: index > 0 ? '5px' : '8px',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    {tag}
                  </a>
                  {index < article.tags.length - 1 && <span style={{ color: '#999' }}>,</span>}
                </span>
              ))}
            </p>
          </div>
        )}

        <div
          style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #444',
            fontSize: '11px',
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
          }}
        >
          <button
            onClick={handleKiff}
            disabled={hasKiffed}
            style={{
              backgroundColor: hasKiffed ? '#FF1493' : '#666',
              color: 'white',
              border: 'none',
              padding: '8px 20px',
              cursor: hasKiffed ? 'default' : 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
              fontFamily: 'Verdana, Arial, sans-serif',
              opacity: hasKiffed ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!hasKiffed) e.currentTarget.style.backgroundColor = '#FF1493';
            }}
            onMouseLeave={(e) => {
              if (!hasKiffed) e.currentTarget.style.backgroundColor = '#666';
            }}
          >
            {hasKiffed ? '❤️ Kiffé!' : '🤍 Kiffer cet article'}
          </button>
          <span style={{ color: '#999' }}>
            {kiffs} kiff{kiffs !== 1 ? 's' : ''} | {comments.length} commentaire{comments.length !== 1 ? 's' : ''}
          </span>
        </div>
      </article>

      {/* Comments Section */}
      <div
        style={{
          marginTop: '40px',
          paddingTop: '30px',
          borderTop: '2px solid #444',
        }}
      >
        <h2
          style={{
            color: '#FF1493',
            fontSize: '20px',
            marginBottom: '20px',
            fontFamily: 'Verdana, Arial, sans-serif',
          }}
        >
          Commentaires ({comments.length})
        </h2>

        <CommentList comments={comments} />
        <CommentForm onSubmit={onAddComment} />
      </div>
    </div>
  );
}
