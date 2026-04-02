import { body, param } from 'express-validator';

/**
 * Validations pour les routes Praticien
 */

/**
 * Validation pour la création d'un praticien
 */
export const createPraticienValidation = [
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

  body('coefNotoriete')
    .optional()
    .isFloat({ min: 0, max: 10 }).withMessage('Le coefficient de notoriété doit être entre 0 et 10'),

  body('specialite')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('La spécialité ne doit pas dépasser 100 caractères'),

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
 * Validation pour la mise à jour d'un praticien
 */
export const updatePraticienValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID du praticien est obligatoire')
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide'),

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

  body('coefNotoriete')
    .optional()
    .isFloat({ min: 0, max: 10 }).withMessage('Le coefficient de notoriété doit être entre 0 et 10'),

  body('specialite')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('La spécialité ne doit pas dépasser 100 caractères'),

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
 * Validation pour récupérer un praticien par ID
 */
export const getPraticienByIdValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID du praticien est obligatoire')
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide')
];

/**
 * Validation pour supprimer un praticien
 */
export const deletePraticienValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID du praticien est obligatoire')
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide')
];
