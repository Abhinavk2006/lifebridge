// apiClient.ts — Centralized HTTP client wrapper with auth header injection and generic error handling.
const BASE_URL =
  typeof window === 'undefined'
    ? (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000')
    : (process.env.NEXT_PUBLIC_API_URL || '');

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Request Failed: ${response.status}`);
  }

  return response.json();
}
