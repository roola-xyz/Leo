import { defineConfig } from "vite";

import path from "path";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/*
 * Applications in the monorepo consume the source directly — package.json's
 * exports point at src/ — so this build is for publishing the package outside
 * it. React is external: the application that mounts these owns the copy.
 */
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      entryRoot: "src",
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      name: "Leo",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
      entry: path.resolve(__dirname, "./src/index.ts"),
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
