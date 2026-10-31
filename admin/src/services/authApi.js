import { apiRequest } from './apiClient';

const TOKEN_KEY = 'pixelix_auth_token';
const USER_KEY = 'pixelix_auth_user';

export async function loginUser(email, password) {
  const result = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  if (result.ok && result.data && result.data.token) {
    localStorage.setItem(TOKEN_KEY, result.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(result.data.user));
    return { success: true, user: result.data.user, token: result.data.token };
  }

  return {
    success: false,
    message: result.data?.message || result.error || 'Authentication failed. Please check credentials.'
  };
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function verifySession() {
  const token = getStoredToken();
  if (!token) return null;

  const res = await apiRequest('/auth/me');
  if (res.ok && res.data?.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
    return res.data.user;
  }
  logoutUser();
  return null;
}

