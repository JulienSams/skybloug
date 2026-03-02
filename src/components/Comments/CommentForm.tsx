import { useState } from 'react';

interface CommentFormProps {
  onSubmit: (authorName: string, content: string) => void;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authorName.trim() && content.trim()) {
      onSubmit(authorName.trim(), content.trim());
      setAuthorName('');
      setContent('');
    }
  };

  const isValid = authorName.trim().length > 0 && content.trim().length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#1a1a1a',
        padding: '20px',
        borderRadius: '4px',
        marginTop: '20px',
      }}
    >
      <h3
        style={{
          color: '#FF1493',
          fontSize: '16px',
          marginBottom: '15px',
          fontFamily: 'Verdana, Arial, sans-serif',
        }}
      >
        Laisser un commentaire
      </h3>

      <div style={{ marginBottom: '15px' }}>
        <label
          htmlFor="authorName"
          style={{
            display: 'block',
            color: '#CCCCCC',
            fontSize: '12px',
            marginBottom: '5px',
            fontFamily: 'Verdana, Arial, sans-serif',
          }}
        >
          Votre nom *
        </label>
        <input
          type="text"
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          maxLength={50}
          required
          style={{
            width: '100%',
            padding: '8px 12px',
            backgroundColor: '#333',
            border: '1px solid #555',
            borderRadius: '4px',
            color: 'white',
            fontSize: '13px',
            fontFamily: 'Verdana, Arial, sans-serif',
          }}
        />
        <div
          style={{
            textAlign: 'right',
            fontSize: '10px',
            color: '#999',
            marginTop: '2px',
          }}
        >
          {authorName.length}/50
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label
          htmlFor="content"
          style={{
            display: 'block',
            color: '#CCCCCC',
            fontSize: '12px',
            marginBottom: '5px',
            fontFamily: 'Verdana, Arial, sans-serif',
          }}
        >
          Votre commentaire *
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={500}
          required
          rows={4}
          style={{
            width: '100%',
            padding: '8px 12px',
            backgroundColor: '#333',
            border: '1px solid #555',
            borderRadius: '4px',
            color: 'white',
            fontSize: '13px',
            fontFamily: 'Verdana, Arial, sans-serif',
            resize: 'vertical',
          }}
        />
        <div
          style={{
            textAlign: 'right',
            fontSize: '10px',
            color: '#999',
            marginTop: '2px',
          }}
        >
          {content.length}/500
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        style={{
          padding: '10px 20px',
          backgroundColor: isValid ? '#FF1493' : '#666',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isValid ? 'pointer' : 'not-allowed',
          fontSize: '13px',
          fontWeight: 'bold',
          fontFamily: 'Verdana, Arial, sans-serif',
        }}
        onMouseEnter={(e) => {
          if (isValid) e.currentTarget.style.backgroundColor = '#DD1077';
        }}
        onMouseLeave={(e) => {
          if (isValid) e.currentTarget.style.backgroundColor = '#FF1493';
        }}
      >
        Poster le commentaire
      </button>
    </form>
  );
}
