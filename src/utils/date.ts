export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function isStale(lastUpdate: Date, intervalMs: number): boolean {
  return Date.now() - lastUpdate.getTime() > intervalMs;
}