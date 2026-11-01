import { apiRequest } from './apiClient';

export async function createEmployee({ name, email, password, domain, phone, employmentType = 'full_time', shiftHours = 8 }) {
  const result = await apiRequest('/owner/employees', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, domain, phone, employmentType, shiftHours })
  });

  return {
    ok: result.ok,
    message: result.data?.message || (result.ok ? 'Employee created' : 'Creation failed'),
    emailDelivered: result.data?.emailDelivered,
    simulatedEmail: result.data?.simulatedEmail,
    employee: result.data?.employee
  };
}

export async function fetchEmployees() {
  const result = await apiRequest('/owner/employees');
  if (result.ok && result.data) {
    return result.data.employees || [];
  }
  return [];
}

export async function updateEmployee(id, payload) {
  const result = await apiRequest(`/owner/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return {
    ok: result.ok,
    message: result.data?.message || (result.ok ? 'Updated' : 'Update failed')
  };
}

export async function deleteEmployee(id) {
  const result = await apiRequest(`/owner/employees/${id}`, {
    method: 'DELETE'
  });
  return { ok: result.ok, message: result.data?.message };
}

export async function fetchAllLeaves(status) {
  const endpoint = status ? `/owner/leaves?status=${status}` : '/owner/leaves';
  const result = await apiRequest(endpoint);
  if (result.ok && result.data) {
    return result.data.data || [];
  }
  return [];
}

export async function updateLeaveStatus(id, { status, reviewNotes }) {
  const result = await apiRequest(`/owner/leaves/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, reviewNotes })
  });

  return {
    ok: result.ok,
    message: result.data?.message || (result.ok ? 'Status updated' : 'Action failed'),
    emailDelivered: result.data?.emailDelivered,
    simulatedEmail: result.data?.simulatedEmail,
    leave: result.data?.leave
  };
}

export async function fetchDailyAttendance(date) {
  const endpoint = date ? `/owner/attendance/daily?date=${date}` : '/owner/attendance/daily';
  const result = await apiRequest(endpoint);
  if (result.ok && result.data) {
    return result.data;
  }
  return { summary: {}, oversight: [] };
}

export async function fetchCompanyAnalytics() {
  const result = await apiRequest('/owner/analytics');
  if (result.ok && result.data) {
    return result.data;
  }
  return null;
}

export async function fetchSiteInquiries(status) {
  const endpoint = status ? `/owner/site/inquiries?status=${status}` : '/owner/site/inquiries';
  const result = await apiRequest(endpoint);
  if (result.ok && result.data) {
    return result.data.data || [];
  }
  return [];
}

export async function updateInquiryStatus(id, { status, notes }) {
  const result = await apiRequest(`/owner/site/inquiries/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status, notes })
  });
  return { ok: result.ok, message: result.data?.message };
}

export async function deleteInquiry(id) {
  const result = await apiRequest(`/owner/site/inquiries/${id}`, {
    method: 'DELETE'
  });
  return { ok: result.ok };
}

/* ========================================================
   MODULE 1: REAL ESTATE CALCULATOR CONFIGURATION
   ======================================================== */
export async function fetchCalculatorConfig() {
  const result = await apiRequest('/real-estate/calculator/config');
  if (result.ok && result.data) return result.data.config;
  return null;
}

export async function updateCalculatorConfig(payload) {
  const result = await apiRequest('/real-estate/calculator/config', {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return { ok: result.ok, message: result.data?.message || 'Calculator updated', config: result.data?.config };
}

/* ========================================================
   MODULE 2: 3D PROPERTY TOURS & SHOWCASES
   ======================================================== */
export async function fetchAdminShowcases() {
  const result = await apiRequest('/real-estate/showcases');
  if (result.ok && result.data) return result.data.showcases || [];
  return [];
}

export async function createAdminShowcase(payload) {
  const result = await apiRequest('/real-estate/showcases', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return { ok: result.ok, message: result.data?.message || 'Showcase created', showcase: result.data?.showcase };
}

export async function updateAdminShowcase(id, payload) {
  const result = await apiRequest(`/real-estate/showcases/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return { ok: result.ok, message: result.data?.message || 'Showcase updated' };
}

export async function deleteAdminShowcase(id) {
  const result = await apiRequest(`/real-estate/showcases/${id}`, {
    method: 'DELETE'
  });
  return { ok: result.ok, message: result.data?.message };
}

/* ========================================================
   MODULE 3: DIGITAL ADVERTISING SERVICES & PACKAGES
   ======================================================== */
export async function fetchAdminAdServices() {
  const result = await apiRequest('/advertising/services');
  if (result.ok && result.data) return result.data.services || [];
  return [];
}

export async function createAdminAdService(payload) {
  const result = await apiRequest('/advertising/services', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return { ok: result.ok, message: result.data?.message };
}

export async function updateAdminAdService(id, payload) {
  const result = await apiRequest(`/advertising/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return { ok: result.ok, message: result.data?.message };
}

export async function deleteAdminAdService(id) {
  const result = await apiRequest(`/advertising/services/${id}`, {
    method: 'DELETE'
  });
  return { ok: result.ok, message: result.data?.message };
}

/* ========================================================
   MODULE 4: CHATBOT & WHATSAPP CONFIGURATION
   ======================================================== */
export async function fetchAdminChatbotConfig() {
  const result = await apiRequest('/chatbot/config');
  if (result.ok && result.data) return result.data.config;
  return null;
}

export async function updateAdminChatbotConfig(payload) {
  const result = await apiRequest('/chatbot/config', {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return { ok: result.ok, message: result.data?.message };
}

/* ========================================================
   MODULE 5: CENTRALIZED SERVICE LEADS CRM
   ======================================================== */
export async function fetchAdminLeads({ status = 'all', service = 'all', search = '', page = 1, limit = 25 } = {}) {
  const params = new URLSearchParams({ status, service, search, page: String(page), limit: String(limit) });
  const result = await apiRequest(`/leads?${params.toString()}`);
  if (result.ok && result.data) return result.data;
  return { leads: [], summary: {}, pagination: {} };
}

export async function updateAdminLeadStatus(id, { status, assignedTo }) {
  const result = await apiRequest(`/leads/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, assignedTo })
  });
  return { ok: result.ok, message: result.data?.message };
}

export async function addAdminLeadNote(id, text) {
  const result = await apiRequest(`/leads/${id}/notes`, {
    method: 'POST',
    body: JSON.stringify({ text })
  });
  return { ok: result.ok, message: result.data?.message };
}

export async function deleteAdminLead(id) {
  const result = await apiRequest(`/leads/${id}`, {
    method: 'DELETE'
  });
  return { ok: result.ok, message: result.data?.message };
}


