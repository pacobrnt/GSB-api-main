import { Router } from 'express';
import { VisiteurController } from '../controllers/visiteur.controller.js';

const router = Router();
const visiteurController = new VisiteurController();

// POST /api/auth/signup - Inscription
router.post('/signup', (req, res) => visiteurController.signup(req, res));

// POST /api/auth/login - Connexion
router.post('/login', (req, res) => visiteurController.login(req, res));

export default router;
