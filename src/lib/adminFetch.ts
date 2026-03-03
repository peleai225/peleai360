import { API_BASE } from '../config';

/**
 * Fetch util pour les appels API admin.
 * Utilise credentials: 'include' pour envoyer le cookie HttpOnly.
 */
const API = `${API_BASE}/api/admin`;

export function adminFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  return fetch(`${API}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  });
}
