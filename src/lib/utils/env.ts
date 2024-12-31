/**
 * Validates required environment variables
 * @throws {Error} If any required variables are missing
 */
export function validateEnvironment(): void {
  const required = [
    'VITE_API_URL',
    'VITE_INFURA_ID'
  ];

  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Checks if we're in development mode
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}

/**
 * Checks if we're in production mode
 */
export function isProduction(): boolean {
  return import.meta.env.PROD;
}

/**
 * Gets the current environment name
 */
export function getEnvironment(): string {
  return import.meta.env.MODE;
}