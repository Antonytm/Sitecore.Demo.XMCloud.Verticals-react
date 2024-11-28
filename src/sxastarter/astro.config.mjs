// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";

const reactConfig = {
  babel: {
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "classic",
        },
      ],
    ],
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  },
};

export default defineConfig({
  integrations: [react(reactConfig)],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  security: {
    checkOrigin: false,
  },
  server: {
    port: 3000,
  },
});
