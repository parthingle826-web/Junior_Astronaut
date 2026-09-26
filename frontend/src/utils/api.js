/**
 * Safe fetch utility with content-type verification and fallback handling.
 * Prevents "Unexpected token 'T', 'The page cannot be found' is not valid JSON" crashes.
 */

export async function safeFetchJson(url, options = {}, fallback = null) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      console.warn(`[API] Endpoint ${url} returned status ${res.status}. Using fallback.`);
      return fallback;
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.warn(`[API] Endpoint ${url} returned non-JSON content-type: ${contentType}. Using fallback.`);
      return fallback;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API] Request to ${url} failed (${err.message}). Using fallback.`);
    return fallback;
  }
}
