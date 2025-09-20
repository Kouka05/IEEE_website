export const getApiBaseUrl = (): string => {
  const envBase = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  if (envBase && envBase.trim().length > 0) return envBase.replace(/\/$/, '');
  const { protocol, hostname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8081';
  }
  return `${protocol}//${hostname}`;
};


