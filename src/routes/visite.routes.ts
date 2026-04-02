import { Router } from 'express';
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
router.get('/', (req, res) => visiteController.getAllVisites(req, res));

// GET /api/visites/stats - Récupère les statistiques des visites
router.get('/stats', (req, res) => visiteController.getVisitesStats(req, res));

// GET /api/visites/date-range - Récupère les visites par période
router.get('/date-range', (req, res) => visiteController.getVisitesByDateRange(req, res));

// GET /api/visites/visiteur/:visiteurId - Récupère les visites d'un visiteur
router.get('/visiteur/:visiteurId', getVisitesByVisiteurValidation, validate, (req, res) => visiteController.getVisitesByVisiteur(req, res));

// GET /api/visites/praticien/:praticienId - Récupère les visites d'un praticien
router.get('/praticien/:praticienId', getVisitesByPraticienValidation, validate, (req, res) => visiteController.getVisitesByPraticien(req, res));

// GET /api/visites/motif/:motifId - Récupère les visites par motif
router.get('/motif/:motifId', getVisitesByMotifValidation, validate, (req, res) => visiteController.getVisitesByMotif(req, res));

// GET /api/visites/:id - Récupère une visite par ID
router.get('/:id', getVisiteByIdValidation, validate, (req, res) => visiteController.getVisiteById(req, res));

// POST /api/visites - Crée une nouvelle visite
router.post('/', createVisiteValidation, validate, (req, res) => visiteController.createVisite(req, res));

// PUT /api/visites/:id - Met à jour une visite
router.put('/:id', updateVisiteValidation, validate, (req, res) => visiteController.updateVisite(req, res));

// DELETE /api/visites/:id - Supprime une visite
router.delete('/:id', deleteVisiteValidation, validate, (req, res) => visiteController.deleteVisite(req, res));

export default router;
