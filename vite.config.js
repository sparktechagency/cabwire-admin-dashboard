import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
 
export default defineConfig({
  plugins: [react()],
  server: {
    host: "31.97.98.240",
    // port: 4174,
  },
  build: {
    sourcemap: false,  // disables source maps for production
    minify: "esbuild", // faster minifier
  },
});  