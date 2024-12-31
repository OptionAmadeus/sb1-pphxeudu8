export interface OAuthState {
  state: string;
  returnUrl: string;
  timestamp: number;
}

export interface OAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}