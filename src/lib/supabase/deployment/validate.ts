import { deploymentConfigSchema, type DeploymentConfig } from './config';

export function validateDeploymentConfig(config: unknown): DeploymentConfig {
  return deploymentConfigSchema.parse(config);
}

export function validateEnvironment(): void {
  if (!process.env.SUPABASE_ACCESS_TOKEN) {
    throw new Error('Missing SUPABASE_ACCESS_TOKEN environment variable');
  }
}