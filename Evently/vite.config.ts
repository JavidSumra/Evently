import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import Dotenv from "dotenv-webpack";

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    build: {
      outDir: "build",
      sourcemap: true,
    },
    plugins: [
      new Dotenv({
        systemvars: true,
      }),
      sentryVitePlugin({
        org: "javid-5o",
        project: "javascript-react",
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
      }),
      react(),
      VitePWA({
        devOptions: {
          enabled: true, // For making sure that the PWA is testable from the Local dev environment
        },
        manifest: {
          name: "Evently",
          short_name: "Evently",
          icons: [
            {
              src: "/favicon.ico",
              sizes: "64x64 32x32 24x24 16x16",
              type: "image/x-icon",
            },
            {
              src: "/favicon-16x16.png",
              type: "image/png",
              sizes: "16x16",
            },
            {
              src: "/favicon-32x32.png",
              type: "image/png",
              sizes: "32x32",
            },
            {
              src: "/pwa-192x192.png",
              type: "image/png",
              sizes: "192x192",
            },
            {
              src: "/pwa-512x512.png",
              type: "image/png",
              sizes: "512x512",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
      "process.env.VITE_API_ENDPOINT": process.env.VITE_API_ENDPOINT,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
