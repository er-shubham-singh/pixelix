function sanitizeApiUrl(raw) {
  const fallback = 'https://pixelix.onrender.com/api';
  if (!raw || typeof raw !== 'string') {
    return fallback;
  }

  let cleaned = raw.trim();

  // 1. Remove leading "VITE_API_URL=" if the user mistakenly pasted the key into the Vercel Value field
  cleaned = cleaned.replace(/^VITE_API_URL\s*=\s*/i, '');

  // 2. Remove surrounding single or double quotes
  cleaned = cleaned.replace(/^['"]+|['"]+$/g, '').trim();

  // 3. Fix malformed protocol like "https:/" or "http:/" (single slash)
  cleaned = cleaned.replace(/^https?:\/+(?!\/)/i, (match) => {
    return match.toLowerCase().startsWith('https') ? 'https://' : 'http://';
  });

  // 4. If protocol is missing, add https:// (or http:// for localhost)
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    if (cleaned.startsWith('localhost') || cleaned.startsWith('127.0.0.1')) {
      cleaned = `http://${cleaned}`;
    } else {
      cleaned = `https://${cleaned}`;
    }
  }

  // 5. In production on a public domain, NEVER call localhost
  if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    if (cleaned.includes('localhost') || cleaned.includes('127.0.0.1')) {
      cleaned = fallback;
    }
  }

  // 6. Strip trailing slashes
  cleaned = cleaned.replace(/\/+$/, '');

  // 7. Ensure it ends with /api
  if (!cleaned.endsWith('/api')) {
    cleaned = `${cleaned}/api`;
  }

  return cleaned;
}

const rawApiUrl = import.meta.env.VITE_API_URL || 'https://pixelix.onrender.com/api';

export const ENV = {
  API_URL: sanitizeApiUrl(rawApiUrl),
  SITE_NAME: import.meta.env.VITE_SITE_NAME || 'Pixelix',
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://pixelix.co.in',
  IS_PRODUCTION: import.meta.env.PROD,
};
