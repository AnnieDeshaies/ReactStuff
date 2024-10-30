import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { coverageConfigDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.test.tsx", "**/*.test.ts"],
    coverage: {
      include: ["**/*.tsx", "**/*.ts"],
      exclude: [...coverageConfigDefaults.exclude, "**/*/index.ts"],
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
  },
});
