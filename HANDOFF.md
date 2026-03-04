# Skyblog Nostalgia - Handoff Document

## État Actuel du Projet

### ✅ Fonctionnalités Complètes

1. **Layout Skyblog Authentique**
   - Three-column layout (190px - 550px - 190px)
   - Aesthetic 2006 préservé
   - Flat design (no border-radius)
   - Couleurs authentiques (pink #FF1493, green #00FF00)

2. **Backend API Complet**
   - Node.js + Express + TypeScript + Prisma + PostgreSQL
   - Endpoints: articles, profile, comments, images
   - CORS configuré (all origins)
   - Upload d'images fonctionnel

3. **Gestion d'Articles**
   - Création/édition/suppression
   - Rich text editor (TipTap)
   - Draft/Published status
   - Tags
   - Upload d'images
   - Embed YouTube

4. **Système de Kiffs (Likes)** ❤️
   - POST /api/articles/:id/kiff
   - Compteur persistant en DB
   - UI avec icônes cœur (🤍/❤️)
   - Protection contre double-kiff (session)

5. **Easter Egg - Konami Code** 🎮
   - Code: ↑ ↑ ↓ ↓ ← → ← → B A
   - Active le mode admin (boutons édition)
   - Animation flash rose
   - Reste actif jusqu'au refresh
   - Debug panel visible en dev mode

6. **Responsive Mobile** 📱
   - Breakpoints: mobile (<768px), tablet (769-1024px), desktop (>1024px)
   - Touch-friendly (44px min tap targets)
   - No horizontal scroll
   - Tags wrap correctly

### 🚧 EN COURS: Background Image

**État actuel (DERNIÈRE SESSION):**
- ✅ Type `backgroundImage: string | null` ajouté à `Profile` interface
- ✅ `useEffect` dans App.tsx applique le fond au body
- ✅ FormData dans ProfileEdit inclut backgroundImage
- ✅ handleSubmit dans ProfileEdit sauvegarde backgroundImage
- ✅ **Champ input ajouté dans ProfileEdit.tsx** (ligne 206-224)
- ✅ **updateBackgroundImage créé dans useProfile.ts** (ligne 103-106)
- ✅ **Import dans App.tsx** - updateBackgroundImage disponible (ligne 16)

**À TERMINER (3 étapes restantes):**

1. **~~Ajouter le champ input dans ProfileEdit.tsx~~** ✅ FAIT
```tsx
<div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', marginBottom: '3px' }}>
    <strong>Image de fond (URL):</strong>
  </label>
  <input
    type="text"
    value={formData.backgroundImage}
    onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
    placeholder="https://example.com/image.jpg"
    style={{
      width: '100%',
      backgroundColor: '#1a1a1a',
      border: '1px solid #444',
      color: '#FFFFFF',
      padding: '5px',
      fontSize: '11px',
      fontFamily: 'Verdana, Arial, sans-serif'
    }}
  />
</div>
```

2. **~~Mettre à jour le hook useProfile.ts~~** ✅ FAIT

3. **~~Mettre à jour App.tsx import~~** ✅ FAIT

4. **Utiliser updateBackgroundImage dans handleSave (App.tsx ligne ~39)**:
```typescript
const { profile, updateName, updateBio, updateAge, updateLocation, updateBackgroundImage, handlePhotoUpload } = useProfile();

const handleSave = (updatedProfile: Partial<typeof profile>) => {
  if (updatedProfile.name !== undefined) updateName(updatedProfile.name);
  if (updatedProfile.bio !== undefined) updateBio(updatedProfile.bio);
  if (updatedProfile.age !== undefined) updateAge(updatedProfile.age);
  if (updatedProfile.location !== undefined) updateLocation(updatedProfile.location);
  if (updatedProfile.backgroundImage !== undefined) updateBackgroundImage(updatedProfile.backgroundImage);
  setIsEditMode(false);
};
```

5. **Backend: Ajouter backgroundImage au Prisma schema** (server/prisma/schema.prisma):
```prisma
model Profile {
  id              String   @id @default(uuid())
  name            String
  bio             String
  age             Int?
  location        String
  photoUrl        String?
  backgroundImage String?  // <-- AJOUTER CETTE LIGNE
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

6. **Exécuter la migration Prisma**:
```bash
cd server
npx prisma migrate dev --name add_background_image
```

7. **Mettre à jour le contrôleur backend** (server/src/controllers/profileController.ts):
```typescript
// Dans updateProfile, ajouter backgroundImage à la destructuration:
const { name, bio, age, location, photoUrl, backgroundImage } = req.body;

// Dans l'update:
...(backgroundImage !== undefined && { backgroundImage }),
```

## Structure du Projet

```
skyblog/
├── server/                    # Backend API
│   ├── src/
│   │   ├── controllers/      # articleController, profileController, etc.
│   │   ├── routes/           # articles, profile, comments, images
│   │   ├── middleware/       # upload.ts (multer)
│   │   └── index.ts          # Express app
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   └── uploads/              # Uploaded images
├── src/                       # Frontend React
│   ├── components/
│   │   ├── Layout/           # SkyblogLayout
│   │   ├── Profile/          # ProfileDisplay, ProfileEdit
│   │   ├── Blog/             # BlogHome, ArticleDetail, ArticlePreview
│   │   ├── Articles/         # ArticleList
│   │   ├── Editor/           # ArticleEditor, EditorToolbar
│   │   └── Comments/         # CommentForm, CommentList
│   ├── hooks/                # useProfile, useArticles, useComments
│   ├── services/             # api.ts
│   ├── types/                # Profile, Article, Comment
│   ├── index.css             # Global styles
│   ├── responsive.css        # Mobile responsive
│   └── App.tsx               # Main app
└── MOBILE.md                 # Mobile testing guide

```

## Serveurs en Cours

- **Backend:** http://localhost:3000 (npm run dev dans /server)
- **Frontend:** http://localhost:5173 (npm run dev à la racine)

## Commandes Utiles

```bash
# Frontend
npm run dev

# Backend
cd server
npm run dev

# Prisma
cd server
npx prisma migrate dev
npx prisma studio  # Database GUI
```

## Problèmes Connus

1. **TypeScript Errors** (non bloquants):
   - App.tsx ligne 151: setState dans effect (warning ESLint)
   - App.tsx ligne 248: Type ArticleListProps manque onBack

2. **Tags Overflow** - RÉSOLU avec word-wrap et flex-wrap

## Easter Eggs & Features Cachées

1. **Konami Code:** ↑↑↓↓←→←→BA pour activer admin mode
2. **Debug Panel:** Visible en dev mode (bottom-right)
3. **Flash Animation:** Pink flash quand Konami code activé

## Base de Données

PostgreSQL avec Prisma ORM:
- Articles (title, content, isDraft, kiffs, tags)
- Profile (name, bio, age, location, photoUrl, backgroundImage)
- Comments (authorName, content, articleId)
- Tags (name)
- Images uploaded to /server/uploads/

## Notes de Style

- Font: Verdana, Arial, Helvetica
- Colors: Pink #FF1493, Green #00FF00, Blue #0099FF
- NO border-radius (flat 2006 aesthetic)
- Touch targets: 44px minimum
- Responsive breakpoints: 768px, 1024px

## Prochaines Étapes Suggérées

1. ✅ **PRIORITÉ:** Finir background image (5 étapes ci-dessus)
2. Ajouter plus de customization (couleurs, fonts)
3. Système de "best of" articles
4. Archives par date
5. Compteur de visiteurs
6. Lecteur de musique intégré (vraiment 2006!)

## API Endpoints Documentation

### Articles
- `GET /api/articles` - Liste tous les articles
- `GET /api/articles/:id` - Détail d'un article
- `POST /api/articles` - Créer un article
- `PUT /api/articles/:id` - Mettre à jour un article
- `DELETE /api/articles/:id` - Supprimer un article
- `POST /api/articles/:id/kiff` - Ajouter un kiff (like)

### Profile
- `GET /api/profile` - Récupérer le profil
- `PUT /api/profile` - Mettre à jour le profil

### Comments
- `GET /api/comments/article/:articleId` - Commentaires d'un article
- `POST /api/comments` - Ajouter un commentaire
- `DELETE /api/comments/:id` - Supprimer un commentaire

### Images
- `POST /api/images/upload` - Upload une image (multipart/form-data)
  - Returns: `{ imageUrl: string }`

## Configuration & Setup

### Variables d'Environnement

**Backend (server/.env):**
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/skyblog"
PORT=3000
```

### Installation Initiale

```bash
# Frontend
npm install

# Backend
cd server
npm install
npx prisma generate
npx prisma migrate dev
```

### Démarrage

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Architecture & Patterns

### State Management
- **React useState** pour l'état local
- **Custom hooks** pour la logique métier:
  - `useProfile`: Gestion du profil (GET/PUT)
  - `useArticles`: CRUD articles
  - `useComments`: CRUD commentaires
  - `useKonami`: Easter egg Konami code

### Data Flow
1. Frontend hooks appellent `api.ts`
2. `api.ts` fait des fetch vers Express backend
3. Backend utilise Prisma pour PostgreSQL
4. Réponses remontent la chaîne

### Component Structure
```
App.tsx (container)
├── SkyblogLayout (wrapper)
│   ├── Header
│   ├── Left Sidebar (ProfileDisplay/ProfileEdit)
│   ├── Main Content (BlogHome/ArticleDetail/ArticleList/ArticleEditor)
│   └── Right Sidebar (Tags, Stats)
```

## Troubleshooting

### Backend ne démarre pas
```bash
# Vérifier PostgreSQL
psql -U postgres -c "SELECT version();"

# Régénérer Prisma client
cd server
npx prisma generate

# Reset DB si nécessaire
npx prisma migrate reset
```

### Images ne s'uploadent pas
```bash
# Vérifier que le dossier existe
mkdir -p server/uploads

# Vérifier les permissions
chmod 755 server/uploads
```

### CORS Errors
Le backend accepte toutes les origines. Si erreur CORS:
1. Vérifier que backend tourne sur :3000
2. Vérifier `server/src/index.ts` ligne ~12: `app.use(cors())`

### TypeScript Errors
Erreurs connues (non bloquantes):
- App.tsx:151 - setState dans useEffect (warning ESLint)
- App.tsx:248 - Type mismatch (fonctionnel malgré l'erreur)

## Code Patterns & Conventions

### Style CSS
- Inline styles préférés pour l'authenticité Skyblog
- Couleurs en hexa majuscule: `#FF1493` pas `#ff1493`
- Flat design: **JAMAIS** de `border-radius`
- Police: Verdana prioritaire

### API Calls Pattern
```typescript
// Dans les hooks
const fetchData = async () => {
  try {
    const data = await api.getResource();
    setState(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Article Creation
⚠️ **IMPORTANT:** Articles doivent être créés avec format:
```typescript
{
  title: string,
  content: string,
  isDraft: boolean,
  tagNames: string[]  // Array of tag names, NOT Tag objects
}
```

### Kiff System (Likes)
- Stocké dans `Article.kiffs` (nombre)
- Session-based (pas de user auth)
- Frontend toggle avec optimistic UI

## Features Authentiques Skyblog

### Esthétique Préservée
- ✅ Three-column layout fixe
- ✅ Flat design (no shadows, no gradients)
- ✅ Verdana font
- ✅ Pink/Green color scheme
- ✅ Kiffs (hearts)
- ✅ Comments section
- ⏳ Best-of articles (TODO)
- ⏳ Visitor counter (TODO)
- ⏳ Music player (TODO)

### Différences Modernes
- React au lieu de PHP
- TypeScript pour type-safety
- REST API au lieu de page reloads
- PostgreSQL au lieu de MySQL
- Rich text editor moderne

## Testing Guide

### Manuel Testing Checklist
- [ ] Créer un article
- [ ] Kiff un article
- [ ] Commenter un article
- [ ] Upload une image dans l'éditeur
- [ ] Éditer son profil
- [ ] Tester Konami code (↑↑↓↓←→←→BA)
- [ ] Responsive mobile (< 768px)
- [ ] Tags filtering

### Mobile Testing
Voir [MOBILE.md](MOBILE.md) pour:
- Device testing matrix
- Responsive breakpoints
- Touch target guidelines

## Performance Notes

### Optimizations Appliquées
- Images servies depuis /uploads (pas de CDN)
- Comments chargés par article (pas tous à la fois)
- Articles triés côté backend

### Optimizations Possibles
- [ ] Image compression (sharp ou jimp)
- [ ] Pagination articles
- [ ] Cache Redis
- [ ] CDN pour images
- [ ] Lazy loading images

## Security Notes

### Implémenté
- CORS configuré
- File upload validé (type, size)
- Prisma ORM (protection SQL injection)

### À Améliorer (Production)
- [ ] Authentification utilisateur
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] HTTPS
- [ ] Environment variables sécurisées
- [ ] File upload validation renforcée

## Deployment Checklist (TODO)

- [ ] Build frontend: `npm run build`
- [ ] Variables d'env production
- [ ] PostgreSQL cloud (Supabase/Railway)
- [ ] File storage cloud (S3/Cloudinary)
- [ ] Domain & HTTPS
- [ ] Monitoring

## Known Issues & Quirks

### Visual Glitches
- Tags peuvent wrap sur plusieurs lignes (voulu)
- Border-radius=0 sur TOUS les éléments (authenticité)

### Backend
- Single profile (pas de multi-users)
- Images stockées localement (pas de cloud)
- Session-based kiffs (pas persistant par user)

### Frontend
- Konami code reset au refresh (voulu)
- Admin tools = edit buttons (pas de vrai admin panel)

## Recent Changes (Last 5 Commits)

1. **71a14e1** - Dynamic kiffs counter
2. **f98dad7** - Comment count in article cards
3. **75eab9f** - Images display in preview
4. **2ac1021** - Fix article creation format
5. **7bea9fe** - Fix article save and tags

## Liens Utiles

- [Prisma Docs](https://www.prisma.io/docs)
- [TipTap Editor](https://tiptap.dev)
- [Express.js](https://expressjs.com)
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app)

## Contact & Meta

- **Projet:** Skyblog Nostalgia
- **Stack:** React + TypeScript + Node.js + Express + Prisma + PostgreSQL
- **Date:** 2026-03-04
- **Status:** MVP complet, background image en cours
- **Next Session:** Terminer background image feature
