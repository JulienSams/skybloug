import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Underline from '@tiptap/extension-underline';
import { EditorToolbar } from './EditorToolbar';
import { Article } from '../../types/Article';

interface ArticleEditorProps {
  onSave: (article: { title: string; content: string; tags: string[]; status: 'draft' | 'published' }) => void;
  onCancel: () => void;
  initialArticle?: Article;
}

export function ArticleEditor({ onSave, onCancel, initialArticle }: ArticleEditorProps) {
  const [title, setTitle] = useState(initialArticle?.title || '');
  const [tagsInput, setTagsInput] = useState(initialArticle?.tags.join(', ') || '');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: true,
      }),
      Youtube.configure({
        width: 550,
        height: 309,
      }),
    ],
    content: initialArticle?.content || '<p>Start writing your article...</p>',
    editorProps: {
      attributes: {
        style: 'min-height: 300px; padding: 15px; outline: none;',
      },
    },
  });

  useEffect(() => {
    if (editor && initialArticle?.content) {
      editor.commands.setContent(initialArticle.content);
    }
  }, [editor, initialArticle]);

  const handleSave = (status: 'draft' | 'published') => {
    if (!editor || !title.trim()) {
      alert('Please enter a title');
      return;
    }

    const content = editor.getHTML();
    const tags = tagsInput
      .split(/[,\s]+/)
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onSave({ title, content, tags, status });
  };

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      border: '2px solid #FF1493',
      borderRadius: '5px',
      overflow: 'hidden',
    }}>
      {/* Title Input */}
      <div style={{ padding: '15px', borderBottom: '1px solid #444' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title..."
          style={{
            width: '100%',
            backgroundColor: '#0a0a0a',
            border: '1px solid #444',
            color: '#FFFFFF',
            padding: '10px',
            fontSize: '18px',
            fontFamily: 'Verdana, Arial, sans-serif',
            fontWeight: 'bold',
          }}
        />
      </div>

      {/* Toolbar */}
      <EditorToolbar editor={editor} />

      {/* Editor Content */}
      <div style={{
        backgroundColor: '#0a0a0a',
        color: '#FFFFFF',
        fontFamily: 'Verdana, Arial, sans-serif',
        fontSize: '12px',
        lineHeight: '1.6',
      }}>
        <EditorContent editor={editor} />
      </div>

      {/* Tags Input */}
      <div style={{
        padding: '15px',
        borderTop: '1px solid #444',
        borderBottom: '1px solid #444',
      }}>
        <label style={{
          display: 'block',
          color: '#CCCCCC',
          fontSize: '11px',
          marginBottom: '5px',
          fontFamily: 'Verdana, Arial, sans-serif',
        }}>
          Tags (comma-separated):
        </label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="skyblog, musique, photos..."
          style={{
            width: '100%',
            backgroundColor: '#0a0a0a',
            border: '1px solid #444',
            color: '#FFFFFF',
            padding: '8px',
            fontSize: '11px',
            fontFamily: 'Verdana, Arial, sans-serif',
          }}
        />
        {tagsInput && (
          <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {tagsInput.split(/[,\s]+/).map((tag, i) => tag.trim() && (
              <span
                key={i}
                style={{
                  backgroundColor: '#00FF00',
                  color: '#000000',
                  padding: '2px 8px',
                  fontSize: '10px',
                  borderRadius: '3px',
                  fontFamily: 'Verdana, Arial, sans-serif',
                }}
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{
        padding: '15px',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
      }}>
        <button
          onClick={() => handleSave('draft')}
          style={{
            backgroundColor: '#666',
            color: '#FFFFFF',
            border: 'none',
            padding: '8px 20px',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: 'Verdana, Arial, sans-serif',
            fontWeight: 'bold',
          }}
        >
          Save as Draft
        </button>

        <button
          onClick={() => handleSave('published')}
          style={{
            backgroundColor: '#FF1493',
            color: '#FFFFFF',
            border: 'none',
            padding: '8px 20px',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: 'Verdana, Arial, sans-serif',
            fontWeight: 'bold',
          }}
        >
          Publish
        </button>

        <button
          onClick={onCancel}
          style={{
            backgroundColor: '#333',
            color: '#FFFFFF',
            border: 'none',
            padding: '8px 20px',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: 'Verdana, Arial, sans-serif',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
