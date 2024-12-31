import { z } from 'zod';

export const TokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  token_type: z.string()
});

export type TokenResponse = z.infer<typeof TokenResponseSchema>;

export function validateTokenResponse(data: unknown): TokenResponse {
  return TokenResponseSchema.parse(data);
}

export function validateRedirectUri(uri: string): boolean {
  try {
    const url = new URL(uri);
    return url.pathname === '/auth/callback';
  } catch {
    return false;
  }
}