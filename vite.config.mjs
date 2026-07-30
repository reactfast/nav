import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "ReactFastNav",
      fileName: (format) => `realfastnav.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: (id) => {
        if (
          id === "react" ||
          id === "react-dom" ||
          id === "react/jsx-runtime" ||
          id === "react/jsx-dev-runtime" ||
          id.startsWith("react/") ||
          id.startsWith("react-dom/")
        ) {
          return true;
        }
        if (
          id === "next/link" ||
          id === "next/navigation" ||
          id.startsWith("next/")
        ) {
          return true;
        }
        if (
          id === "@headlessui/react" ||
          id.startsWith("@headlessui/react/") ||
          id === "@heroicons/react" ||
          id.startsWith("@heroicons/react/") ||
          id.startsWith("react-icons/")
        ) {
          return true;
        }
        return false;
      },
      output: [
        {
          format: "es",
          entryFileNames: "realfastnav.es.js",
          exports: "named",
          banner: "'use client';",
        },
        {
          format: "cjs",
          entryFileNames: "realfastnav.cjs.js",
          exports: "named",
          banner: "'use client';",
        },
        {
          format: "umd",
          name: "ReactFastNav",
          entryFileNames: "realfastnav.umd.js",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      ],
    },
  },
});
