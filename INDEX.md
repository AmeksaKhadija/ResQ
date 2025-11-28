# 📚 INDEX DE LA DOCUMENTATION ResQ

Bienvenue dans ResQ ! Voici un guide complet de toute la documentation disponible.

---

## 🚀 DÉMARRAGE RAPIDE

### Vous êtes pressé ?

👉 **Lisez d'abord** : [`QUICKSTART.md`](./QUICKSTART.md)

- Démarrage en 30 secondes
- Comptes de test
- Fonctionnalités à tester
- Codes couleur essentiels

### Fichiers de lancement

- **`start.bat`** - Script Windows pour lancer automatiquement (double-clic)
- **`start.ps1`** - Script PowerShell alternatif

---

## 📖 DOCUMENTATION PRINCIPALE

### 1. README.md - Vue d'ensemble

**Contenu :**

- Présentation du projet
- Technologies utilisées
- Installation complète
- Structure du projet
- Commandes principales

**Quand le lire :** Pour comprendre l'architecture globale

---

### 2. GUIDE_DEMARRAGE.md - Guide Détaillé

**Contenu :**

- Instructions de démarrage étape par étape
- Description de chaque page
- Codes couleur détaillés
- Résolution de problèmes
- Structure des données JSON
- Sécurité et limitations

**Quand le lire :** Pour une compréhension approfondie

---

### 3. INSTALLATION_COMPLETE.md - Checklist

**Contenu :**

- ✅ Liste de tout ce qui a été installé
- Structure de fichiers complète
- Toutes les fonctionnalités implémentées
- Technologies avec versions
- Suggestions d'amélioration

**Quand le lire :** Pour vérifier que tout est en place

---

### 4. FONCTIONNALITES_PAR_ROLE.md - Permissions

**Contenu :**

- Matrice complète des accès par rôle
- Régulateur vs Chef de Parc
- Cas d'usage détaillés
- Tableau des permissions
- Conseils d'utilisation

**Quand le lire :** Pour comprendre qui peut faire quoi

---

### 5. QUICKSTART.md - Démarrage Express

**Contenu :**

- Démarrage en 30 secondes
- URLs importantes
- Actions à tester en premier
- Données de test disponibles
- Astuces Pro

**Quand le lire :** Juste avant de lancer l'app !

---

## 🎯 PAR BESOIN

### Vous voulez DÉMARRER l'application ?

1. [`QUICKSTART.md`](./QUICKSTART.md) - Ultra-rapide
2. Lancez `start.bat`
3. Ouvrez http://localhost:5173

### Vous voulez COMPRENDRE le projet ?

1. [`README.md`](./README.md) - Architecture
2. [`GUIDE_DEMARRAGE.md`](./GUIDE_DEMARRAGE.md) - Détails
3. Explorez le code dans `src/`

### Vous avez un PROBLÈME ?

1. [`GUIDE_DEMARRAGE.md`](./GUIDE_DEMARRAGE.md) - Section "Résolution de Problèmes"
2. [`QUICKSTART.md`](./QUICKSTART.md) - Section "Problème ?"
3. Vérifiez la console navigateur (F12)

### Vous voulez savoir QUI PEUT QUOI ?

1. [`FONCTIONNALITES_PAR_ROLE.md`](./FONCTIONNALITES_PAR_ROLE.md)
2. Testez avec les deux comptes :
   - regulateur@resq.com
   - chef@resq.com

### Vous voulez VÉRIFIER l'installation ?

1. [`INSTALLATION_COMPLETE.md`](./INSTALLATION_COMPLETE.md)
2. Vérifiez les ✅ dans la checklist

---

## 📂 STRUCTURE DU CODE

### Fichiers de configuration

- **`package.json`** - Dépendances et scripts
- **`tsconfig.json`** - Configuration TypeScript
- **`tailwind.config.js`** - Configuration Tailwind CSS
- **`vite.config.ts`** - Configuration Vite
- **`.env`** - Variables d'environnement

### Base de données

- **`db.json`** - Base de données JSON Server (5 ambulances, 4 incidents, 2 users)

### Code source (`src/`)

#### Components (`src/components/`)

- **`Layout.tsx`** - Layout principal avec sidebar
- **`ProtectedRoute.tsx`** - Protection des routes authentifiées

#### Context (`src/context/`)

- **`AuthContext.tsx`** - Gestion de l'authentification et des rôles

