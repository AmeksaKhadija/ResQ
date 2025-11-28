# ResQ - Système de Dispatching d'Ambulances

Application de gestion et dispatching d'ambulances développée avec React, TypeScript et Vite.

## 🚀 Fonctionnalités

### Authentification

- Système de login avec deux rôles :
  - **Régulateur** : Accès complet (Dashboard, Carte, Flotte, Historique)
  - **Chef de Parc** : Accès limité (Dashboard, Flotte)

### Pages principales

#### 1. Dashboard

- Vue d'ensemble des KPIs (ambulances disponibles, incidents actifs, temps de réponse)
- Activité récente
- Statistiques en temps réel

#### 2. Carte de Dispatch

- Visualisation cartographique interactive (Leaflet)
- Marqueurs pour ambulances (avec code couleur selon statut)
- Marqueurs pour incidents (pulsants selon gravité)
- Attribution d'ambulances aux incidents
- Filtres par statut

#### 3. Gestion de Flotte

- Liste complète des ambulances
- Modification des statuts en temps réel
- Informations équipage et équipement

#### 4. Historique des Incidents

- Liste complète des interventions
- Filtres par statut et recherche
- Statistiques globales

## 🛠️ Technologies

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **React-Leaflet** - Cartographie
- **Lucide React** - Icônes
- **JSON Server** - API Mock

## 📦 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

### Étapes

1. **Cloner le repository**

```bash
cd ResQ2
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Installer JSON Server globalement** (si pas déjà fait)

```bash
npm install -g json-server
```

## 🚀 Lancement

### 1. Démarrer le serveur de données (JSON Server)

Dans un terminal :

```bash
json-server --watch db.json --port 5000
```

### 2. Démarrer l'application React

Dans un autre terminal :

```bash
npm run dev
```

L'application sera accessible sur : `http://localhost:5173`

## 👤 Comptes de test

### Régulateur

- **Email** : regulateur@resq.com
- **Mot de passe** : password123
- **Accès** : Toutes les fonctionnalités

### Chef de Parc

- **Email** : chef@resq.com
- **Mot de passe** : password123
- **Accès** : Dashboard + Gestion de Flotte

## 📁 Structure du projet

```
ResQ2/
├── src/
│   ├── components/
│   │   ├── Layout.tsx           # Layout principal avec sidebar
│   │   └── ProtectedRoute.tsx   # Protection des routes
│   ├── context/
│   │   └── AuthContext.tsx      # Gestion de l'authentification
│   ├── pages/
│   │   ├── Login.tsx            # Page de connexion
│   │   ├── Dashboard.tsx        # Tableau de bord
│   │   ├── DispatchMap.tsx      # Carte interactive
│   │   ├── Fleet.tsx            # Gestion de la flotte
│   │   └── IncidentsHistory.tsx # Historique des incidents
│   ├── types/
│   │   └── index.ts             # Types TypeScript
│   ├── App.tsx                  # Configuration des routes
│   ├── main.tsx                 # Point d'entrée
│   └── index.css                # Styles globaux
├── db.json                      # Base de données JSON Server
├── .env                         # Variables d'environnement
└── package.json
```

## 🎨 Design

- Interface moderne et professionnelle
- Design responsive (mobile-friendly)
- Sidebar rétractable
- Code couleur pour les statuts :
  - 🟢 Vert : Disponible / Faible
  - 🔴 Rouge : Occupé / Critique
  - 🟡 Jaune : En attente / Moyen
  - 🟠 Orange : Élevé / Maintenance
  - 🔵 Bleu : Pause / En cours

## 🔄 Mises à jour en temps réel

- Dashboard : rafraîchissement automatique toutes les 30 secondes
- Carte : rafraîchissement automatique toutes les 10 secondes

## 📝 Améliorations possibles

- [ ] Ajouter un formulaire de création d'incident
- [ ] Implémenter le calcul de distance et ETA réels
- [ ] Ajouter des graphiques de performance (Recharts)
- [ ] Implémenter la validation avec Zod
- [ ] Ajouter Redux Toolkit pour la gestion d'état
- [ ] Ajouter TanStack Query pour le cache et les requêtes
- [ ] Notifications en temps réel (WebSocket)

## 🐛 Debugging

Si vous rencontrez des problèmes :

1. Vérifiez que JSON Server tourne sur le port 5000
2. Vérifiez le fichier `.env` (VITE_API_URL=http://localhost:5000)
3. Consultez la console du navigateur pour les erreurs
4. Assurez-vous que toutes les dépendances sont installées

## 📄 Licence

Projet académique - 2ème année

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
# ResQ
