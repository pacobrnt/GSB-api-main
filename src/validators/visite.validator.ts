import { body, param, query } from 'express-validator';

/**
 * Validations pour les routes Visite
 */

/**
 * Validation pour la création d'une visite
 */
export const createVisiteValidation = [
  body('visiteurId')
    .notEmpty().withMessage('L\'ID du visiteur est obligatoire')
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide'),

  body('praticienId')
    .notEmpty().withMessage('L\'ID du praticien est obligatoire')
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide'),

  body('motifId')
    .notEmpty().withMessage('L\'ID du motif est obligatoire')
    .isMongoId().withMessage('L\'ID du motif doit être un ID MongoDB valide'),

  body('dateVisite')
    .notEmpty().withMessage('La date de visite est obligatoire')
    .isISO8601().withMessage('La date de visite doit être au format valide (YYYY-MM-DD)'),

  body('commentaire')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Le commentaire ne doit pas dépasser 500 caractères'),

  body('bilan')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Le bilan ne doit pas dépasser 1000 caractères')
];

/**
 * Validation pour la mise à jour d'une visite
 */
export const updateVisiteValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID de la visite est obligatoire')
    .isMongoId().withMessage('L\'ID de la visite doit être un ID MongoDB valide'),

  body('visiteurId')
    .optional()
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide'),

  body('praticienId')
    .optional()
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide'),

  body('motifId')
    .optional()
    .isMongoId().withMessage('L\'ID du motif doit être un ID MongoDB valide'),

  body('dateVisite')
    .optional()
    .isISO8601().withMessage('La date de visite doit être au format valide (YYYY-MM-DD)'),

  body('commentaire')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Le commentaire ne doit pas dépasser 500 caractères'),

  body('bilan')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Le bilan ne doit pas dépasser 1000 caractères')
];

/**
 * Validation pour récupérer une visite par ID
 */
export const getVisiteByIdValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID de la visite est obligatoire')
    .isMongoId().withMessage('L\'ID de la visite doit être un ID MongoDB valide')
];

/**
 * Validation pour supprimer une visite
 */
export const deleteVisiteValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID de la visite est obligatoire')
    .isMongoId().withMessage('L\'ID de la visite doit être un ID MongoDB valide')
];

/**
 * Validation pour récupérer les visites par visiteur
 */
export const getVisitesByVisiteurValidation = [
  param('visiteurId')
    .notEmpty().withMessage('L\'ID du visiteur est obligatoire')
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide')
];

/**
 * Validation pour récupérer les visites par praticien
 */
export const getVisitesByPraticienValidation = [
  param('praticienId')
    .notEmpty().withMessage('L\'ID du praticien est obligatoire')
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide')
];

/**
 * Validation pour récupérer les visites par motif
 */
export const getVisitesByMotifValidation = [
  param('motifId')
    .notEmpty().withMessage('L\'ID du motif est obligatoire')
    .isMongoId().withMessage('L\'ID du motif doit être un ID MongoDB valide')
];
