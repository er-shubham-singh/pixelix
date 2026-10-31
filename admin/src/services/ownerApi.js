import { apiRequest } from './apiClient';

export async function createEmployee({ name, email, password, domain, phone }) {
  const result = await apiRequest('/owner/employees', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, domain, phone })
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

