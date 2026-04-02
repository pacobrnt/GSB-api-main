import { Router } from 'express';
import { MotifController } from '../controllers/motif.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createMotifValidation,
  updateMotifValidation,
  getMotifByIdValidation,
  deleteMotifValidation
} from '../validators/motif.validator.js';

const router = Router();
const motifController = new MotifController();

/**
 * Routes pour les motifs
 * 
 * - GET /api/motifs
 * - GET /api/motifs/search
 * - GET /api/motifs/:id
 * - POST /api/motifs
 * - PUT /api/motifs/:id
 * - DELETE /api/motifs/:id
 */

// GET /api/motifs - Récupère tous les motifs
router.get('/', (req, res) => motifController.getAllMotifs(req, res));

// GET /api/motifs/search - Recherche des motifs
router.get('/search', (req, res) => motifController.searchMotifs(req, res));

// GET /api/motifs/:id - Récupère un motif par ID
router.get('/:id', getMotifByIdValidation, validate, (req, res) => motifController.getMotifById(req, res));

// POST /api/motifs - Crée un nouveau motif
router.post('/', createMotifValidation, validate, (req, res) => motifController.createMotif(req, res));

// PUT /api/motifs/:id - Met à jour un motif
router.put('/:id', updateMotifValidation, validate, (req, res) => motifController.updateMotif(req, res));

// DELETE /api/motifs/:id - Supprime un motif
router.delete('/:id', deleteMotifValidation, validate, (req, res) => motifController.deleteMotif(req, res));

export default router;
