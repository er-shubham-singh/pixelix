export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || '/api',
  SITE_NAME: import.meta.env.VITE_SITE_NAME || 'Pixelix',
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://pixelix.co.in',
  IS_PRODUCTION: import.meta.env.PROD,
};
