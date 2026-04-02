import { body, param } from 'express-validator';

/**
 * Validations pour les routes Portefeuille
 */

/**
 * Validation pour ajouter un praticien au portefeuille
 * POST /api/portefeuille
 */
export const addPraticienToPortefeuilleValidation = [
  body('visiteurId')
    .notEmpty().withMessage('L\'ID du visiteur est obligatoire')
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide'),

  body('praticienId')
    .notEmpty().withMessage('L\'ID du praticien est obligatoire')
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Les notes ne doivent pas dépasser 1000 caractères')
];

/**
 * Validation pour récupérer le portefeuille d'un visiteur
 * GET /api/portefeuille/visiteur/:visiteurId
 */
export const getPortefeuilleByVisiteurValidation = [
  param('visiteurId')
    .notEmpty().withMessage('L\'ID du visiteur est obligatoire')
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide')
];

/**
 * Validation pour récupérer les visiteurs associés à un praticien
 * GET /api/portefeuille/praticien/:praticienId
 */
export const getPortefeuilleByPraticienValidation = [
  param('praticienId')
    .notEmpty().withMessage('L\'ID du praticien est obligatoire')
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide')
];

/**
 * Validation pour mettre à jour les notes d'une relation
 * PATCH /api/portefeuille/:visiteurId/:praticienId/notes
 */
export const updateNotesValidation = [
  param('visiteurId')
    .notEmpty().withMessage('L\'ID du visiteur est obligatoire')
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide'),

  param('praticienId')
    .notEmpty().withMessage('L\'ID du praticien est obligatoire')
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide'),

  body('notes')
    .trim()
    .notEmpty().withMessage('Les notes sont obligatoires')
    .isLength({ max: 1000 }).withMessage('Les notes ne doivent pas dépasser 1000 caractères')
];

/**
 * Validation pour désactiver un praticien du portefeuille (soft delete)
 * PATCH /api/portefeuille/:visiteurId/:praticienId/remove
 */
export const removePraticienValidation = [
  param('visiteurId')
    .notEmpty().withMessage('L\'ID du visiteur est obligatoire')
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide'),

  param('praticienId')
    .notEmpty().withMessage('L\'ID du praticien est obligatoire')
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide')
];

/**
 * Validation pour supprimer définitivement une relation
 * DELETE /api/portefeuille/:visiteurId/:praticienId
 */
export const deleteRelationValidation = [
  param('visiteurId')
    .notEmpty().withMessage('L\'ID du visiteur est obligatoire')
    .isMongoId().withMessage('L\'ID du visiteur doit être un ID MongoDB valide'),

  param('praticienId')
    .notEmpty().withMessage('L\'ID du praticien est obligatoire')
    .isMongoId().withMessage('L\'ID du praticien doit être un ID MongoDB valide')
];
