import { ENV } from '../config/env';

export async function apiRequest(endpoint, options = {}) {
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${ENV.API_URL}${formattedEndpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (err) {
    console.warn(`API request to ${url} failed, using local handling:`, err.message);
    return { ok: false, error: err.message };
  }
}
