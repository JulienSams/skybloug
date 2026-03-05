# 🚂 Déploiement sur Railway.app - Guide Détaillé

## 💰 Pourquoi Railway plutôt que Render?

### Avantages de Railway:
- ✅ **Pas de sleep** - Backend toujours actif
- ✅ **Filesystem persistant** - Les images uploadées ne disparaissent pas
- ✅ **Meilleures performances**
- ✅ **PostgreSQL intégré** avec auto-configuration
- ✅ **$5 de crédit gratuit/mois**
- ✅ **Déploiement plus rapide**

### Coûts:
- Backend Node.js: ~$3/mois
- PostgreSQL: ~$2/mois
- **Total: $5/mois (couvert par le crédit gratuit!)** 🎉

---

## 🚀 Guide de Déploiement Pas à Pas

### Étape 1: Créer un Compte Railway

1. Aller sur **https://railway.app**
2. Cliquer **"Login"**
3. Choisir **"Login with GitHub"**
4. Autoriser Railway à accéder à vos repositories

---

### Étape 2: Créer un Nouveau Projet

1. Dashboard Railway → **"New Project"**
2. Sélectionner **"Deploy from GitHub repo"**
3. Choisir votre repo: **JulienSams/skybloug**
4. Railway va détecter Node.js automatiquement

---

### Étape 3: Ajouter PostgreSQL

1. Dans votre projet → Cliquer **"+ New"**
2. Sélectionner **"Database"** → **"Add PostgreSQL"**
3. Railway crée la base de données
4. **DATABASE_URL** est automatiquement configurée! ✨

---

### Étape 4: Configurer le Service Backend

#### 4.1 Root Directory
1. Cliquer sur le service **skybloug** (votre repo)
2. **Settings** → **Root Directory**
3. Entrer: `server`
4. Save

#### 4.2 Build Command
1. **Settings** → **Custom Build Command**
2. Activer le toggle
3. Entrer:
   ```bash
   npm install && npm run build && npx prisma generate
   ```

#### 4.3 Start Command
1. **Settings** → **Custom Start Command**
2. Activer le toggle
3. Entrer:
   ```bash
   npx prisma migrate deploy && npm start
   ```

#### 4.4 Variables d'Environnement
1. **Settings** → **Variables**
2. Vérifier que **DATABASE_URL** existe (ajoutée automatiquement par PostgreSQL)
3. Ajouter manuellement:
   - Key: `NODE_ENV`
   - Value: `production`

#### 4.5 Generate Domain
1. **Settings** → **Networking**
2. Cliquer **"Generate Domain"**
3. Vous obtenez: `xxxx.up.railway.app`
4. **Copier cette URL** - vous en aurez besoin!

---

### Étape 5: Déployer

1. Railway détecte automatiquement le code
2. Le build démarre
3. Suivez les logs en temps réel
4. Attendez **"Deployed"** (3-5 minutes)

**Logs à surveiller:**
```
✓ npm install
✓ npm run build (TypeScript compilation)
✓ npx prisma generate
✓ npx prisma migrate deploy
✓ npm start
✓ 🚀 Server running on http://0.0.0.0:PORT
```

---

### Étape 6: Mettre à Jour le Frontend

#### Sur Render (votre frontend actuel):

1. Dashboard Render → **Frontend Service**
2. **Settings** → **Environment**
3. Modifier `VITE_API_URL`:
   ```
   https://[VOTRE-URL-RAILWAY].up.railway.app/api
   ```
   Par exemple:
   ```
   https://skyblog-production.up.railway.app/api
   ```
4. **Save Changes**
5. Le frontend redéploiera automatiquement

---

### Étape 7: Tester

#### 7.1 Tester le Backend
Ouvrir dans le navigateur:
```
https://[VOTRE-URL-RAILWAY].up.railway.app/api/health
```

Vous devriez voir:
```json
{"status":"ok","timestamp":"2026-03-05T..."}
```

#### 7.2 Tester le Frontend
1. Ouvrir votre site frontend
2. F12 → Console → Network
3. Vérifier que les requêtes vont vers Railway
4. Tester upload d'image
5. Vérifier que l'image persiste après refresh

---

## 🎯 Checklist Complète

### Configuration Railway
- [ ] Compte Railway créé
- [ ] Projet créé depuis GitHub
- [ ] PostgreSQL ajoutée
- [ ] Root Directory = `server`
- [ ] Build Command configurée
- [ ] Start Command configurée
- [ ] NODE_ENV = production
- [ ] Domain généré

### Test Backend
- [ ] Build réussi
- [ ] Migrations exécutées
- [ ] Serveur démarre
- [ ] /api/health répond
- [ ] Deploy marqué comme "Success"

### Configuration Frontend
- [ ] VITE_API_URL mise à jour
- [ ] Frontend redéployé
- [ ] Requêtes vont vers Railway
- [ ] Upload d'images fonctionne

---

## 🔧 Configuration Avancée (Optionnel)

### Volumes Persistants

