import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Pages()],
  resolve: {
    alias: {
      "~@ibm/plex": path.resolve(__dirname, "./node_modules/@ibm/plex"),
    },
  },
});
