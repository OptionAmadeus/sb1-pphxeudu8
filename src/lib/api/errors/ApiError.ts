export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(response: any): ApiError {
    return new ApiError(
      response.data?.message || 'An unexpected error occurred',
      response.status,
      response.data?.code,
      response.data?.details
    );
  }
}