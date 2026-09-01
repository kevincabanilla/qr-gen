import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  server: {
    open: false,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      // Always update the paths in tsconfig.app.json when updating this.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
