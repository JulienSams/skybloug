import type { Comment } from '../../types/Comment';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
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

  if (comments.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999',
          fontSize: '13px',
          fontFamily: 'Verdana, Arial, sans-serif',
          fontStyle: 'italic',
        }}
      >
        Aucun commentaire pour le moment. Soyez le premier à commenter!
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <div
            style={{
              backgroundColor: '#1a1a1a',
              padding: '15px',
              marginBottom: index < comments.length - 1 ? '10px' : '0',
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <strong
                style={{
                  color: '#FF1493',
                  fontSize: '13px',
                  fontFamily: 'Verdana, Arial, sans-serif',
                }}
              >
                {comment.authorName}
              </strong>
              <span
                style={{
                  color: '#999',
                  fontSize: '11px',
                  marginLeft: '10px',
                  fontFamily: 'Verdana, Arial, sans-serif',
                }}
              >
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p
              style={{
                color: '#CCCCCC',
                fontSize: '13px',
                lineHeight: '1.6',
                margin: 0,
                fontFamily: 'Verdana, Arial, sans-serif',
                whiteSpace: 'pre-wrap',
              }}
            >
              {comment.content}
            </p>
          </div>
          {index < comments.length - 1 && (
            <div
              style={{
                height: '1px',
                backgroundColor: '#444',
                margin: '10px 0',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
