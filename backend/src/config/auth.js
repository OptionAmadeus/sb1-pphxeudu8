export const AUTH_CONFIG = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    algorithm: 'HS256'
  },
  
  password: {
    saltRounds: 12
  },
  
  tokenTypes: {
    ACCESS: 'access',
    REFRESH: 'refresh'
  }
};