# 🚀 DÉMARRAGE ULTRA-RAPIDE - ResQ

## ⚡ En 30 secondes

### Option 1 : Double-clic (Windows)

1. Double-cliquez sur `start.bat`
2. Attendez que les deux serveurs démarrent
3. Ouvrez http://localhost:5173
4. Connectez-vous avec `regulateur@resq.com` / `password123`

### Option 2 : Deux terminaux

**Terminal 1:**

```powershell
npm run server
```

**Terminal 2:**

```powershell
npm run dev
```

---

## 👤 CONNEXION

### Régulateur (Tout voir, tout faire)

```
Email: regulateur@resq.com
Password: password123
```

### Chef de Parc (Gestion flotte uniquement)

```
Email: chef@resq.com
Password: password123
```

---

## 📍 URLs Importantes

| Service         | URL                              | Description          |
| --------------- | -------------------------------- | -------------------- |
| **Application** | http://localhost:5173            | Interface principale |
| **API**         | http://localhost:5000            | JSON Server          |
| **Ambulances**  | http://localhost:5000/ambulances | Données ambulances   |
| **Incidents**   | http://localhost:5000/incidents  | Données incidents    |
| **Users**       | http://localhost:5000/users      | Utilisateurs         |

---

## 🎯 Que Faire en Premier ?

### 1️⃣ Connectez-vous comme Régulateur

```
regulateur@resq.com / password123
```

### 2️⃣ Explorez le Dashboard

- Voyez les 4 KPIs
- Consultez l'activité récente

### 3️⃣ Ouvrez la Carte

- Cliquez sur "Carte Dispatch" dans la sidebar
- Voyez les 5 ambulances et 3 incidents actifs
- Cliquez sur un marqueur pour les détails
- Assignez une ambulance à un incident en attente !

### 4️⃣ Testez l'Attribution

1. Trouvez un incident JAUNE (en attente)
2. Cliquez sur le marqueur
3. Cliquez sur une ambulance disponible (verte)
4. ✅ L'ambulance devient rouge (occupée)
5. 📊 Le dashboard se met à jour automatiquement

### 5️⃣ Gérez la Flotte

- Changez le statut d'une ambulance
- Voyez les équipages et équipements

### 6️⃣ Consultez l'Historique

- Recherchez un patient
- Filtrez par statut
- Voyez les statistiques

---

## 🎨 Codes Couleur à Connaître

### Ambulances

- 🟢 Disponible
- 🔴 Occupée
- 🔵 Pause
- 🟡 Maintenance

### Incidents

- 🔴 CRITIQUE
- 🟠 ÉLEVÉ
- 🟡 MOYEN
- 🟢 FAIBLE

---

## 🐛 Problème ?

### L'app ne démarre pas

```powershell
npm install
```

### JSON Server ne démarre pas

```powershell
npm install -g json-server
```

### Erreur 404 sur les données

Vérifiez que JSON Server tourne : http://localhost:5000

### La carte est vide

- Attendez 2-3 secondes
- Vérifiez votre connexion internet (pour les tuiles)
- Ouvrez F12 pour voir les erreurs

---

## 📚 Documentation Complète

| Fichier                       | Contenu                  |
| ----------------------------- | ------------------------ |
| `README.md`                   | Documentation principale |
| `GUIDE_DEMARRAGE.md`          | Guide détaillé           |
| `INSTALLATION_COMPLETE.md`    | Checklist complète       |
| `FONCTIONNALITES_PAR_ROLE.md` | Matrice des permissions  |
| `QUICKSTART.md`               | Ce fichier               |

---

## ✨ Fonctionnalités Cool à Tester

### 1. Attribution en Temps Réel

1. Ouvrez la carte
2. Cliquez sur un incident en attente (jaune)
3. Assignez une ambulance
4. Retournez au Dashboard → Le nombre d'incidents actifs diminue !

### 2. Changement de Statut

1. Allez dans Gestion Flotte
2. Changez le statut d'une ambulance
3. Retournez à la carte → La couleur du marqueur change !

### 3. Recherche dans l'Historique

1. Allez dans Historique
2. Tapez "Mohamed" dans la recherche
3. Trouvez l'incident critique assigné à AMB-02

### 4. Filtres de la Carte

1. Sur la carte, cliquez sur "Disponibles"
2. Seules les ambulances vertes s'affichent
3. Cliquez sur "Occupées" → Seules les rouges

### 5. Sidebar Rétractable

1. Cliquez sur le ❌ en haut de la sidebar
2. La barre se rétracte en icônes uniquement
3. Plus d'espace pour la carte !

---

## 🎓 Données de Test Présentes

### 5 Ambulances

- **AMB-01** : Disponible à Casablanca (Verte)
- **AMB-02** : Occupée - Intervention en cours (Rouge)
- **AMB-03** : Disponible à Casablanca (Verte)
- **AMB-04** : En maintenance (Jaune)
- **AMB-05** : En pause déjeuner (Bleue)

### 4 Incidents

- **Mohamed Ali** : CRITIQUE en cours → AMB-02 assignée
- **Fatima Zahra** : MOYEN en attente → À assigner
- **Ahmed Benani** : ÉLEVÉ en attente → À assigner
- **Nadia El Amrani** : FAIBLE terminé ce matin

---

## 🔄 Rafraîchissement Auto

| Page      | Intervalle  |
| --------- | ----------- |
| Dashboard | 30 secondes |
| Carte     | 10 secondes |
| Autres    | Manuel      |

---

## 🚀 Prêt à Commencer ?

1. **Lancez** : `start.bat` ou les deux terminaux
2. **Ouvrez** : http://localhost:5173
3. **Connectez** : regulateur@resq.com / password123
4. **Explorez** : Toutes les pages !
5. **Testez** : Assignez une ambulance !

**Bon voyage avec ResQ ! 🚑**

---

## 💬 Astuce Pro

Pour une expérience optimale :

1. Connectez-vous en Régulateur
2. Ouvrez la carte en plein écran
3. Rétractez la sidebar (cliquez sur ❌)
4. Assignez des ambulances aux incidents en attente
5. Voyez les mises à jour en temps réel !

**C'est parti ! 🎉**
