import { z } from 'zod';

export const deploymentConfigSchema = z.object({
  projectRef: z.string().min(1, 'Project ref is required'),
  accessToken: z.string().min(1, 'Access token is required')
});

export type DeploymentConfig = z.infer<typeof deploymentConfigSchema>;

export const DEPLOYMENT_CONFIG = {
  projectRef: 'jrtnypbsfgxfacytsddy',
  accessToken: process.env.SUPABASE_ACCESS_TOKEN
} as const;