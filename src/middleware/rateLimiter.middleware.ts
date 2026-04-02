import rateLimit from 'express-rate-limit';

/**
 * Middleware de rate limiting pour limiter le nombre de requêtes par IP
 * Bloque après 10 requêtes consécutives pendant 15 minutes
 */
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limite chaque IP à 10 requêtes par fenêtre de 15 minutes
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.',
  standardHeaders: true, // Retourne les informations de rate limit dans les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
});
