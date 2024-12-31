export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}