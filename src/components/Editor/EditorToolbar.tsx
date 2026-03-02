import { useRef, useState } from 'react';
import { Editor } from '@tiptap/react';
import * as api from '../../services/api';

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Image must be smaller than 5MB');
      return;
    }

    // Upload to server
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      // Use full URL with server address
      const fullUrl = `http://localhost:3000${url}`;
      editor.chain().focus().setImage({ src: fullUrl }).run();
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleYouTubeEmbed = () => {
    const url = window.prompt('Enter YouTube URL:');
    if (!url) return;

    // Basic validation
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  const buttonStyle = (isActive: boolean) => ({
    backgroundColor: isActive ? '#FF1493' : '#333',
    color: '#FFFFFF',
    border: 'none',
    padding: '5px 10px',
    margin: '2px',
    cursor: 'pointer',
    fontSize: '11px',
    fontFamily: 'Verdana, Arial, sans-serif',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  const colors = ['#000000', '#FF1493', '#00FF00', '#0099FF', '#FFFF00', '#FF0000', '#FFFFFF'];
  const fonts = ['Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New', 'Comic Sans MS'];

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      padding: '10px',
      borderBottom: '2px solid #FF1493',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '5px',
      alignItems: 'center',
    }}>
      {/* Text formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        style={buttonStyle(editor.isActive('bold'))}
        title="Bold"
      >
        <strong>B</strong>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        style={buttonStyle(editor.isActive('italic'))}
        title="Italic"
      >
        <em>I</em>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        style={buttonStyle(editor.isActive('underline'))}
        title="Underline"
      >
        <u>U</u>
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 5px' }} />

      {/* Text color */}
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        <span style={{ color: '#CCCCCC', fontSize: '10px', marginRight: '3px' }}>Color:</span>
        {colors.map(color => (
          <button
            key={color}
            onClick={() => editor.chain().focus().setColor(color).run()}
            style={{
              backgroundColor: color,
              border: '1px solid #666',
              width: '20px',
              height: '20px',
              cursor: 'pointer',
              padding: 0,
            }}
            title={color}
          />
        ))}
      </div>

      <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 5px' }} />

      {/* Font family */}
      <select
        onChange={(e) => {
          if (e.target.value) {
            editor.chain().focus().setFontFamily(e.target.value).run();
          } else {
            editor.chain().focus().unsetFontFamily().run();
          }
        }}
        style={{
          backgroundColor: '#333',
          color: '#FFFFFF',
          border: '1px solid #666',
          padding: '4px',
          fontSize: '11px',
          fontFamily: 'Verdana, Arial, sans-serif',
          cursor: 'pointer',
        }}
        title="Font"
      >
        <option value="">Default</option>
        {fonts.map(font => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>

      <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 5px' }} />

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        style={buttonStyle(editor.isActive('bulletList'))}
        title="Bullet List"
      >
        • List
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        style={buttonStyle(editor.isActive('orderedList'))}
        title="Numbered List"
      >
        1. List
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 5px' }} />

      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        style={buttonStyle(editor.isActive({ textAlign: 'left' }))}
        title="Align Left"
      >
        ⬅
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        style={buttonStyle(editor.isActive({ textAlign: 'center' }))}
        title="Align Center"
      >
        ↔
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        style={buttonStyle(editor.isActive({ textAlign: 'right' }))}
        title="Align Right"
      >
        ➡
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 5px' }} />

      {/* Link */}
      <button
        onClick={() => {
          const url = window.prompt('Enter URL:');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        style={buttonStyle(editor.isActive('link'))}
        title="Add Link"
      >
        🔗 Link
      </button>

      {editor.isActive('link') && (
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          style={buttonStyle(false)}
          title="Remove Link"
        >
          Unlink
        </button>
      )}

      <div style={{ width: '1px', height: '20px', backgroundColor: '#444', margin: '0 5px' }} />

      {/* Media */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        style={buttonStyle(false)}
        title="Add Image"
        disabled={uploading}
      >
        {uploading ? '⏳ Uploading...' : '🖼️ Image'}
      </button>

      <button
        onClick={handleYouTubeEmbed}
        style={buttonStyle(false)}
        title="Add YouTube Video"
      >
        ▶️ Video
      </button>
    </div>
  );
}
