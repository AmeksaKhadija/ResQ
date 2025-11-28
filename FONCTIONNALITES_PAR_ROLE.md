# 👥 Matrice des Fonctionnalités par Rôle

## 🟢 Régulateur (REGULATOR)

**Email:** regulateur@resq.com  
**Rôle:** Opérateur de régulation - Gestion opérationnelle complète

### Accès aux Pages

| Page              | Accès  | Fonctionnalités                            |
| ----------------- | ------ | ------------------------------------------ |
| 📊 Dashboard      | ✅ Oui | Vue d'ensemble complète des opérations     |
| 🗺️ Carte Dispatch | ✅ Oui | Visualisation et gestion des interventions |
| 🚑 Gestion Flotte | ✅ Oui | Consultation et modification des statuts   |
| 📋 Historique     | ✅ Oui | Consultation de toutes les interventions   |

### Capacités Opérationnelles

#### Sur le Dashboard

- ✅ Voir les KPIs en temps réel
- ✅ Consulter les incidents actifs
- ✅ Visualiser l'activité récente
- ✅ Accéder aux statistiques globales

#### Sur la Carte

- ✅ Visualiser toutes les ambulances sur la carte
- ✅ Voir la position des incidents actifs
- ✅ **Assigner une ambulance à un incident**
- ✅ Filtrer les ambulances par statut
- ✅ Consulter les détails des interventions en cours
- ✅ Voir les équipages assignés

#### Sur la Gestion de Flotte

- ✅ Voir la liste complète des ambulances
- ✅ **Modifier le statut d'une ambulance**
  - Disponible → Occupée
  - Occupée → Disponible
  - Pause
  - Maintenance
- ✅ Consulter l'équipage de chaque ambulance
- ✅ Voir l'équipement disponible

#### Sur l'Historique

- ✅ Consulter tous les incidents (passés et présents)
- ✅ Rechercher par patient ou adresse
- ✅ Filtrer par statut
- ✅ Voir les détails complets
- ✅ Consulter les statistiques globales

---

## 🟣 Chef de Parc (FLEET_MANAGER)

**Email:** chef@resq.com  
**Rôle:** Gestionnaire de flotte - Gestion des véhicules et ressources

### Accès aux Pages

| Page              | Accès  | Fonctionnalités                            |
| ----------------- | ------ | ------------------------------------------ |
| 📊 Dashboard      | ✅ Oui | Vue d'ensemble de la flotte                |
| 🗺️ Carte Dispatch | ❌ Non | Pas d'accès (rôle opérationnel uniquement) |
| 🚑 Gestion Flotte | ✅ Oui | Gestion complète de la flotte              |
| 📋 Historique     | ❌ Non | Pas d'accès (données opérationnelles)      |

### Capacités Opérationnelles

#### Sur le Dashboard

- ✅ Voir les KPIs de la flotte
- ✅ Consulter le nombre d'ambulances disponibles
- ✅ Voir les incidents en cours (lecture seule)
- ✅ Visualiser l'activité récente

#### Sur la Gestion de Flotte

- ✅ Voir la liste complète des ambulances
- ✅ **Modifier le statut des véhicules**
  - Marquer en maintenance
  - Remettre en service
  - Mettre en pause
- ✅ Gérer les équipages
- ✅ Consulter l'équipement de chaque véhicule
- ✅ Suivre les dernières mises à jour

---

## 🎯 Cas d'Usage par Rôle

### Scénario 1 : Nouvelle Urgence

**Régulateur uniquement**

1. 🔔 Un appel d'urgence arrive
2. 📍 Le régulateur consulte la **Carte Dispatch**
3. 🚑 Il identifie l'ambulance disponible la plus proche
4. ✅ Il assigne l'ambulance à l'incident via la carte
5. 📊 Le statut de l'ambulance passe automatiquement à "Occupée"
6. 📈 Le Dashboard se met à jour en temps réel

**Le Chef de Parc** verra la mise à jour dans la **Gestion Flotte** mais ne peut pas assigner d'ambulances.

### Scénario 2 : Maintenance d'un Véhicule

**Chef de Parc ou Régulateur**

1. 🔧 Un véhicule nécessite une maintenance
2. 🚑 Accès à la page **Gestion Flotte**
3. ⚙️ Changement du statut à "Maintenance"
4. ✅ L'ambulance disparaît des ambulances assignables
5. 📊 Le Dashboard reflète la diminution des ressources

### Scénario 3 : Analyse de Performance

**Régulateur uniquement**

1. 📋 Accès à **Historique des Incidents**
2. 🔍 Recherche et filtrage par date/statut
3. 📊 Consultation des temps de réponse
4. 📈 Analyse des statistiques
5. 📝 Identification des axes d'amélioration

**Le Chef de Parc** n'a pas accès à cette page.

---

## 🔐 Matrice des Permissions

### Actions sur les Ambulances

| Action                 | Régulateur | Chef de Parc |
| ---------------------- | ---------- | ------------ |
| Voir la liste          | ✅         | ✅           |
| Voir sur la carte      | ✅         | ❌           |
| Changer le statut      | ✅         | ✅           |
| Assigner à un incident | ✅         | ❌           |
| Ajouter/Supprimer      | ❌         | ✅           |

### Actions sur les Incidents

| Action                 | Régulateur | Chef de Parc |
| ---------------------- | ---------- | ------------ |
| Voir la liste          | ✅         | ❌           |
| Créer un incident      | ✅         | ❌           |
| Assigner une ambulance | ✅         | ❌           |
| Voir l'historique      | ✅         | ❌           |
| Consulter sur carte    | ✅         | ❌           |

### Accès aux Données

| Donnée              | Régulateur | Chef de Parc |
| ------------------- | ---------- | ------------ |
| KPIs Dashboard      | ✅         | ✅           |
| Position GPS        | ✅         | ❌           |
| Historique complet  | ✅         | ❌           |
| Statistiques flotte | ✅         | ✅           |
| Détails patients    | ✅         | ❌           |

---

## 🎨 Interface Adaptée par Rôle

### Navigation Sidebar

**Régulateur voit:**

```
📊 Dashboard
🗺️ Carte Dispatch
🚑 Gestion Flotte
📋 Historique
```

**Chef de Parc voit:**

```
📊 Dashboard
🚑 Gestion Flotte
```

La navigation s'adapte automatiquement selon le rôle connecté !

---

## 💡 Conseils d'Utilisation

### Pour le Régulateur

1. Commencez par le **Dashboard** pour avoir une vue globale
2. Utilisez la **Carte** pour les opérations en temps réel
3. Consultez **l'Historique** pour l'analyse et les rapports
4. Gardez la **Gestion Flotte** ouverte pour surveiller les statuts

### Pour le Chef de Parc

1. Concentrez-vous sur la **Gestion Flotte**
2. Surveillez le **Dashboard** pour les métriques
3. Planifiez les maintenances selon la disponibilité
4. Gérez les ressources (équipages, équipements)

---

## 📞 Contact et Support

Pour toute question sur les fonctionnalités :

- Consultez le **README.md**
- Lisez le **GUIDE_DEMARRAGE.md**
- Vérifiez **INSTALLATION_COMPLETE.md**

**Bonne utilisation de ResQ ! 🚑**
