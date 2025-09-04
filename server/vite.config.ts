import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    target: "node23",
    lib: {
      entry: "src/server.ts",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["pg", "fastify"]
    },
    ssr: true
  }
});
