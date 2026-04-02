import { body, param } from 'express-validator';

/**
 * Validations pour les routes Visiteur
 *
 * Ces règles de validation s'appliquent avant que les données n'atteignent le contrôleur.
 * Elles vérifient la conformité des données (body, params, query) selon les règles métier.
 */

/**
 * Validation pour la création d'un visiteur
 */
export const createVisiteurValidation = [
  body('nom')
    .trim()
    .notEmpty().withMessage('Le nom est obligatoire')
    .isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s-]+$/).withMessage('Le nom ne doit contenir que des lettres'),

  body('prenom')
    .trim()
    .notEmpty().withMessage('Le prénom est obligatoire')
    .isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s-]+$/).withMessage('Le prénom ne doit contenir que des lettres'),

  body('adresse')
    .trim()
    .notEmpty().withMessage('L\'adresse est obligatoire')
    .isLength({ min: 5, max: 200 }).withMessage('L\'adresse doit contenir entre 5 et 200 caractères'),

  body('cp')
    .trim()
    .notEmpty().withMessage('Le code postal est obligatoire')
    .matches(/^[0-9]{5}$/).withMessage('Le code postal doit contenir exactement 5 chiffres'),

  body('ville')
    .trim()
    .notEmpty().withMessage('La ville est obligatoire')
    .isLength({ min: 2, max: 50 }).withMessage('La ville doit contenir entre 2 et 50 caractères'),

  body('dateEmbauche')
    .notEmpty().withMessage('La date d\'embauche est obligatoire')
    .isISO8601().withMessage('La date d\'embauche doit être au format valide (YYYY-MM-DD)')
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      if (date > now) {
        throw new Error('La date d\'embauche ne peut pas être dans le futur');
      }
      return true;
    }),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('L\'email doit être valide')
    .normalizeEmail(),

  body('telephone')
    .optional()
    .trim()
    .matches(/^(\+33|0)[1-9](\d{2}){4}$/).withMessage('Le numéro de téléphone doit être valide (format français)')
];

/**
 * Validation pour la mise à jour d'un visiteur
 */
export const updateVisiteurValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID du visiteur est obligatoire')
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide'),

  body('nom')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s-]+$/).withMessage('Le nom ne doit contenir que des lettres'),

  body('prenom')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s-]+$/).withMessage('Le prénom ne doit contenir que des lettres'),

  body('adresse')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 }).withMessage('L\'adresse doit contenir entre 5 et 200 caractères'),

  body('cp')
    .optional()
    .trim()
    .matches(/^[0-9]{5}$/).withMessage('Le code postal doit contenir exactement 5 chiffres'),

  body('ville')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('La ville doit contenir entre 2 et 50 caractères'),

  body('dateEmbauche')
    .optional()
    .isISO8601().withMessage('La date d\'embauche doit être au format valide (YYYY-MM-DD)')
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      if (date > now) {
        throw new Error('La date d\'embauche ne peut pas être dans le futur');
      }
      return true;
    }),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('L\'email doit être valide')
    .normalizeEmail(),

  body('telephone')
    .optional()
    .trim()
    .matches(/^(\+33|0)[1-9](\d{2}){4}$/).withMessage('Le numéro de téléphone doit être valide (format français)')
];

/**
 * Validation pour récupérer un visiteur par ID
 */
export const getVisiteurByIdValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID du visiteur est obligatoire')
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide')
];

/**
 * Validation pour supprimer un visiteur
 */
export const deleteVisiteurValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID du visiteur est obligatoire')
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide')
];
