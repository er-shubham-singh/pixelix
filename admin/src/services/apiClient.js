import { ENV } from '../config/env';

export async function apiRequest(endpoint, options = {}) {
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const token = localStorage.getItem('pixelix_auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  const primaryUrl = `${ENV.API_URL}${formattedEndpoint}`;

  try {
    const response = await fetch(primaryUrl, config);
    const data = await response.json().catch(() => null);

    if (response.ok) {
      return { ok: true, status: response.status, data };
    }

    if (window.location.hostname === 'localhost' && !ENV.API_URL.includes('localhost:5000') && (response.status === 404 || response.status >= 500)) {
      try {
        const localUrl = `http://localhost:5000/api${formattedEndpoint}`;
        const localRes = await fetch(localUrl, config);
        const localData = await localRes.json().catch(() => null);
        return { ok: localRes.ok, status: localRes.status, data: localData };
      } catch (e) {}
    }

    return { ok: false, status: response.status, data };
  } catch (err) {
    if (window.location.hostname === 'localhost' && !ENV.API_URL.includes('localhost:5000')) {
      try {
        const localUrl = `http://localhost:5000/api${formattedEndpoint}`;
        const localRes = await fetch(localUrl, config);
        const localData = await localRes.json().catch(() => null);
        return { ok: localRes.ok, status: localRes.status, data: localData };
      } catch (e) {}
    }

    console.warn(`API request to ${primaryUrl} failed:`, err.message);
    return { ok: false, error: err.message };
  }
}

