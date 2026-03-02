import { useState } from 'react'
import { SkyblogLayout } from './components/Layout/SkyblogLayout'
import { ProfileDisplay } from './components/Profile/ProfileDisplay'
import { ProfileEdit } from './components/Profile/ProfileEdit'
import { ArticleList } from './components/Articles/ArticleList'
import { ArticleEditor } from './components/Editor/ArticleEditor'
import { useProfile } from './hooks/useProfile'
import { useArticles } from './hooks/useArticles'
import './App.css'

function App() {
  const { profile, updateName, updateBio, updateAge, updateLocation, handlePhotoUpload } = useProfile();
  const { articles, createArticle, updateArticle, deleteArticle, getArticle } = useArticles();

  const [isEditMode, setIsEditMode] = useState(false);
  const [view, setView] = useState<'blog' | 'articles' | 'editor'>('blog');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

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

  const handleSaveArticle = (title: string, content: string, tags: string[], isDraft: boolean) => {
    if (editingArticleId) {
      updateArticle(editingArticleId, { title, content, tags, isDraft });
    } else {
      createArticle(title, content, tags, isDraft);
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
          <div className="blog-content">
            <article style={{ marginBottom: '30px' }}>
              <h1 style={{ color: '#FF1493', borderBottom: '2px solid #FF1493', paddingBottom: '5px' }}>
                Bienvenue sur mon Skyblog! 🌟
              </h1>
              <p className="text-muted" style={{ marginBottom: '15px' }}>
                Publié le 02/03/2026 à 12:00 |
                <a href="#" style={{ marginLeft: '5px' }}>18 kiffs</a> |
                <a href="#" style={{ marginLeft: '5px' }}>Commenter</a>
              </p>
              <p>
                Salut à tous! 👋 Je suis super content de vous retrouver sur mon nouveau skyblog.
                Ici vous allez pouvoir suivre mes aventures, découvrir mes coups de cœur musicaux
                et voir plein de photos sympas!
              </p>
              <p>
                N'hésitez pas à laisser des commentaires et à mettre des kiffs si vous aimez!
                C'est toujours cool de savoir que vous passez par là. 😊
              </p>
              <p>
                <strong>Tags:</strong> <a href="#">bienvenue</a>, <a href="#">skyblog</a>, <a href="#">2006</a>, <a href="#">nostalgie</a>
              </p>
            </article>

            <article style={{ marginBottom: '30px' }}>
              <h1 style={{ color: '#FF1493', borderBottom: '2px solid #FF1493', paddingBottom: '5px' }}>
                Ma playlist du moment 🎵
              </h1>
              <p className="text-muted" style={{ marginBottom: '15px' }}>
                Publié le 01/03/2026 à 18:30 |
                <a href="#" style={{ marginLeft: '5px' }}>42 kiffs</a> |
                <a href="#" style={{ marginLeft: '5px' }}>5 commentaires</a>
              </p>
              <p>
                En ce moment j'écoute beaucoup de musique des années 2000. Ça me rappelle
                tellement de souvenirs! Voici mes tops du moment:
              </p>
              <ul>
                <li>Tokio Hotel - Monsoon</li>
                <li>Diam's - La boulette</li>
                <li>Fatal Bazooka - Fous ta cagoule</li>
                <li>Rihanna - Umbrella</li>
                <li>Avril Lavigne - Girlfriend</li>
              </ul>
              <p>
                Et vous, c'est quoi vos sons préférés en ce moment? Dites-moi tout en commentaire! 💬
              </p>
              <p>
                <strong>Tags:</strong> <a href="#">musique</a>, <a href="#">playlist</a>, <a href="#">2000s</a>
              </p>
            </article>
          </div>
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
            article={editingArticleId ? getArticle(editingArticleId) : undefined}
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
