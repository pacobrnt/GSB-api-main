import { Router, type Request, type Response } from 'express';
import { VisiteurController } from '../controllers/visiteur.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createVisiteurValidation,
  updateVisiteurValidation,
  getVisiteurByIdValidation,
  deleteVisiteurValidation
} from '../validators/visiteur.validator.js';
import {
  getPortefeuilleByVisiteurValidation
} from '../validators/portefeuille.validator.js';

const router = Router();
const visiteurController = new VisiteurController();

/**
 * Routes pour les visiteurs
 */

// GET /api/visiteurs - Récupère tous les visiteurs
router.get('/', (req: Request, res: Response) => visiteurController.getAllVisiteurs(req, res));

// GET /api/visiteurs/search - Recherche des visiteurs
router.get('/search', (req: Request, res: Response) => visiteurController.searchVisiteurs(req, res));

// GET /api/visiteurs/:id - Récupère un visiteur par ID
router.get('/:id', getVisiteurByIdValidation, validate, (req: Request, res: Response) => visiteurController.getVisiteurById(req, res));

// POST /api/visiteurs - Crée un nouveau visiteur
router.post('/', createVisiteurValidation, validate, (req: Request, res: Response) => visiteurController.createVisiteur(req, res));

// PUT /api/visiteurs/:id - Met à jour un visiteur
router.put('/:id', updateVisiteurValidation, validate, (req: Request, res: Response) => visiteurController.updateVisiteur(req, res));

// DELETE /api/visiteurs/:id - Supprime un visiteur
router.delete('/:id', deleteVisiteurValidation, validate, (req: Request, res: Response) => visiteurController.deleteVisiteur(req, res));

// GET /api/visiteurs/:visiteurId/portefeuille - Récupère le portefeuille d'un visiteur
router.get('/:visiteurId/portefeuille', getPortefeuilleByVisiteurValidation, validate, (req: Request, res: Response) => visiteurController.getPortefeuillePraticiens(req, res));

export default router;
