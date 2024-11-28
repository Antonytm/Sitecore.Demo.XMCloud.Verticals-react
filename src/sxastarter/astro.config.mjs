// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  outDir: "./dist",
  security: {
    checkOrigin: false,
  },
  server: {
    port: 3000,
  },
});
