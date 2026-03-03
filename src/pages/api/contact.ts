import type { APIRoute } from 'astro';

// Proxy to the Go backend so the client never talks to it directly.
// This keeps the GO_API_URL server-side only (not exposed to the browser).
export const POST: APIRoute = async ({ request }) => {
  const goApiUrl = import.meta.env.GO_API_URL ?? 'http://localhost:8080';

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let goResp: Response;
  try {
    goResp = await fetch(`${goApiUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('Go API unreachable:', err);
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await goResp.json();
  return new Response(JSON.stringify(data), {
    status: goResp.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
