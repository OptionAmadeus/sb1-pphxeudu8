export class NetworkError extends Error {
  constructor(
    message: string = 'A network error occurred',
    public details?: unknown
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}