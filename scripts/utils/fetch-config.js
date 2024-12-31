import fetch from 'cross-fetch';

export const fetchConfig = {
  fetch: fetch,
  headers: { 'Content-Type': 'application/json' },
  // Increase timeout for slower connections
  timeout: 10000
};