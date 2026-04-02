import { Router, type Request, type Response } from 'express';
import { VisiteController } from '../controllers/visite.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createVisiteValidation,
  updateVisiteValidation,
  getVisiteByIdValidation,
  deleteVisiteValidation,
  getVisitesByVisiteurValidation,
  getVisitesByPraticienValidation,
  getVisitesByMotifValidation
} from '../validators/visite.validator.js';

const router = Router();
const visiteController = new VisiteController();

/**
 * Routes pour les visites
 */

// GET /api/visites - Récupère toutes les visites
router.get('/', (req: Request, res: Response) => visiteController.getAllVisites(req, res));

// GET /api/visites/stats - Récupère les statistiques des visites
router.get('/stats', (req: Request, res: Response) => visiteController.getVisitesStats(req, res));

// GET /api/visites/date-range - Récupère les visites par période
router.get('/date-range', (req: Request, res: Response) => visiteController.getVisitesByDateRange(req, res));

// GET /api/visites/visiteur/:visiteurId - Récupère les visites d'un visiteur
router.get('/visiteur/:visiteurId', getVisitesByVisiteurValidation, validate, (req: Request, res: Response) => visiteController.getVisitesByVisiteur(req, res));

// GET /api/visites/praticien/:praticienId - Récupère les visites d'un praticien
router.get('/praticien/:praticienId', getVisitesByPraticienValidation, validate, (req: Request, res: Response) => visiteController.getVisitesByPraticien(req, res));

// GET /api/visites/motif/:motifId - Récupère les visites par motif
router.get('/motif/:motifId', getVisitesByMotifValidation, validate, (req: Request, res: Response) => visiteController.getVisitesByMotif(req, res));

// GET /api/visites/:id - Récupère une visite par ID
router.get('/:id', getVisiteByIdValidation, validate, (req: Request, res: Response) => visiteController.getVisiteById(req, res));

// POST /api/visites - Crée une nouvelle visite
router.post('/', createVisiteValidation, validate, (req: Request, res: Response) => visiteController.createVisite(req, res));

// PUT /api/visites/:id - Met à jour une visite
router.put('/:id', updateVisiteValidation, validate, (req: Request, res: Response) => visiteController.updateVisite(req, res));

// DELETE /api/visites/:id - Supprime une visite
router.delete('/:id', deleteVisiteValidation, validate, (req: Request, res: Response) => visiteController.deleteVisite(req, res));

export default router;
