/**
 * URL de base de l'API.
 * - En dev : vide (proxy Vite vers localhost:3001)
 * - En prod Netlify : URL du backend (ex: https://peleai360.onrender.com)
 */
export const API_BASE = (import.meta.env.VITE_API_URL as string) || '';
