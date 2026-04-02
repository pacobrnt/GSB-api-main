import { Router, type Request, type Response } from 'express';
import { PortefeuilleController } from '../controllers/portefeuille.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  addPraticienToPortefeuilleValidation,
  getPortefeuilleByVisiteurValidation,
  getPortefeuilleByPraticienValidation,
  updateNotesValidation,
  removePraticienValidation,
  deleteRelationValidation
} from '../validators/portefeuille.validator.js';

const router = Router();
const portefeuilleController = new PortefeuilleController();

/**
 * Routes pour la gestion du portefeuille visiteur/praticien
 * Chaque route fait appel à une méthode du PortefeuilleController
 * 
 * - GET /api/portefeuille
 * - GET /api/portefeuille/visiteur/:visiteurId
 * - GET /api/portefeuille/praticien/:praticienId
 * - POST /api/portefeuille
 * - PATCH /api/portefeuille/:visiteurId/:praticienId/notes
 * - PATCH /api/portefeuille/:visiteurId/:praticienId/remove
 * - DELETE /api/portefeuille/:visiteurId/:praticienId  
 * 
 */

// GET /api/portefeuille - Récupère toutes les relations de portefeuille
router.get('/', (req: Request, res: Response) => portefeuilleController.getAll(req, res));

// GET /api/portefeuille/visiteur/:visiteurId - Récupère le portefeuille d'un visiteur
router.get('/visiteur/:visiteurId', getPortefeuilleByVisiteurValidation, validate, (req: Request, res: Response) => portefeuilleController.getByVisiteur(req, res));

// GET /api/portefeuille/praticien/:praticienId - Récupère tous les visiteurs associés à un praticien
router.get('/praticien/:praticienId', getPortefeuilleByPraticienValidation, validate, (req: Request, res: Response) => portefeuilleController.getByPraticien(req, res));

// POST /api/portefeuille - Ajoute un praticien au portefeuille d'un visiteur
router.post('/', addPraticienToPortefeuilleValidation, validate, (req: Request, res: Response) => portefeuilleController.addPraticien(req, res));

// PATCH /api/portefeuille/:visiteurId/:praticienId/notes - Met à jour les notes d'une relation
router.patch('/:visiteurId/:praticienId/notes', updateNotesValidation, validate, (req: Request, res: Response) => portefeuilleController.updateNotes(req, res));

// PATCH /api/portefeuille/:visiteurId/:praticienId/remove - Désactive un praticien du portefeuille (soft delete)
router.patch('/:visiteurId/:praticienId/remove', removePraticienValidation, validate, (req: Request, res: Response) => portefeuilleController.removePraticien(req, res));

// DELETE /api/portefeuille/:visiteurId/:praticienId - Supprime définitivement une relation
router.delete('/:visiteurId/:praticienId', deleteRelationValidation, validate, (req: Request, res: Response) => portefeuilleController.deleteRelation(req, res));

export default router;
