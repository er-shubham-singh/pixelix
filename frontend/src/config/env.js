const rawApiUrl = import.meta.env.VITE_API_URL || 'https://pixelix.onrender.com/api';
const cleanBaseUrl = rawApiUrl.replace(/\/+$/, '');
const normalizedApiUrl = cleanBaseUrl.endsWith('/api') ? cleanBaseUrl : `${cleanBaseUrl}/api`;

export const ENV = {
  API_URL: normalizedApiUrl,
  SITE_NAME: import.meta.env.VITE_SITE_NAME || 'Pixelix',
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://pixelix.co.in',
  IS_PRODUCTION: import.meta.env.PROD,
};
