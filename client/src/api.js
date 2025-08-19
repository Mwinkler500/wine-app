// client/src/api.js
// Uses CRA-style env var. Make sure client/.env has:
// REACT_APP_API_URL=https://wine-app-vs2b.onrender.com
const BASE = process.env.REACT_APP_API_URL;

if (!BASE) {
  throw new Error(
    'REACT_APP_API_URL is not set. In client/.env add:\nREACT_APP_API_URL=https://wine-app-vs2b.onrender.com\nThen stop and restart `npm start`.'
  );
}

/**
 * GET /api/wines
 * Returns an array of wines.
 */
export async function listWines() {
  const url = `${BASE}/api/wines`;
  const res = await fetch(url, { credentials: 'omit' });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GET ${url} failed: ${res.status} ${text.slice(0, 200)}`);
  }
  return res.json();
}

/**
 * POST /api/wines
 * Body: { name, region, notes }
 * Returns the created wine.
 */
export async function createWine({ name, region, notes }) {
  const url = `${BASE}/api/wines`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    body: JSON.stringify({ name, region, notes }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`POST ${url} failed: ${res.status} ${text.slice(0, 200)}`);
  }
  return res.json();
}
