import type { Article } from '../../types/Article';

interface ArticleListProps {
  articles: Article[];
  onEdit: (articleId: string) => void;
  onDelete: (articleId: string) => void;
  onNewArticle: () => void;
}

export function ArticleList({ articles, onEdit, onDelete, onNewArticle }: ArticleListProps) {
  const handleDelete = (article: Article) => {
    if (window.confirm(`Are you sure you want to delete "${article.title}"?`)) {
      onDelete(article.id);
    }
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* New Article Button */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          onClick={onNewArticle}
          style={{
            backgroundColor: '#FF1493',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px 30px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'Verdana, Arial, sans-serif',
            fontWeight: 'bold',
          }}
        >
          ✏️ New Article
        </button>
      </div>

      {/* Articles List */}
      {articles.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: '#CCCCCC',
          padding: '40px',
          fontSize: '13px',
          fontFamily: 'Verdana, Arial, sans-serif',
        }}>
          <p style={{ fontSize: '48px', margin: '0 0 15px 0' }}>📝</p>
          <p>No articles yet. Click "New Article" to start writing!</p>
        </div>
      ) : (
        <div>
          {articles.map(article => (
            <div
              key={article.id}
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #444',
                padding: '15px',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <h3 style={{
                    color: '#FFFFFF',
                    margin: 0,
                    fontSize: '14px',
                    fontFamily: 'Verdana, Arial, sans-serif',
                  }}>
                    {article.title}
                  </h3>
                  <span style={{
                    backgroundColor: article.status === 'published' ? '#FF1493' : '#666',
                    color: '#FFFFFF',
                    padding: '2px 8px',
                    fontSize: '10px',
                            fontFamily: 'Verdana, Arial, sans-serif',
                    textTransform: 'uppercase',
                  }}>
                    {article.status}
                  </span>
                </div>
                <p style={{
                  color: '#999',
                  margin: 0,
                  fontSize: '11px',
                  fontFamily: 'Verdana, Arial, sans-serif',
                }}>
                  Created: {formatDate(article.createdAt)}
                </p>
                {article.tags && article.tags.length > 0 && (
                  <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {article.tags.map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: '#00FF00',
                          color: '#000000',
                          padding: '2px 6px',
                          fontSize: '9px',
                          fontFamily: 'Verdana, Arial, sans-serif',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onEdit(article.id)}
                  style={{
                    backgroundColor: '#0099FF',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '6px 15px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontFamily: 'Verdana, Arial, sans-serif',
                          }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article)}
                  style={{
                    backgroundColor: '#CC0000',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '6px 15px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontFamily: 'Verdana, Arial, sans-serif',
                          }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
