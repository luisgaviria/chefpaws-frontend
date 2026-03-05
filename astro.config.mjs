// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  build: {
    inlineStylesheets: "always", // This fixes the "Render Blocking CSS" error
  },
  adapter: node({
    mode: "standalone",
  }),
  // FIX: Move image configuration to the TOP LEVEL
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
  integrations: [svelte()],
});
