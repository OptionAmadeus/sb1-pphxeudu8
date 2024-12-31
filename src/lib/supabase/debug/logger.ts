export const authLogger = {
  debug: (message: string, ...args: any[]) => {
    if (import.meta.env.DEV) {
      console.debug(`[Auth] ${message}`, ...args);
    }
  },
  
  error: (message: string, error?: unknown) => {
    console.error(`[Auth Error] ${message}`, error);
  },

  info: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.info(`[Auth] ${message}`, data || '');
    }
  }
};