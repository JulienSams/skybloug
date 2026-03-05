# 🚂 Déploiement Complet sur Railway.app (Frontend + Backend)

## 💡 Pourquoi tout mettre sur Railway?

### Avantages:
- ✅ **Un seul compte** - Gestion simplifiée
- ✅ **Pas de CORS inter-domaines** - Tout sur la même infra
- ✅ **Meilleures performances** - Latence réduite
- ✅ **$5 de crédit gratuit/mois** - Couvre les 2 services
- ✅ **Backend always-on** - Pas de sleep
- ✅ **Filesystem persistant** - Images ne disparaissent pas
- ✅ **PostgreSQL inclus** - Auto-configuré

### Coûts Estimés:
- Frontend (Static): ~$0-1/mois
- Backend (Web Service): ~$3/mois
- PostgreSQL: ~$2/mois
- **Total: ~$5-6/mois** (couvert par crédit gratuit + $1)

---

## 🚀 Déploiement Pas à Pas (20 minutes)

### Étape 1: Créer un Compte Railway

1. Aller sur **https://railway.app**
2. Cliquer **"Login"**
3. Choisir **"Login with GitHub"**
4. Autoriser Railway à accéder à vos repositories
5. Vous obtenez **$5 de crédit gratuit/mois** automatiquement! 🎉

---

### Étape 2: Créer le Projet

1. Dashboard Railway → **"New Project"**
2. Sélectionner **"Deploy from GitHub repo"**
3. Choisir votre repo: **JulienSams/skybloug**
4. Railway va créer un service automatiquement

---

### Étape 3: Ajouter PostgreSQL

1. Dans votre projet → Cliquer **"+ New"**
2. Sélectionner **"Database"** → **"Add PostgreSQL"**
3. Railway crée la base de données
4. **DATABASE_URL** est automatiquement injectée dans les services! ✨

---

### Étape 4: Configurer le Backend

Railway a créé un service depuis votre repo. On va le configurer pour le backend:

#### 4.1 Renommer le Service
1. Cliquer sur le service
2. **Settings** → **Service Name**
3. Renommer en: `backend`
4. Save

#### 4.2 Root Directory
1. **Settings** → **Root Directory**
2. Entrer: `server`
3. Save

#### 4.3 Build Command
1. **Settings** → **Custom Build Command**
2. Activer le toggle
3. Entrer:
   ```bash
   npm install && npm run build && npx prisma generate
   ```

#### 4.4 Start Command
1. **Settings** → **Custom Start Command**
2. Activer le toggle
3. Entrer:
   ```bash
   npx prisma migrate deploy && npm start
   ```

#### 4.5 Variables d'Environnement
1. **Settings** → **Variables**
2. Vérifier que **DATABASE_URL** existe (ajoutée automatiquement)
3. Ajouter manuellement:
   - Key: `NODE_ENV`
   - Value: `production`

#### 4.6 Generate Domain
1. **Settings** → **Networking**
2. Cliquer **"Generate Domain"**
3. Vous obtenez: `backend-production-xxxx.up.railway.app`
4. **Copier cette URL backend** (vous en aurez besoin!)

---

### Étape 5: Créer le Service Frontend

1. Dans votre projet → Cliquer **"+ New"**
2. Sélectionner **"GitHub Repo"**
3. Choisir le même repo: **JulienSams/skybloug**
4. Railway crée un 2ème service

#### 5.1 Renommer le Service
1. Cliquer sur le nouveau service
2. **Settings** → **Service Name**
3. Renommer en: `frontend`
4. Save

#### 5.2 Root Directory
1. **Settings** → **Root Directory**
2. Entrer: `.` (racine du projet - laisser vide ou point)
3. Save

#### 5.3 Build Command
1. **Settings** → **Custom Build Command**
2. Activer le toggle
3. Entrer:
   ```bash
   npm install && npm run build
   ```

#### 5.4 Variables d'Environnement
1. **Settings** → **Variables**
2. Ajouter:
   - Key: `VITE_API_URL`
   - Value: `https://[VOTRE-URL-BACKEND].up.railway.app/api`

   Par exemple:
   ```
   https://backend-production-a1b2c3.up.railway.app/api
   ```

