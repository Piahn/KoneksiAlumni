/**
 * API Wrapper untuk komunikasi ke Backend Express.js
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

async function request<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('supabase_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Terjadi kesalahan pada server.');
  }

  return json;
}

export const api = {
  // Health
  getHealth: () => request('/health'),

  // Alumni Directory
  getAlumni: (params?: { topic?: string; company?: string; q?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request(`/alumni${query ? `?${query}` : ''}`);
  },
  getAlumniById: (id: string) => request(`/alumni/${id}`),

  // Slots
  getSlots: (params?: { alumniId?: string; date?: string; type?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return request(`/slots${query ? `?${query}` : ''}`);
  },
  createSlot: (data: { session_type: string; start_time: string; end_time: string }) =>
    request('/slots', { method: 'POST', body: JSON.stringify(data) }),
  deleteSlot: (id: string) => request(`/slots/${id}`, { method: 'DELETE' }),

  // Bookings
  createBooking: (data: { slot_id: string; notes?: string; cv_file_path?: string }, idempotencyKey?: string) => {
    const headers: Record<string, string> = {};
    if (idempotencyKey) {
      headers['Idempotency-Key'] = idempotencyKey;
    }
    return request('/bookings', { method: 'POST', headers, body: JSON.stringify(data) });
  },
  getMyBookings: () => request('/bookings/my'),
  getBookingById: (id: string) => request(`/bookings/${id}`),
  cancelBooking: (id: string) => request(`/bookings/${id}/cancel`, { method: 'PATCH' }),
  completeBooking: (id: string) => request(`/bookings/${id}/complete`, { method: 'PATCH' }),

  // Reviews
  createReview: (data: { booking_id: string; rating: number; comment?: string }) =>
    request('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  getReviews: (alumniId: string) => request(`/reviews?alumniId=${alumniId}`),

  // Topics
  getTopics: () => request('/topics'),

  // Storage
  getUploadUrl: (data: { file_name: string; booking_id: string }) =>
    request('/storage/upload-url', { method: 'POST', body: JSON.stringify(data) }),
  getCvUrl: (bookingId: string) => request(`/storage/cv-url/${bookingId}`),
};
