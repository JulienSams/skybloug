import type { Article } from '../../types/Article';

interface ArticlePreviewProps {
  article: Article;
  onArticleClick: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export function ArticlePreview({ article, onArticleClick, onTagClick }: ArticlePreviewProps) {
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

  return (
    <article
      style={{
        marginBottom: '30px',
        backgroundColor: '#1a1a1a',
        padding: '20px',
        borderRadius: '4px',
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
        <span style={{ marginLeft: '5px', cursor: 'pointer' }}>18 kiffs</span> |
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
              borderRadius: '4px',
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
        <span style={{ cursor: 'pointer' }}>18 kiffs</span> |
        <span style={{ marginLeft: '5px', cursor: 'pointer' }}>5 commentaires</span>
      </p>

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