#### 5.5 Configurer Serveur Statique

Railway détecte Vite automatiquement, mais on doit configurer le serveur:

1. **Settings** → **Start Command**
2. Laisser vide (Railway détecte automatiquement)

**Railway va automatiquement:**
- Détecter Vite
- Build le projet
- Servir les fichiers statiques depuis `dist/`
- Configurer le routing SPA

#### 5.6 Generate Domain
1. **Settings** → **Networking**
2. Cliquer **"Generate Domain"**
3. Vous obtenez: `frontend-production-xxxx.up.railway.app`
4. **C'est votre URL publique!** 🎉

---

### Étape 6: Déployer les Deux Services

1. Railway détecte automatiquement les changements
2. Les 2 builds démarrent en parallèle
3. Suivez les logs en temps réel

**Ordre de déploiement recommandé:**
1. ✅ PostgreSQL (déjà prête)
2. ✅ Backend (3-5 minutes)
3. ✅ Frontend (2-3 minutes)

**Logs Backend à surveiller:**
```bash
✓ npm install
✓ npm run build (TypeScript compilation)
✓ npx prisma generate
✓ npx prisma migrate deploy
✓ npm start
✓ 🚀 Server running on http://0.0.0.0:PORT
```

**Logs Frontend à surveiller:**
```bash
✓ npm install
✓ vite build
✓ dist/ created
✓ Serving static files
```

---

### Étape 7: Mettre à Jour CORS Backend

Le backend doit accepter les requêtes depuis le frontend Railway:

1. Le code accepte déjà `/\.railway\.app$/` (déjà fait!)
2. Vérifier dans `server/src/index.ts`:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  /\.onrender\.com$/,
  /\.railway\.app$/  // ✅ Déjà présent!
];
```

Si vous avez un domaine custom frontend, ajoutez-le:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  /\.onrender\.com$/,
  /\.railway\.app$/,
  'https://votredomaine.com'  // Votre domaine custom
];
```

---

### Étape 8: Tester

#### 8.1 Tester le Backend
Ouvrir dans le navigateur:
```
https://[VOTRE-URL-BACKEND].up.railway.app/api/health
```

Réponse attendue:
```json
{"status":"ok","timestamp":"2026-03-05T..."}
```

#### 8.2 Tester le Frontend
1. Ouvrir: `https://[VOTRE-URL-FRONTEND].up.railway.app`
2. F12 → Console → Network
3. Vérifier que les requêtes vont vers le backend Railway
4. Tester:
   - ✅ Création d'article
   - ✅ Upload d'images
   - ✅ Commentaires
   - ✅ Kiffs
   - ✅ Profil

---

## 🎯 Checklist Complète

### Configuration Railway
- [ ] Compte Railway créé (GitHub login)
- [ ] Projet créé depuis GitHub
- [ ] PostgreSQL ajoutée et connectée

### Backend
- [ ] Service renommé "backend"
- [ ] Root Directory = `server`
- [ ] Build Command configurée
- [ ] Start Command configurée
- [ ] NODE_ENV = production
- [ ] DATABASE_URL existe (auto)
- [ ] Domain généré
- [ ] /api/health répond

### Frontend
- [ ] Service renommé "frontend"
- [ ] Root Directory = `.`
- [ ] Build Command configurée
- [ ] VITE_API_URL configurée (pointe vers backend Railway)
- [ ] Domain généré
- [ ] Site accessible

### Tests
- [ ] Backend répond sur /api/health
- [ ] Frontend charge correctement
- [ ] API calls fonctionnent (check Network tab)
- [ ] Upload d'images fonctionne
- [ ] Images persistent après refresh

---

## 🔧 Configuration Avancée (Optionnel)

### 1. Volumes Persistants (Images)

Pour garantir que les images uploadées persistent même après redéploiement:

1. Service **backend** → **Settings** → **Volumes**
2. **Add Volume**
3. Mount Path: `/app/uploads`
4. Save

**Avantage:** Les images survivent aux redéploiements! 🎉

### 2. Custom Domains

