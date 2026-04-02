# Système de Validation des Données

## Vue d'ensemble

Ce dossier contient tous les validateurs utilisés pour contrôler les données entrantes (body, params, query) **avant qu'elles n'atteignent les contrôleurs**.

## Architecture

```
validators/
├── visiteur.validator.ts      # Validations pour les visiteurs
├── praticien.validator.ts     # Validations pour les praticiens
├── visite.validator.ts        # Validations pour les visites
├── motif.validator.ts         # Validations pour les motifs
└── portefeuille.validator.ts  # Validations pour le portefeuille
```

## Utilité du Système de Validation

### 1. **Sécurité**
- Empêche les injections malveillantes (SQL, NoSQL, XSS)
- Bloque les données non conformes avant le traitement
- Valide les types de données et les formats
- Protège contre les attaques par dépassement de buffer

### 2. **Intégrité des Données**
- Garantit que seules des données valides entrent dans la base de données
- Évite les erreurs de type à l'exécution
- Assure la cohérence des données

### 3. **Expérience Utilisateur**
- Retourne des messages d'erreur clairs et précis
- Indique exactement quel champ est invalide
- Facilite le débogage côté client

### 4. **Maintenabilité**
- Centralise toute la logique de validation
- Réutilisable sur plusieurs routes
- Facile à tester et à modifier
- Séparation des responsabilités (validation ≠ logique métier)

## Comment ça fonctionne ?

### Schéma de fonctionnement

```
Requête HTTP
    ↓
[Middleware Rate Limiter]
    ↓
[Middleware Helmet]
    ↓
[Validateurs express-validator]  ← Règles de validation
    ↓
[Middleware validate]            ← Vérifie les erreurs
    ↓
Si erreurs → Retourne 400 avec détails
Si OK → Passe au contrôleur
    ↓
[Contrôleur]
    ↓
[Service]
    ↓
[Base de données]
```

### Exemple d'utilisation dans une route

```typescript
import { Router } from 'express';
import { validate } from '../middleware/validate.middleware.js';
import { createVisiteurValidation } from '../validators/visiteur.validator.js';
import { VisiteurController } from '../controllers/visiteur.controller.js';

const router = Router();
const controller = new VisiteurController();

// La validation s'exécute AVANT le contrôleur
router.post(
  '/',
  createVisiteurValidation,  // 1. Applique les règles de validation
  validate,                   // 2. Vérifie s'il y a des erreurs
  controller.createVisiteur   // 3. Si OK, exécute le contrôleur
);
```

## Types de Validations Disponibles

### 1. **Validation de Type**
```typescript
body('nom').isString()
body('age').isInt()
body('email').isEmail()
```

### 2. **Validation de Format**
```typescript
body('cp').matches(/^[0-9]{5}$/)  // Code postal français
body('telephone').matches(/^(\+33|0)[1-9](\d{2}){4}$/)  // Téléphone FR
body('dateVisite').isISO8601()  // Format de date ISO
```

### 3. **Validation de Longueur**
```typescript
body('nom').isLength({ min: 2, max: 50 })
body('commentaire').isLength({ max: 500 })
```

### 4. **Validation d'Existence**
```typescript
body('nom').notEmpty()
body('email').optional()  // Champ facultatif
```

### 5. **Validation Personnalisée**
```typescript
body('dateEmbauche').custom((value) => {
  const date = new Date(value);
  const now = new Date();
  if (date > now) {
    throw new Error('La date ne peut pas être dans le futur');
  }
  return true;
})
```

### 6. **Validation de MongoDB ObjectId**
```typescript
param('id').isMongoId()
```

### 7. **Nettoyage et Normalisation**
```typescript
body('email').trim().normalizeEmail()
body('nom').trim().escape()
```

## Exemple de Réponse d'Erreur

Quand une validation échoue, le middleware retourne automatiquement :

```json
{
  "success": false,
  "message": "Erreur de validation des données",
  "errors": [
    {
      "field": "nom",
      "message": "Le nom doit contenir entre 2 et 50 caractères",
      "value": "A"
    },
    {
      "field": "email",
      "message": "L'email doit être valide",
      "value": "invalid-email"
    },
    {
      "field": "cp",
      "message": "Le code postal doit contenir exactement 5 chiffres",
      "value": "123"
    }
  ]
}
```

## Bonnes Pratiques

### ✅ À faire
- Valider **toutes** les entrées utilisateur (body, params, query)
- Utiliser `.trim()` pour nettoyer les espaces inutiles
- Valider les IDs MongoDB avec `.isMongoId()`
- Définir des longueurs max pour éviter les attaques par saturation
- Utiliser des messages d'erreur clairs en français

### ❌ À éviter
- Ne jamais faire confiance aux données du client
- Ne pas oublier de valider les paramètres d'URL
- Ne pas avoir des messages d'erreur trop techniques
- Ne pas dupliquer la logique de validation

## Ajout d'un Nouveau Validateur

1. Créer un fichier dans `validators/` (ex: `produit.validator.ts`)
2. Importer `body`, `param`, `query` de `express-validator`
3. Créer les règles de validation
4. Exporter les validations
5. Importer dans la route concernée
6. Ajouter avant le contrôleur avec le middleware `validate`

```typescript
// Exemple: validators/produit.validator.ts
import { body, param } from 'express-validator';

export const createProduitValidation = [
  body('nom').trim().notEmpty().isLength({ min: 2, max: 100 }),
  body('prix').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 })
];

// Dans la route
import { createProduitValidation } from '../validators/produit.validator.js';
import { validate } from '../middleware/validate.middleware.js';

router.post('/', createProduitValidation, validate, controller.create);
```

## Ressources

- [Documentation express-validator](https://express-validator.github.io/docs/)
- [Liste complète des validateurs](https://github.com/validatorjs/validator.js#validators)
- [OWASP Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
