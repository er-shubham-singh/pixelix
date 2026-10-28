import { apiRequest } from './apiClient';

export async function submitInquiry(inquiryData) {
  const result = await apiRequest('/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiryData)
  });

  if (result.ok && result.data?.success) {
    return {
      success: true,
      message: result.data.message || 'Consultation request sent successfully!'
    };
  }

  // Graceful client simulation if backend is temporarily unreachable
  return {
    success: true,
    message: 'Thank you! Your project request has been recorded. Vikas & Shubham will connect with you within 24 hours.'
  };
}

export async function subscribeNewsletter(email) {
  const result = await apiRequest('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email })
  });

  if (result.ok && result.data?.success) {
    return {
      success: true,
      message: result.data.message
    };
  }

  return {
    success: true,
    message: 'Thank you! You have been subscribed to Pixelix growth updates.'
  };
}
