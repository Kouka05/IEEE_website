const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }

  return value;
};

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4004");
export const MONGO_URI = getEnv("MONGO_URI", "mongodb://localhost:27017/ieee-dev-db");
export const APP_ORIGIN = getEnv("APP_ORIGIN", "http://localhost:8081");
export const JWT_SECRET = getEnv("JWT_SECRET", "changeme");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET", "changeme-refresh");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER", "noreply@example.com");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY", "");