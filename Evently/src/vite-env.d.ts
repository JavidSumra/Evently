/// <reference types="vite/client" />

interface ImportMetaEnv {
  [x: string]: any;
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_SENTRY_DNS: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