#### Pour le Frontend:
1. Service **frontend** → **Settings** → **Networking**
2. **Custom Domains** → **Add Domain**
3. Entrer: `www.votredomaine.com`
4. Configurer DNS:
   ```
   Type: CNAME
   Name: www
   Value: frontend-production-xxxx.up.railway.app
   ```

#### Pour le Backend (API):
1. Service **backend** → **Settings** → **Networking**
2. **Custom Domains** → **Add Domain**
3. Entrer: `api.votredomaine.com`
4. Configurer DNS:
   ```
   Type: CNAME
   Name: api
   Value: backend-production-xxxx.up.railway.app
   ```
5. Mettre à jour `VITE_API_URL` dans frontend:
   ```
   https://api.votredomaine.com/api
   ```

### 3. Environment-Based Config

Si vous voulez différencier staging/production:

**Backend:**
```env
NODE_ENV=production
DATABASE_URL=[auto]
LOG_LEVEL=info
MAX_FILE_SIZE=5242880
```

**Frontend:**
```env
VITE_API_URL=https://backend-production-xxxx.up.railway.app/api
VITE_ENV=production
```

---

## 📊 Monitoring & Logs

### Dashboard Railway

**Pour chaque service:**
- **Metrics:** CPU, RAM, Network, Response time
- **Logs:** Temps réel avec recherche
- **Deployments:** Historique + rollback
- **Usage:** Suivi du crédit $5/mois

### Alertes Automatiques

Railway envoie des emails pour:
- ✅ Déploiement réussi
- ❌ Déploiement échoué
- 🔴 Service down
- 💰 Crédit proche de $5

### Logs en Temps Réel

```bash
# Depuis le dashboard:
Backend → Logs → Filtrer par niveau (error, warn, info)
Frontend → Logs → Voir build + runtime
PostgreSQL → Logs → Queries lentes
```

---

## 🐛 Troubleshooting

### Backend Build Échoue

**Erreur:** `Cannot find module 'express'`
- **Cause:** Types TypeScript manquants
- **Solution:** Déjà fixé - types dans `dependencies`

**Erreur:** `Prisma generate failed`
- **Solution:** Vérifier build command inclut `npx prisma generate`

**Erreur:** `ENOENT: uploads directory`
- **Solution:** Déjà fixé - création auto au démarrage

### Backend Crash au Runtime

**Erreur:** `Connection refused to database`
- **Solution:**
  1. Vérifier PostgreSQL est ajoutée
  2. Vérifier DATABASE_URL dans Variables
  3. Redéployer backend après ajout PostgreSQL

**Erreur:** `Port already in use`
- **Solution:** Railway gère automatiquement le port, ne pas hardcoder

### Frontend Build Échoue

**Erreur:** TypeScript compilation errors
- **Solution:** Déjà fixé dans commits précédents

**Erreur:** `VITE_API_URL is undefined`
- **Solution:** Vérifier variable d'env dans Settings → Variables

### Frontend Runtime Errors

**Erreur:** `CORS policy blocked`
- **Solution:** Vérifier backend accepte `/\.railway\.app$/`

**Erreur:** `Failed to fetch`
- **Solution:** Vérifier VITE_API_URL pointe vers bon backend

**Erreur:** Images 404
- **Solution:**
  1. Vérifier backend uploads directory existe
  2. Vérifier `SERVER_URL` dans `src/services/api.ts`
  3. Optionnel: Ajouter volume persistant

---

## 💰 Gestion des Coûts

### Crédit Gratuit $5/mois

**Breakdown estimé:**
```
Backend (Web Service):    ~$3.00/mois
PostgreSQL:               ~$2.00/mois
Frontend (Static):        ~$0.50/mois
─────────────────────────────────────
Total:                    ~$5.50/mois
```

**Coût réel pour vous:** ~$0.50/mois 💚

### Optimisations pour Réduire Coûts

1. **Sleep Mode (Frontend uniquement):**
   - Frontend peut dormir sans impact
   - Backend doit rester actif

2. **Monitoring Usage:**
   - Dashboard → Project → **Usage**
   - Suivre consommation en temps réel

