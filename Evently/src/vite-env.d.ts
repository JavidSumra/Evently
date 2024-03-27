/// <reference types="vite/client" />
interface ImportMetaEnv {
  [x: string]: any;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_SENTRY_DNS: string;
  readonly VTE_SENTRY_AUTH_TOKEN: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
