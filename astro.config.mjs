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
  // FIX: Moves image optimization to the top level for Railway + Sharp
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-cdfac212319d4c7288df0a72323cd4a6.r2.dev",
      },
    ],
    domains: ["pub-cdfac212319d4c7288df0a72323cd4a6.r2.dev"],
  },
  // FIX: Resolves "Critical Request Chaining" by bundling tiny Svelte/JS files together
  vite: {
    build: {
      rollupOptions: {
        output: {
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
