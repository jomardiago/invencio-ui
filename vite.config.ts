/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Pages()],
  resolve: {
    alias: {
      "~@ibm/plex": path.resolve(__dirname, "./node_modules/@ibm/plex"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      provider: "istanbul", // or 'v8',
      exclude: [
        ...configDefaults.exclude,
        "src/pages/**",
        "src/tests/**",
        ".eslintrc.cjs",
      ],
    },
  },
});
