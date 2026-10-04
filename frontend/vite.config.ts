import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
// NOTE: lovable-tagger is imported lazily so production builds never load it
// (its dependency tree requires Node 22+, which would break CI/static builds).
export default defineConfig(async ({ mode }) => ({
  // Relative base so the built app works from ANY path: GitHub Pages
  // subpaths (/<repo>/), Vercel/Netlify/Cloudflare root domains, or a
  // custom domain — no per-host config changes needed.
  base: mode === 'production' ? './' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    (await import("lovable-tagger")).componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
