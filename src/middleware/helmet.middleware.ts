import helmet from 'helmet';

/**
 * Middleware de sécurité Helmet
 *
 * Helmet protège l'application en configurant divers en-têtes HTTP de sécurité :
 *
 * 1. Content-Security-Policy (CSP) : Prévient les attaques XSS en contrôlant les ressources autorisées
 * 2. X-DNS-Prefetch-Control : Contrôle le DNS prefetching du navigateur
 * 3. X-Frame-Options : Protège contre le clickjacking en empêchant le site d'être dans une iframe
 * 4. X-Content-Type-Options : Empêche les navigateurs de deviner le type MIME (MIME sniffing)
 * 5. Strict-Transport-Security (HSTS) : Force l'utilisation de HTTPS
 * 6. X-Download-Options : Empêche IE d'exécuter des téléchargements dans le contexte du site
 * 7. X-Permitted-Cross-Domain-Policies : Contrôle les politiques cross-domain pour Flash et PDF
 * 8. Referrer-Policy : Contrôle les informations de référent envoyées
 * 9. X-XSS-Protection : Active la protection XSS du navigateur (navigateurs anciens)
 *
 * Configuration par défaut avec quelques ajustements pour une API REST
 */
export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  crossOriginEmbedderPolicy: false, // Désactivé pour permettre le chargement de ressources externes
});
