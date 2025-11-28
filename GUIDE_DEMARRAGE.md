# 🚀 Guide de Démarrage ResQ

## Méthode 1 : Démarrage Manuel (Recommandé)

### Étape 1 : Démarrer le serveur JSON

Ouvrez un terminal PowerShell et exécutez :

```powershell
cd "c:\Users\Youcode\Desktop\2ème annèe\ResQ2"
npm run server
```

Vous devriez voir :

```
JSON Server started on PORT :5000
```

### Étape 2 : Démarrer l'application React

Ouvrez un NOUVEAU terminal PowerShell et exécutez :

```powershell
cd "c:\Users\Youcode\Desktop\2ème annèe\ResQ2"
npm run dev
```

L'application sera disponible sur : **http://localhost:5173**

---

## Méthode 2 : Script PowerShell automatique

Exécutez simplement :

```powershell
cd "c:\Users\Youcode\Desktop\2ème annèe\ResQ2"
.\start.ps1
```

---

## 👤 Comptes de Test

### Compte Régulateur (Accès complet)

- **Email** : `regulateur@resq.com`
- **Mot de passe** : `password123`
- **Accès** : Dashboard, Carte, Flotte, Historique

### Compte Chef de Parc (Accès limité)

- **Email** : `chef@resq.com`
- **Mot de passe** : `password123`
- **Accès** : Dashboard, Flotte uniquement

---

## 📱 Fonctionnalités par Page

### 1. Page de Login (`/login`)

- Formulaire de connexion
- Boutons de connexion rapide
- Validation des identifiants

### 2. Dashboard (`/`)

- 4 KPIs : Ambulances disponibles, Incidents actifs, Temps moyen, Complétés
- Liste des incidents récents
- Rafraîchissement automatique (30s)

### 3. Carte de Dispatch (`/map`)

- Carte interactive Leaflet
- Marqueurs ambulances (couleur par statut)
- Marqueurs incidents (pulsants selon gravité)
- Attribution d'ambulances aux incidents
- Filtres par statut
- Rafraîchissement automatique (10s)

### 4. Gestion de Flotte (`/fleet`)

- Tableau de toutes les ambulances
- Modification des statuts en temps réel
- Informations équipage et équipement

### 5. Historique des Incidents (`/incidents`)

- Liste complète de tous les incidents
- Recherche par patient ou adresse
- Filtrage par statut
- Statistiques globales

---

## 🎨 Code Couleur

### Statuts Ambulances

- 🟢 **Vert** : Disponible
- 🔴 **Rouge** : Occupée
- 🔵 **Bleu** : Pause
- 🟡 **Jaune** : Maintenance

### Gravité des Incidents

- 🟢 **Vert** : Faible (LOW)
- 🟡 **Jaune** : Moyenne (MEDIUM)
- 🟠 **Orange** : Élevée (HIGH)
- 🔴 **Rouge** : Critique (CRITICAL)

### Statuts des Incidents

- 🟡 **Jaune** : En attente (PENDING)
- 🔵 **Bleu** : En cours (IN_PROGRESS)
- 🟢 **Vert** : Terminé (COMPLETED)
- ⚫ **Gris** : Annulé (CANCELLED)

---

## 🛠️ Fonctionnalités Techniques

### Authentification

- Gestion via Context API React
- Protection des routes
- Persistence avec localStorage
- Redirection automatique

### Gestion d'état

- Context API pour l'authentification
- State local pour les pages
- Fetch API pour les requêtes

### Temps réel

- Rafraîchissement périodique du Dashboard (30s)
- Rafraîchissement périodique de la Carte (10s)
- Mise à jour immédiate après actions

---

## 🐛 Résolution de Problèmes

### L'application ne se lance pas

1. Vérifiez que Node.js est installé : `node --version`
2. Vérifiez que les dépendances sont installées : `npm install`
3. Vérifiez qu'il n'y a pas d'erreur dans la console

### La carte ne s'affiche pas

1. Vérifiez que les CSS de Leaflet sont bien importés
2. Ouvrez la console navigateur pour voir les erreurs
3. Vérifiez la connexion internet (pour les tuiles OpenStreetMap)

### Les données ne s'affichent pas

1. Vérifiez que JSON Server est lancé sur le port 5000
2. Vérifiez le fichier `.env` : `VITE_API_URL=http://localhost:5000`
3. Ouvrez http://localhost:5000/ambulances pour vérifier

### Erreur CORS

Si vous voyez des erreurs CORS, c'est que JSON Server n'est pas lancé ou sur le mauvais port.

---

## 📊 Structure des Données

### Utilisateur (User)

```json
{
  "id": "1",
  "email": "regulateur@resq.com",
  "name": "Marie Dupont",
  "role": "REGULATOR"
}
```

### Ambulance

```json
{
  "id": "amb-1",
  "callSign": "AMB-01",
  "status": "AVAILABLE",
  "latitude": 33.5731,
  "longitude": -7.5898,
  "equipment": ["Défibrillateur", "Brancard"],
  "crew": ["Dr. Ahmed", "Inf. Fatima"]
}
```

### Incident

```json
{
  "id": "inc-1",
  "address": "15 Avenue Hassan II, Casablanca",
  "patientName": "Mohamed Ali",
  "severity": "CRITICAL",
  "status": "IN_PROGRESS",
  "description": "Douleur thoracique",
  "assignedAmbulanceId": "amb-2"
}
```

---

## 🔐 Sécurité

⚠️ **Note importante** : Cette application est un projet éducatif.

- Les mots de passe sont stockés en clair dans db.json
- Pas de chiffrement
- Pas de validation côté serveur
- Ne PAS utiliser en production

---

## 🚀 Prochaines Étapes

Pour améliorer l'application :

1. **Ajouter Redux Toolkit** pour une meilleure gestion d'état
2. **Ajouter TanStack Query** pour le cache et les requêtes optimisées
3. **Ajouter Zod** pour la validation des formulaires
4. **Ajouter Recharts** pour des graphiques de performance
5. **WebSocket** pour le temps réel complet
6. **Tests unitaires** avec Vitest et React Testing Library

---

## 📞 Support

Pour toute question ou problème :

1. Vérifiez ce guide
2. Consultez les logs dans la console
3. Vérifiez que les deux serveurs sont lancés
4. Lisez le README.md principal

Bon développement ! 🚑
