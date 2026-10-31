const rawApiUrl = import.meta.env.VITE_API_URL || 'https://pixelix.onrender.com/api';
const cleanBaseUrl = rawApiUrl.replace(/\/+$/, '');
const normalizedApiUrl = cleanBaseUrl.endsWith('/api') ? cleanBaseUrl : `${cleanBaseUrl}/api`;

export const ENV = {
  API_URL: normalizedApiUrl,
  SITE_NAME: import.meta.env.VITE_SITE_NAME || 'Pixelix Owner & Admin Control',
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://owner.pixelix.co.in',
  MAIN_SITE_URL: import.meta.env.VITE_MAIN_SITE_URL || 'https://pixelix.co.in',
  EMPLOYEE_SITE_URL: import.meta.env.VITE_EMPLOYEE_SITE_URL || 'https://employee.pixelix.co.in',
  IS_PRODUCTION: import.meta.env.PROD,
};

