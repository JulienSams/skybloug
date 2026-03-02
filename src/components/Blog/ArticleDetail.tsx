import type { Article } from '../../types/Article';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onTagClick: (tag: string) => void;
}

export function ArticleDetail({ article, onBack, onTagClick }: ArticleDetailProps) {
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
          borderRadius: '4px',
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
          <span style={{ marginLeft: '5px' }}>18 kiffs</span> |
          <span style={{ marginLeft: '5px' }}>5 commentaires</span>
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
            color: '#999',
            fontSize: '11px',
          }}
        >
          <p>18 kiffs | 5 commentaires</p>
        </div>
      </article>
    </div>
  );
}
