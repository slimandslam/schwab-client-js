// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/stream": "http://localhost:5000", // Proxy API requests to the Express server
    },
  },
});
