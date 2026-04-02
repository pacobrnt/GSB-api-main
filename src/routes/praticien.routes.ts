import { Router, type Request, type Response } from 'express';
import { PraticienController } from '../controllers/praticien.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createPraticienValidation,
  updatePraticienValidation,
  getPraticienByIdValidation,
  deletePraticienValidation
} from '../validators/praticien.validator.js';

const router = Router();
const praticienController = new PraticienController();

/**
 * Routes pour les praticiens
 */

// GET /api/praticiens - Récupère tous les praticiens
router.get('/', (req: Request, res: Response) => praticienController.getAllPraticiens(req, res));

// GET /api/praticiens/search - Recherche des praticiens
router.get('/search', (req: Request, res: Response) => praticienController.searchPraticiens(req, res));

// GET /api/praticiens/ville/:ville - Récupère les praticiens par ville
router.get('/ville/:ville', (req: Request, res: Response) => praticienController.getPraticiensByVille(req, res));

// GET /api/praticiens/:id - Récupère un praticien par ID
router.get('/:id', getPraticienByIdValidation, validate, (req: Request, res: Response) => praticienController.getPraticienById(req, res));

// POST /api/praticiens - Crée un nouveau praticien
 router.post('/', (req: Request, res: Response) => praticienController.createPraticien(req, res));

// PUT /api/praticiens/:id - Met à jour un praticien
router.put('/:id', updatePraticienValidation, validate, (req: Request, res: Response) => praticienController.updatePraticien(req, res));

// DELETE /api/praticiens/:id - Supprime un praticien
router.delete('/:id', deletePraticienValidation, validate, (req: Request, res: Response) => praticienController.deletePraticien(req, res));

export default router;
