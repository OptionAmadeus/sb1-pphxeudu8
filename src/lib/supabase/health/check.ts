import { supabase } from '../client';

interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  message: string;
  services: {
    database: boolean;
    auth: boolean;
    waitlist: boolean;
  };
  error?: string;
}

export async function checkSupabaseHealth(): Promise<HealthCheckResult> {
  const result: HealthCheckResult = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'All services operational',
    services: {
      database: false,
      auth: false,
      waitlist: false
    }
  };

  try {
    // Check database connection
    const { error: dbError } = await supabase
      .from('waitlist')
      .select('count')
      .limit(0);
    result.services.database = !dbError;

    // Check auth service
    const { error: authError } = await supabase.auth.getSession();
    result.services.auth = !authError;

    // Check waitlist functionality
    const { error: waitlistError } = await supabase
      .from('waitlist')
      .select('count');
    result.services.waitlist = !waitlistError;

    // Determine overall status
    const allHealthy = Object.values(result.services).every(Boolean);
    if (!allHealthy) {
      result.status = 'unhealthy';
      result.message = 'Some services are experiencing issues';
    }

    return result;
  } catch (error) {
    return {
      ...result,
      status: 'unhealthy',
      message: 'Service experiencing issues',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}