#### Pages (`src/pages/`)

- **`Login.tsx`** - Page de connexion
- **`Dashboard.tsx`** - Tableau de bord avec KPIs
- **`DispatchMap.tsx`** - Carte interactive Leaflet
- **`Fleet.tsx`** - Gestion de la flotte
- **`IncidentsHistory.tsx`** - Historique des incidents

#### Types (`src/types/`)

- **`index.ts`** - Tous les types TypeScript

#### Root (`src/`)

- **`App.tsx`** - Configuration des routes
- **`main.tsx`** - Point d'entrée
- **`index.css`** - Styles globaux Tailwind

---

## 🎓 POUR APPRENDRE

### Comprendre l'architecture

```
1. Lisez README.md (vue d'ensemble)
2. Explorez src/App.tsx (routes)
3. Regardez src/components/Layout.tsx (structure)
4. Étudiez src/pages/Dashboard.tsx (exemple de page)
```

### Comprendre l'authentification

```
1. Lisez src/context/AuthContext.tsx
2. Regardez src/components/ProtectedRoute.tsx
3. Étudiez src/pages/Login.tsx
```

### Comprendre la carte

```
1. Lisez src/pages/DispatchMap.tsx
2. Testez l'attribution d'ambulances
3. Inspectez les marqueurs personnalisés
```

---

## 🛠️ COMMANDES ESSENTIELLES

```powershell
# Installer les dépendances
npm install

# Lancer JSON Server (Terminal 1)
npm run server

# Lancer React (Terminal 2)
npm run dev

# Build pour production
npm run build

# Aperçu du build
npm run preview
```

---

## 🎨 RESSOURCES VISUELLES

### Code Couleur Rapide

**Ambulances :**

- 🟢 Disponible (AVAILABLE)
- 🔴 Occupée (BUSY)
- 🔵 Pause (BREAK)
- 🟡 Maintenance (MAINTENANCE)

**Gravité Incidents :**

- 🟢 Faible (LOW)
- 🟡 Moyenne (MEDIUM)
- 🟠 Élevée (HIGH)
- 🔴 Critique (CRITICAL)

**Statuts Incidents :**

- 🟡 En attente (PENDING)
- 🔵 En cours (IN_PROGRESS)
- 🟢 Terminé (COMPLETED)
- ⚫ Annulé (CANCELLED)

---

## 🔗 LIENS RAPIDES

| Ressource      | Lien                             |
| -------------- | -------------------------------- |
| App locale     | http://localhost:5173            |
| API locale     | http://localhost:5000            |
| Ambulances API | http://localhost:5000/ambulances |
| Incidents API  | http://localhost:5000/incidents  |
| Users API      | http://localhost:5000/users      |

---

## 📞 SUPPORT

### En cas de problème :

1. **Consultez** [`GUIDE_DEMARRAGE.md`](./GUIDE_DEMARRAGE.md) - Section "Résolution de Problèmes"
2. **Vérifiez** que les deux serveurs sont lancés
3. **Inspectez** la console navigateur (F12)
4. **Testez** http://localhost:5000/ambulances

---

## ✅ CHECKLIST DE DÉMARRAGE

- [ ] J'ai lu [`QUICKSTART.md`](./QUICKSTART.md)
- [ ] J'ai lancé JSON Server (`npm run server`)
- [ ] J'ai lancé React (`npm run dev`)
- [ ] J'ai ouvert http://localhost:5173
- [ ] Je me suis connecté comme Régulateur
- [ ] J'ai exploré le Dashboard
- [ ] J'ai testé la Carte
- [ ] J'ai assigné une ambulance à un incident
- [ ] J'ai consulté la Gestion de Flotte
- [ ] J'ai vu l'Historique

---

## 🎉 PRÊT À COMMENCER ?

**Meilleur parcours pour débutants :**

1. 📖 Lisez [`QUICKSTART.md`](./QUICKSTART.md) (5 min)
2. 🚀 Lancez `start.bat` ou les deux terminaux
3. 🌐 Ouvrez http://localhost:5173
4. 👤 Connectez-vous : regulateur@resq.com / password123
5. 🎯 Testez toutes les fonctionnalités !
6. 📚 Revenez à cette doc pour approfondir

**Bon développement ! 🚑**

---

_Dernière mise à jour : 26 Novembre 2025_
