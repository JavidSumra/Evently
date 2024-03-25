export const API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3008/api/v1"
    : "https://evently-backend-jiec.onrender.com/api/v1";
export const SENTRY_DNS = import.meta.env.VITE_SENTRY_DNS;
export const SENTRY_AUTH_TOKEN = import.meta.env.VTE_SENTRY_AUTH_TOKEN;
