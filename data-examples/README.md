# Exemples de données pour l'API GSB

Ce dossier contient des exemples de données pour tester l'API.

## Fichiers disponibles

- `motifs.json` - 8 motifs de visite
- `praticiens.json` - 10 praticiens dans différentes villes
- `visiteurs.json` - 10 visiteurs GSB
- `visites.json` - 10 exemples de visites
- `portefeuille.json` - Exemple d'ajout au portefeuille

## Ordre d'utilisation recommandé

### 1. Créer les motifs (pas de dépendances)

Utilisez les requêtes POST dans Postman pour chaque motif du fichier `motifs.json`.

**Exemple :**
```
POST http://localhost:3000/api/motifs
Content-Type: application/json

{
  "libelle": "Présentation produit"
}
```

Répétez pour chaque motif. **Notez les IDs retournés.**

### 2. Créer les praticiens (pas de dépendances)

Utilisez les requêtes POST pour chaque praticien du fichier `praticiens.json`.

**Exemple :**
```
POST http://localhost:3000/api/praticiens
Content-Type: application/json

{
  "nom": "Martin",
  "prenom": "Sophie",
  "tel": "0612345678",
  "email": "sophie.martin@hopital-paris.fr",
  "rue": "15 avenue des Champs Élysées",
  "code_postal": "75008",
  "ville": "Paris"
}
```

**Notez les IDs retournés.**

### 3. Créer les visiteurs (pas de dépendances)

Utilisez les requêtes POST pour chaque visiteur du fichier `visiteurs.json`.

**Exemple :**
```
POST http://localhost:3000/api/visiteurs
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "tel": "0601020304",
  "email": "jean.dupont@gsb.fr",
  "date_embauche": "2020-01-15"
}
```

**Notez les IDs retournés.**

### 4. Ajouter des praticiens au portefeuille

Utilisez les IDs de visiteurs et praticiens que vous avez créés.

**Exemple :**
```
POST http://localhost:3000/api/visiteurs/676e5a3b2c1d4e5f6a7b8c9d/portefeuille
Content-Type: application/json

{
  "praticienId": "676e5b2c3d4e5f6a7b8c9daa"
}
```

### 5. Créer des visites (dépend de visiteurs, praticiens et motifs)

Remplacez les IDs dans `visites.json` par les vrais IDs que vous avez notés, puis créez les visites.

**Exemple :**
```
POST http://localhost:3000/api/visites
Content-Type: application/json

{
  "date_visite": "2024-12-01T09:00:00.000Z",
  "commentaire": "Présentation des nouveaux produits de la gamme antidouleur.",
  "visiteur": "676e5a3b2c1d4e5f6a7b8c9d",
  "praticien": "676e5b2c3d4e5f6a7b8c9daa",
  "motif": "676e5c3d4e5f6a7b8c9dbb11"
}
```

## Répartition géographique des praticiens

- Paris : Sophie Martin
- Lyon : Pierre Bernard
- Marseille : Marie Dubois
- Toulouse : Antoine Leroy
- Nice : Christine Moreau
- Nantes : François Simon
- Strasbourg : Isabelle Laurent
- Bordeaux : Michel Petit
- Lille : Catherine Girard
- Rennes : Jean Roux

## Visiteurs par date d'embauche

- Plus anciens : Sarah Rousseau (2018), Marc Garnier (2019), Alice Mercier (2019)
- Moyens : Jean Dupont (2020), Laura Fournier (2020), Sophie Andre (2020)
- Récents : Thomas Lefebvre (2021), Emma Blanchard (2021)
- Nouveaux : Julien Vincent (2022), Nicolas Faure (2023)

## Motifs de visite

1. Présentation produit
2. Formation
3. Suivi médical
4. Démonstration
5. Renouvellement commande
6. Prospection
7. Service après-vente
8. Audit qualité

## Script pour automatiser l'insertion (optionnel)

Vous pouvez créer un script Node.js pour insérer automatiquement toutes ces données. Voulez-vous que je crée ce script ?
