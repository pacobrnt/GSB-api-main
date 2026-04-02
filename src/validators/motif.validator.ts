import { body, param } from 'express-validator';

/**
 * Validations pour les routes Motif
 */

/**
 * Validation pour la création d'un motif
 */
export const createMotifValidation = [
  body('libelle')
    .trim()
    .notEmpty().withMessage('Le libellé est obligatoire')
    .isLength({ min: 2, max: 100 }).withMessage('Le libellé doit contenir entre 2 et 100 caractères'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('La description ne doit pas dépasser 500 caractères')
];

/**
 * Validation pour la mise à jour d'un motif
 */
export const updateMotifValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID du motif est obligatoire')
    .isMongoId().withMessage('L\'ID du motif doit être un ID MongoDB valide'),

  body('libelle')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Le libellé doit contenir entre 2 et 100 caractères'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('La description ne doit pas dépasser 500 caractères')
];

/**
 * Validation pour récupérer un motif par ID
 */
export const getMotifByIdValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID du motif est obligatoire')
    .isMongoId().withMessage('L\'ID du motif doit être un ID MongoDB valide')
];

/**
 * Validation pour supprimer un motif
 */
export const deleteMotifValidation = [
  param('id')
    .notEmpty().withMessage('L\'ID du motif est obligatoire')
    .isMongoId().withMessage('L\'ID du motif doit être un ID MongoDB valide')
];