Pour garantir que les images uploadées persistent:

1. Service Backend → **Settings** → **Volumes**
2. **Add Volume**
3. Mount Path: `/app/uploads`
4. Save

**Avantage:** Les images survivent aux redéploiements!

### Variables d'Environnement Additionnelles

```env
# Déjà configurées automatiquement:
DATABASE_URL=postgresql://...
PORT=auto

# À ajouter manuellement:
NODE_ENV=production

# Optionnelles:
LOG_LEVEL=info
MAX_FILE_SIZE=5242880
```

### Custom Domain

1. **Settings** → **Networking** → **Custom Domains**
2. Ajouter votre domaine
3. Configurer DNS:
   ```
   Type: CNAME
   Name: api (pour api.votredomaine.com)
   Value: [votre-service].up.railway.app
   ```

---

## 📊 Monitoring

### Dashboard Railway

- **Metrics:** CPU, RAM, Network usage
- **Logs:** Temps réel avec filtres
- **Deployments:** Historique complet
- **Usage:** Suivi du crédit $5/mois

### Alertes

Railway envoie des emails automatiquement pour:
- Déploiement réussi/échoué
- Service down
- Crédit proche de $5

---

## 🐛 Troubleshooting

### Build Échoue

**Erreur:** `Cannot find module 'express'`
**Solution:** Vérifier que les types sont dans `dependencies` (déjà fait)

**Erreur:** `Prisma generate failed`
**Solution:** Build Command doit inclure `npx prisma generate`

### Service Crash au Démarrage

**Erreur:** `Connection refused to database`
**Solution:**
1. Vérifier que PostgreSQL est ajoutée
2. Vérifier que DATABASE_URL existe dans Variables
3. Vérifier que le service PostgreSQL tourne

### Images ne s'uploadent pas

**Solution:** Ajouter un Volume (voir Configuration Avancée)

### Frontend ne se connecte pas

**Erreur:** CORS errors
**Solution:** Le code backend accepte déjà `.*.railway.app` via:
```javascript
/\.onrender\.com$/  // Change to include railway
```

Modifier dans `server/src/index.ts`:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  /\.onrender\.com$/,
  /\.railway\.app$/  // Ajouter ceci
];
```

---

## 💡 Optimisations

### 1. Health Checks

Railway vérifie automatiquement `/` par défaut.
Notre endpoint `/api/health` est parfait!

### 2. Build Cache

Railway cache `node_modules` automatiquement.
Pas de configuration nécessaire.

### 3. Auto-Deploy

Par défaut, Railway redéploie à chaque push sur `main`.
Pour désactiver:
- Settings → Deployments → Untoggle "Auto Deploy"

### 4. Rollback

En cas de problème:
1. Deployments → Cliquer sur un déploiement précédent
2. "Redeploy"

---

## 🆚 Comparaison: Render vs Railway

| Feature | Render | Railway |
|---------|--------|---------|
| **Prix** | $0 (avec sleep) | $5/mois (always-on) |
| **Sleep** | Après 15min | Jamais |
| **Filesystem** | Éphémère | Persistant (volumes) |
| **PostgreSQL** | Expire 90j | Permanent |
| **Performance** | Moyenne | Excellente |
| **Setup** | Manuel | Auto-détection |
| **Logs** | Basique | Avancés |

**Verdict:** Railway est meilleur pour le backend!

---

## 🎓 Après le Déploiement

### Architecture Finale

```
┌─────────────────────────────────────────┐
│  Frontend (Render - Static Site)        │
│  https://skybloug-margaux.onrender.com  │
│  💰 $0/mois                              │
└──────────────┬──────────────────────────┘
               │
               │ VITE_API_URL
               ↓
┌─────────────────────────────────────────┐
│  Backend (Railway - Web Service)        │
│  https://xxx.up.railway.app              │
│  💰 ~$3/mois (dans les $5 gratuits)     │
└──────────────┬──────────────────────────┘
               │
               │ DATABASE_URL
               ↓
┌─────────────────────────────────────────┐
│  PostgreSQL (Railway - Database)        │
│  Internal connection                     │
│  💰 ~$2/mois (dans les $5 gratuits)     │
└─────────────────────────────────────────┘
```

### Coût Total: ~$0-5/mois ✅

---

## 📚 Ressources

- [Railway Docs](https://docs.railway.app)
- [Railway Pricing](https://railway.app/pricing)
- [Railway Discord](https://discord.gg/railway)
- [Railway Templates](https://railway.app/templates)

---

## ✅ Avantages Finaux

Avec Railway, vous obtenez:
1. ✅ **Backend toujours actif** (pas de cold start)
2. ✅ **Images persistent** (filesystem)
3. ✅ **Meilleures perfs** (moins de latence)
4. ✅ **PostgreSQL stable** (pas d'expiration)
5. ✅ **Meilleure DX** (logs, metrics, rollback)

**Pour un coût de $0-5/mois!** 🎉

---

*Guide créé le 2026-03-05*
