import { useState, useEffect } from 'react'
import { SkyblogLayout } from './components/Layout/SkyblogLayout'
import { ProfileDisplay } from './components/Profile/ProfileDisplay'
import { ProfileEdit } from './components/Profile/ProfileEdit'
import { ArticleList } from './components/Articles/ArticleList'
import { ArticleEditor } from './components/Editor/ArticleEditor'
import { BlogHome } from './components/Blog/BlogHome'
import { ArticleDetail } from './components/Blog/ArticleDetail'
import { useProfile } from './hooks/useProfile'
import { useArticles } from './hooks/useArticles'
import { useComments } from './hooks/useComments'
import type { Comment } from './types/Comment'
import './App.css'

function App() {
  const { profile, updateName, updateBio, updateAge, updateLocation, handlePhotoUpload } = useProfile();
  const { articles, createArticle, updateArticle, deleteArticle, getArticle } = useArticles();
  const { getCommentsForArticle, addComment } = useComments();

  const [isEditMode, setIsEditMode] = useState(false);
  const [view, setView] = useState<'blog' | 'articles' | 'editor'>('blog');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [allComments, setAllComments] = useState<Record<string, Comment[]>>({});

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = (updatedProfile: Partial<typeof profile>) => {
    if (updatedProfile.name !== undefined) updateName(updatedProfile.name);
    if (updatedProfile.bio !== undefined) updateBio(updatedProfile.bio);
    if (updatedProfile.age !== undefined) updateAge(updatedProfile.age);
    if (updatedProfile.location !== undefined) updateLocation(updatedProfile.location);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  // Article management handlers
  const handleNewArticle = () => {
    setEditingArticleId(null);
    setView('editor');
  };

  const handleEditArticle = (id: string) => {
    setEditingArticleId(id);
    setView('editor');
  };

  const handleDeleteArticle = (id: string) => {
    deleteArticle(id);
  };

  const handleSaveArticle = (article: { title: string; content: string; tags: string[]; status: 'draft' | 'published' }) => {
    if (editingArticleId) {
      updateArticle(editingArticleId, { title: article.title, content: article.content, tags: article.tags, status: article.status });
    } else {
      createArticle(article);
    }
    setView('articles');
    setEditingArticleId(null);
  };

  const handleCancelEditor = () => {
    setView('articles');
    setEditingArticleId(null);
  };

  const handleBackToBlog = () => {
    setView('blog');
  };

  // Load all comments for all articles on mount
  useEffect(() => {
    const loadAllComments = async () => {
      const commentsMap: Record<string, Comment[]> = {};
      for (const article of articles) {
        const articleComments = await getCommentsForArticle(article.id);
        commentsMap[article.id] = articleComments;
      }
      setAllComments(commentsMap);
    };
    if (articles.length > 0) {
      loadAllComments();
    }
  }, [articles, getCommentsForArticle]);

  // Load comments when article is selected
  useEffect(() => {
    if (selectedArticleId) {
      getCommentsForArticle(selectedArticleId).then(setComments);
    } else {
      setComments([]);
    }
  }, [selectedArticleId, getCommentsForArticle]);

  // Blog view handlers
  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
  };

  const handleBackToList = () => {
    setSelectedArticleId(null);
  };

  const handleAddComment = async (authorName: string, content: string) => {
    if (!selectedArticleId) return;
    const newComment = await addComment(selectedArticleId, authorName, content);
    if (newComment) {
      // Reload comments after adding a new one
      const updatedComments = await getCommentsForArticle(selectedArticleId);
      setComments(updatedComments);
    }
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSelectedArticleId(null); // Clear article detail if showing
  };

  const handleClearTagFilter = () => {
    setSelectedTag(null);
  };

  // Filter articles by tag if selectedTag is set
  const filteredArticles = selectedTag
    ? articles.filter((article) => article.tags.includes(selectedTag))
    : articles;

  return (
    <SkyblogLayout
      leftSidebar={
        isEditMode ? (
          <ProfileEdit
            profile={profile}
            onSave={handleSave}
            onCancel={handleCancel}
            onPhotoUpload={handlePhotoUpload}
          />
        ) : (
          <ProfileDisplay
            profile={profile}
            onEdit={handleEdit}
          />
        )
      }
      content={
        view === 'blog' ? (
          selectedArticleId ? (
            <ArticleDetail
              article={getArticle(selectedArticleId)!}
              comments={comments}
              onBack={handleBackToList}
              onTagClick={handleTagClick}
              onAddComment={handleAddComment}
            />
          ) : (
            <BlogHome
              articles={filteredArticles}
              profile={profile}
              commentsMap={allComments}
              onArticleClick={handleSelectArticle}
              onTagClick={handleTagClick}
              selectedTag={selectedTag}
              onClearTagFilter={handleClearTagFilter}
            />
          )
        ) : view === 'articles' ? (
          <ArticleList
            articles={articles}
            onNewArticle={handleNewArticle}
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
            onBack={handleBackToBlog}
          />
        ) : (
          <ArticleEditor
            initialArticle={editingArticleId ? getArticle(editingArticleId) : undefined}
            onSave={handleSaveArticle}
            onCancel={handleCancelEditor}
          />
        )
      }
      rightSidebar={
        <div className="info-section">
          {view !== 'blog' && (
            <>
              <button
                onClick={handleBackToBlog}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  marginBottom: '15px',
                  backgroundColor: '#0099FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                ← Retour au Blog
              </button>
              <div className="section-divider" style={{ borderColor: '#444', marginBottom: '15px' }}></div>
            </>
          )}

          {view === 'blog' && (
            <>
              <button
                onClick={() => setView('articles')}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  marginBottom: '15px',
                  backgroundColor: '#FF1493',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                ✏️ Gérer mes Articles
              </button>
              <div className="section-divider" style={{ borderColor: '#444', marginBottom: '15px' }}></div>
            </>
          )}

          <h3 style={{ color: '#FF1493', textAlign: 'center', marginBottom: '10px' }}>
            📊 Infos
          </h3>
          <div className="section-divider" style={{ borderColor: '#444' }}></div>
          <div style={{ color: '#CCCCCC', fontSize: '11px' }}>
            <p><strong>Création:</strong> 02/03/2026</p>
            <p><strong>Mise à jour:</strong> 02/03/2026</p>
            <p><strong>Articles:</strong> 2</p>
            <p><strong>Commentaires:</strong> 5</p>
            <p><strong>Kiffs:</strong> 60</p>
          </div>

          <div className="section-divider" style={{ borderColor: '#444', margin: '20px 0' }}></div>

          <h3 style={{ color: '#00FF00', textAlign: 'center', marginBottom: '10px' }}>
            🏷️ Tags
          </h3>
          <div style={{ color: '#00FF00', fontSize: '11px', textAlign: 'center' }}>
            <a href="#" style={{ color: '#00FF00', margin: '0 5px' }}>bienvenue</a>
            <a href="#" style={{ color: '#00FF00', margin: '0 5px' }}>musique</a>
            <a href="#" style={{ color: '#7FFF00', margin: '0 5px', fontSize: '13px' }}>skyblog</a>
            <a href="#" style={{ color: '#00FF00', margin: '0 5px' }}>2000s</a>
            <a href="#" style={{ color: '#00FFFF', margin: '0 5px', fontSize: '14px' }}>nostalgie</a>
            <a href="#" style={{ color: '#00FF00', margin: '0 5px' }}>playlist</a>
            <a href="#" style={{ color: '#7FFF00', margin: '0 5px', fontSize: '12px' }}>2006</a>
          </div>

          <div className="section-divider" style={{ borderColor: '#444', margin: '20px 0' }}></div>

          <h3 style={{ color: '#0099FF', textAlign: 'center', marginBottom: '10px' }}>
            📅 Archives
          </h3>
          <div style={{ color: '#CCCCCC', fontSize: '11px' }}>
            <p><a href="#">Mars 2026 (2)</a></p>
            <p><a href="#">Février 2026 (0)</a></p>
            <p><a href="#">Janvier 2026 (0)</a></p>
          </div>
        </div>
      }
    />
  )
}

export default App
