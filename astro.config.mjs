// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  build: {
    // FIX: Resolves "Render Blocking CSS" by putting styles in the HTML <head>
    inlineStylesheets: "always",
  },
  adapter: node({
    mode: "standalone",
  }),
  // IMAGE OPTIMIZATION: Configured for Railway (Sharp) + Local DDEV
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    remotePatterns: [
      // Production: Cloudflare R2
      {
        protocol: "https",
        hostname: "pub-cdfac212319d4c7288df0a72323cd4a6.r2.dev",
      },
      // Local Development: DDEV Backend (Allowing both http and https)
      {
        protocol: "http",
        hostname: "chefpaws-backend.ddev.site",
      },
      {
        protocol: "https",
        hostname: "chefpaws-backend.ddev.site",
      },
    ],
    // Domains list for broader compatibility across different Astro versions
    domains: [
      "pub-cdfac212319d4c7288df0a72323cd4a6.r2.dev",
      "chefpaws-backend.ddev.site",
    ],
  },
  // BUNDLING & PERFORMANCE
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Fixes the Critical Request Chain and groups node_modules into a vendor bundle
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  },
  integrations: [svelte()],
});
