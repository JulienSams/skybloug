import { useState } from 'react';
import type { Article } from '../../types/Article';
import type { Comment } from '../../types/Comment';
import { kiffArticle } from '../../services/api';

interface ArticlePreviewProps {
  article: Article;
  comments: Comment[];
  onArticleClick: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export function ArticlePreview({ article, comments, onArticleClick, onTagClick }: ArticlePreviewProps) {
  const [kiffs, setKiffs] = useState(article.kiffs);
  const [hasKiffed, setHasKiffed] = useState(false);

  const handleKiff = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasKiffed) return; // Prevent multiple kiffs

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

  // Extract first image from HTML
  const getFirstImage = (html: string): string | null => {
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

  // Strip HTML tags and get first 200 characters
  const getPreviewText = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  };

  const firstImage = getFirstImage(article.content);
  const previewComments = comments.slice(0, 2);
  const hasMoreComments = comments.length > 2;

  return (
    <article
      style={{
        marginBottom: '30px',
        backgroundColor: '#1a1a1a',
        padding: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onClick={() => onArticleClick(article.id)}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#222')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
    >
      <h1
        style={{
          color: '#FF1493',
          borderBottom: '2px solid #FF1493',
          paddingBottom: '5px',
          marginBottom: '10px',
          fontSize: '24px',
          fontFamily: 'Verdana, Arial, sans-serif',
        }}
      >
        {article.title}
      </h1>

      <p
        className="text-muted"
        style={{
          marginBottom: '15px',
          fontSize: '11px',
          color: '#999',
        }}
      >
        Publié le {formatDate(article.createdAt)} |
        <span style={{ marginLeft: '5px', cursor: 'pointer' }}>{article.kiffs} kiff{article.kiffs !== 1 ? 's' : ''}</span> |
        <span style={{ marginLeft: '5px', cursor: 'pointer' }}>Commenter</span>
      </p>

      {/* Show image if exists */}
      {firstImage && (
        <div style={{ marginBottom: '15px' }}>
          <img
            src={firstImage}
            alt="Article preview"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      )}

      <p
        style={{
          color: '#CCCCCC',
          fontSize: '13px',
          lineHeight: '1.6',
          marginBottom: '15px',
          fontFamily: 'Verdana, Arial, sans-serif',
        }}
      >
        {getPreviewText(article.content)}
      </p>

      <p
        style={{
          color: '#999',
          fontSize: '11px',
          marginBottom: '15px',
        }}
      >
        <button
          onClick={handleKiff}
          disabled={hasKiffed}
          style={{
            background: 'none',
            border: 'none',
            color: hasKiffed ? '#FF1493' : '#999',
            cursor: hasKiffed ? 'default' : 'pointer',
            fontSize: '11px',
            padding: 0,
            fontFamily: 'Verdana, Arial, sans-serif',
            textDecoration: hasKiffed ? 'none' : 'underline',
          }}
        >
          {hasKiffed ? '❤️' : '🤍'} {kiffs} kiff{kiffs !== 1 ? 's' : ''}
        </button> |
        <span style={{ marginLeft: '5px', cursor: 'pointer' }}>
          {comments.length} commentaire{comments.length !== 1 ? 's' : ''}
        </span>
      </p>

      {/* Show preview of first 2 comments */}
      {previewComments.length > 0 && (
        <div style={{ marginBottom: '15px', borderTop: '1px solid #333', paddingTop: '10px' }}>
          {previewComments.map((comment) => (
            <div
              key={comment.id}
              style={{
                backgroundColor: '#0a0a0a',
                padding: '10px',
                marginBottom: '8px',
              }}
            >
              <div style={{ marginBottom: '5px' }}>
                <strong style={{ color: '#FF1493', fontSize: '11px' }}>
                  {comment.authorName}
                </strong>
                <span style={{ color: '#666', fontSize: '10px', marginLeft: '8px' }}>
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p
                style={{
                  color: '#AAA',
                  fontSize: '12px',
                  margin: 0,
                  lineHeight: '1.4',
                }}
              >
                {comment.content.length > 100
                  ? comment.content.substring(0, 100) + '...'
                  : comment.content}
              </p>
            </div>
          ))}
          {hasMoreComments && (
            <p
              style={{
                color: '#FF1493',
                fontSize: '11px',
                textAlign: 'center',
                margin: '5px 0 0 0',
                cursor: 'pointer',
              }}
            >
              ... voir tous les commentaires
            </p>
          )}
        </div>
      )}

      {article.tags.length > 0 && (
        <p style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#CCCCCC', fontSize: '12px' }}>Tags:</strong>{' '}
          {article.tags.map((tag, index) => (
            <span key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
                style={{
                  color: '#00FF00',
                  textDecoration: 'none',
                  fontSize: '11px',
                  marginLeft: index > 0 ? '5px' : '8px',
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
      )}
    </article>
  );
}
