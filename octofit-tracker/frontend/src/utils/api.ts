// VITE_CODESPACE_NAME should be defined in .env.local when running in Codespaces.
// Example: VITE_CODESPACE_NAME=my-codespace-name
export const VITE_CODESPACE_NAME = typeof import.meta.env.VITE_CODESPACE_NAME === 'string'
  ? import.meta.env.VITE_CODESPACE_NAME.trim()
  : '';

export const apiHost = VITE_CODESPACE_NAME
  ? `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function apiUrlFor(resource: string) {
  return `${apiHost}/${resource}`;
}

export function normalizeApiResponse<T = any>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === 'object') {
    const response = value as Record<string, unknown>;
    if (Array.isArray(response.data)) return response.data as T[];

    for (const key of Object.keys(response)) {
      if (Array.isArray(response[key])) {
        return response[key] as T[];
      }
    }
  }

  return [];
}
