import { apiRequest } from './apiClient';
import { FALLBACK_SERVICES, FALLBACK_PROJECTS } from './serviceDataFallback';

export async function fetchServices(category = 'all') {
  const query = category && category !== 'all' ? `?category=${category}` : '';
  const result = await apiRequest(`/services${query}`);
  
  if (result.ok && result.data?.data) {
    return result.data.data;
  }
  
  // Return fallback if API fails
  if (category && category !== 'all') {
    return FALLBACK_SERVICES.filter(s => s.category === category);
  }
  return FALLBACK_SERVICES;
}

export async function fetchServiceBySlug(slug) {
  const result = await apiRequest(`/services/${slug}`);
  if (result.ok && result.data?.data) {
    return result.data.data;
  }
  return FALLBACK_SERVICES.find(s => s.slug === slug) || null;
}

export async function fetchProjects() {
  const result = await apiRequest('/projects');
  if (result.ok && result.data?.data) {
    return result.data.data;
  }
  return FALLBACK_PROJECTS;
}
