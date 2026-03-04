# Déploiement sur Render.com - Guide Complet

## 💰 Est-ce que c'est gratuit ?

**OUI, avec limitations:**

### Services Gratuits sur Render:
- ✅ **Web Services (Backend)** - GRATUIT
  - ⚠️ Se met en veille après 15 min d'inactivité
  - ⚠️ Redémarre en ~30 secondes à la première requête
  - ✅ 750h/mois (suffisant pour 1 service)

- ✅ **Static Sites (Frontend)** - 100% GRATUIT
  - ✅ Pas de mise en veille
  - ✅ CDN global inclus
  - ✅ Builds automatiques

- ✅ **PostgreSQL** - GRATUIT
  - ⚠️ 1 GB de stockage max
  - ⚠️ Expire après 90 jours (backup nécessaire)
  - ⚠️ Performance limitée

### Coûts Potentiels:
- **Keep alive backend:** ~$7/mois (évite la mise en veille)
- **PostgreSQL permanent:** $7/mois (pas d'expiration)

**Pour commencer: 100% GRATUIT** ✅

---

## 📋 Prérequis

1. Compte GitHub (pour connecter votre code)
2. Compte Render.com (gratuit)
3. Code pushé sur GitHub

---

## 🚀 Déploiement Étape par Étape

### Phase 1: Préparer le Code

#### 1.1 Créer les fichiers de configuration

**1. Backend: Créer `server/render.yaml`**
```yaml
services:
  - type: web
    name: skyblog-backend
    env: node
    buildCommand: npm install && npx prisma generate
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: skyblog-db
          property: connectionString
      - key: NODE_ENV
        value: production

databases:
  - name: skyblog-db
    databaseName: skyblog
    user: skyblog
```

**2. Backend: Créer `server/package.json` script**
```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

**3. Backend: Créer `.dockerignore`**
```
node_modules
npm-debug.log
.env
uploads/*
!uploads/.gitkeep
```

**4. Frontend: Créer `render.yaml` (racine)**
```yaml
services:
  - type: web
    name: skyblog-frontend
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

**5. Frontend: Mettre à jour `src/services/api.ts`**
```typescript
const API_URL = import.meta.env.VITE_API_URL ||
                import.meta.env.PROD
                  ? 'https://skyblog-backend.onrender.com/api'
                  : 'http://localhost:3000/api';
```

#### 1.2 Mettre à jour le backend pour la production

**Modifier `server/src/index.ts`** pour accepter les origines Render:
```typescript
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://skyblog.onrender.com', // Votre frontend Render
    /\.onrender\.com$/ // Tous les sous-domaines Render
  ],
  credentials: true
}));
```

**Gérer le stockage des images:**
⚠️ **IMPORTANT:** Les uploads locaux ne persisteront pas sur Render (filesystem éphémère)

Options:
1. **Cloudinary** (recommandé, gratuit jusqu'à 25GB)
2. **AWS S3**
3. **Supabase Storage**

Pour l'instant, gardez le système actuel mais sachez que les images disparaîtront au redémarrage.

#### 1.3 Pousser sur GitHub

```bash
# Créer un repo GitHub
gh repo create skyblog --public --source=. --remote=origin

# Ou si déjà créé:
git add .
git commit -m "feat: prepare for Render deployment"
git push origin main
```

---

### Phase 2: Déployer sur Render

#### 2.1 Créer la Base de Données PostgreSQL

1. Aller sur [dashboard.render.com](https://dashboard.render.com)
2. Cliquer **"New +"** → **"PostgreSQL"**
3. Configuration:
   - **Name:** `skyblog-db`
   - **Database:** `skyblog`
   - **User:** `skyblog`
   - **Region:** Choisir le plus proche (Frankfurt pour Europe)
   - **Plan:** **Free** ✅
4. Cliquer **"Create Database"**
5. ⚠️ **IMPORTANT:** Copier l'**Internal Database URL** (commence par `postgresql://`)

#### 2.2 Déployer le Backend

1. **"New +"** → **"Web Service"**
2. **Connect Repository:** Sélectionner votre repo GitHub
3. Configuration:
   - **Name:** `skyblog-backend`
   - **Region:** Même que la DB
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:**
     ```bash
     npm install && npx prisma generate && npx prisma migrate deploy
     ```
   - **Start Command:** `npm start`
   - **Plan:** **Free** ✅

4. **Environment Variables** (section "Advanced"):
   ```
   DATABASE_URL = [Coller l'Internal Database URL]
   NODE_ENV = production
   PORT = 10000
   ```

5. Cliquer **"Create Web Service"**

6. ⚠️ **Attendre le build** (~5-10 min)

7. Une fois déployé, copier l'URL (ex: `https://skyblog-backend.onrender.com`)

#### 2.3 Déployer le Frontend

1. **"New +"** → **"Static Site"**
2. **Connect Repository:** Même repo
3. Configuration:
   - **Name:** `skyblog-frontend`
   - **Branch:** `main`
   - **Root Directory:** `.` (racine)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. **Environment Variables:**
   ```
   VITE_API_URL = https://skyblog-backend.onrender.com/api
   ```

5. Cliquer **"Create Static Site"**

6. ⚠️ **Attendre le build** (~3-5 min)

---

### Phase 3: Configuration Post-Déploiement

#### 3.1 Initialiser la Base de Données

1. Aller dans votre **Backend Service** sur Render
2. Onglet **"Shell"**
3. Exécuter:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed  # Si vous avez un seed
   ```

#### 3.2 Tester l'Application

1. Ouvrir l'URL du frontend (ex: `https://skyblog.onrender.com`)
2. ⚠️ La première requête peut prendre 30s (backend se réveille)
3. Tester:
   - [ ] Affichage du profil
   - [ ] Création d'article
   - [ ] Kiffs
   - [ ] Commentaires

#### 3.3 Configurer le Domaine Personnalisé (Optionnel)

1. Backend Service → **"Settings"** → **"Custom Domains"**
2. Ajouter `api.votredomaine.com`
3. Configurer les DNS selon les instructions

---

## 🐛 Problèmes Courants et Solutions

### Backend ne démarre pas
```bash
# Vérifier les logs dans l'onglet "Logs"
# Problème fréquent: DATABASE_URL incorrect
```

**Solution:**
1. Aller dans la DB → **"Info"** → Copier **"Internal Database URL"**
2. Backend Service → **"Environment"** → Mettre à jour `DATABASE_URL`
3. **"Manual Deploy"** → **"Deploy latest commit"**

### CORS Errors

**Solution:** Mettre à jour `server/src/index.ts`:
```typescript
app.use(cors({
  origin: [
    'https://votre-frontend.onrender.com',
    /\.onrender\.com$/
  ]
}));
```

### Images ne persistent pas

⚠️ **Normal sur Render Free tier** - filesystem éphémère

**Solutions:**
1. **Cloudinary (Recommandé):**
   ```bash
   npm install cloudinary
   ```

2. **Supabase Storage:**
   - Gratuit jusqu'à 1GB
   - Intégration simple

3. **AWS S3:**
   - Payant mais très fiable

### Backend se met en veille

⚠️ **Normal sur Free tier** - se réveille en 30s

**Solutions:**
- **Option 1:** Accepter les 30s de latence (gratuit)
- **Option 2:** Ping service externe (cron-job.org)
- **Option 3:** Upgrade à $7/mois

---

## 📊 Monitoring et Maintenance

### Vérifier la Santé des Services

**Dashboard Render:**
- Services → **"Metrics"**
- Voir CPU, RAM, requêtes

**Logs en temps réel:**
```bash
# Cliquer sur "Logs" dans chaque service
```

### Backup de la Base de Données

⚠️ **IMPORTANT:** La DB gratuite expire après 90 jours

**Backup manuel:**
1. Service PostgreSQL → **"Connect"**
2. Copier la **External Database URL**
3. Local:
   ```bash
   pg_dump [EXTERNAL_URL] > backup.sql
   ```

**Restore avant expiration:**
1. Créer nouvelle DB gratuite
2. Exécuter:
   ```bash
   psql [NEW_DB_URL] < backup.sql
   ```

---

## 🔄 Déploiement Continu (CI/CD)

**Render redéploie automatiquement:**
- ✅ À chaque push sur `main`
- ✅ Builds isolés (branch previews disponibles en payant)

**Désactiver auto-deploy:**
1. Service → **"Settings"**
2. **"Auto-Deploy"** → OFF

---

## 💡 Optimisations Recommandées

### 1. Build Caching
Render cache `node_modules` automatiquement

### 2. Environment Variables Communes
Créer un **".env.production"**:
```env
VITE_API_URL=https://skyblog-backend.onrender.com/api
```

### 3. Health Check Endpoint
Ajouter dans `server/src/index.ts`:
```typescript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});
```

### 4. Prisma Optimizations
```typescript
// server/src/index.ts
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
});
```

---

## 💸 Coûts Mensuels Estimés

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Frontend** | ✅ $0 | $0 (toujours gratuit) |
| **Backend** | ✅ $0 (avec veille) | $7/mois (always-on) |
| **PostgreSQL** | ✅ $0 (90 jours) | $7/mois (permanent) |
| **TOTAL** | **$0/mois** | **$14/mois** |

---

## 🎯 Checklist de Déploiement

- [ ] Code pushé sur GitHub
- [ ] `render.yaml` créés
- [ ] Base de données PostgreSQL créée
- [ ] `DATABASE_URL` configurée
- [ ] Backend déployé et démarre
- [ ] Migrations Prisma exécutées
- [ ] Frontend déployé
- [ ] `VITE_API_URL` configurée
- [ ] CORS configuré avec domaines Render
- [ ] Test: Profil charge ✅
- [ ] Test: Articles fonctionnent ✅
- [ ] Test: Kiffs fonctionnent ✅
- [ ] Test: Commentaires fonctionnent ✅
- [ ] Backup DB planifié (tous les 80 jours)

---

## 📚 Ressources

- [Render Docs](https://render.com/docs)
- [Render Free Tier](https://render.com/docs/free)
- [Deploy Node.js](https://render.com/docs/deploy-node-express-app)
- [Deploy React](https://render.com/docs/deploy-create-react-app)
- [PostgreSQL on Render](https://render.com/docs/databases)

---

## 🆘 Support

**Problèmes avec Render:**
- [Render Community](https://community.render.com/)
- [Render Status](https://status.render.com/)

**Problèmes avec le code:**
- Voir [HANDOFF.md](HANDOFF.md)
- Voir [TROUBLESHOOTING](#-problèmes-courants-et-solutions)
