export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[${new Date().toISOString()}] INFO: ${message}`, data || '');
  },
  
  error: (message: string, error?: any) => {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`, error || '');
  }
};