3. **Limit Resources:**
   - Settings → Resource Limits
   - Mettre limites mémoire/CPU si dépassement

---

## 🆚 Comparaison: Render vs Railway (Full Stack)

| Feature | Render (Split) | Railway (Tout) |
|---------|----------------|----------------|
| **Setup** | 2 comptes | 1 compte |
| **CORS** | Inter-domaine | Même infra |
| **Prix Total** | $0 (sleep) | $5-6/mois |
| **Backend Sleep** | Oui (15min) | Non |
| **Filesystem** | Éphémère | Persistant |
| **PostgreSQL** | Expire 90j | Permanent |
| **Performance** | Moyenne | Excellente |
| **Logs** | Séparés | Centralisés |
| **Rollback** | Manuel | 1 clic |
| **DX** | Moyen | Excellent |

**Verdict:** Railway est largement meilleur pour full-stack! 🚀

---

## 🎓 Architecture Finale

```
┌────────────────────────────────────────────────┐
│  Frontend (Railway Static Site)                │
│  https://frontend-production-xxx.railway.app   │
│  💰 ~$0.50/mois                                 │
│                                                 │
│  - React + TypeScript + Vite                   │
│  - Fichiers statiques depuis dist/             │
│  - SPA routing automatique                     │
└─────────────────┬──────────────────────────────┘
                  │
                  │ VITE_API_URL
                  │ (même infrastructure Railway)
                  ↓
┌────────────────────────────────────────────────┐
│  Backend (Railway Web Service)                 │
│  https://backend-production-xxx.railway.app    │
│  💰 ~$3/mois                                    │
│                                                 │
│  - Node.js + Express + TypeScript              │
│  - Always-on (pas de sleep)                    │
│  - Filesystem persistant (avec volume)         │
└─────────────────┬──────────────────────────────┘
                  │
                  │ DATABASE_URL
                  │ (connexion interne)
                  ↓
┌────────────────────────────────────────────────┐
│  PostgreSQL (Railway Database)                 │
│  Internal connection                            │
│  💰 ~$2/mois                                    │
│                                                 │
│  - PostgreSQL 15                                │
│  - Backups automatiques                         │
│  - Connexion sécurisée                          │
└────────────────────────────────────────────────┘

💰 Coût Total: ~$5.50/mois ($5 gratuit + $0.50)
```

---

## 📚 Ressources

- **Railway Docs:** https://docs.railway.app
- **Railway Pricing:** https://railway.app/pricing
- **Railway Discord:** https://discord.gg/railway
- **Railway Status:** https://status.railway.app

---

## ✅ Résumé des Avantages

**Ce que vous gagnez avec Railway (Frontend + Backend):**

1. ✅ **Simplicité** - Un seul compte, une seule plateforme
2. ✅ **Performance** - Pas de sleep, latence minimale
3. ✅ **Fiabilité** - Filesystem persistant, PostgreSQL stable
4. ✅ **Developer Experience** - Logs centralisés, rollback facile
5. ✅ **Cost-Effective** - ~$0.50/mois après crédit gratuit
6. ✅ **Scalabilité** - Upgrade facile si trafic augmente
7. ✅ **Monitoring** - Métriques temps réel pour tous les services

**Pour un coût total de ~$0.50/mois!** 🎉

---

## 🎯 Prochaines Étapes

Après le déploiement réussi:

### Priorité Haute
- [ ] Ajouter volume persistant pour uploads
- [ ] Configurer custom domain
- [ ] Mettre en place monitoring (UptimeRobot gratuit)
- [ ] Backup database réguliers

### Priorité Moyenne
- [ ] Ajouter tests automatisés
- [ ] Optimiser images (compression)
- [ ] Ajouter pagination articles
- [ ] Configurer CI/CD avancé

### Priorité Basse
- [ ] Multi-utilisateurs (authentification)
- [ ] Système de best-of articles
- [ ] Compteur de visiteurs
- [ ] Lecteur de musique

---

*Guide créé le 2026-03-05*
*Temps de déploiement estimé: **20 minutes***
*Coût: **~$0.50/mois** après crédit gratuit*
