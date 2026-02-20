// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node"; // 1. Import the adapter

// https://astro.build/config
export default defineConfig({
  output: "server", // 2. Enable SSR
  adapter: node({
    mode: "standalone", // 3. Configure for Railway/Node environment
  }),
  integrations: [svelte()],
});
