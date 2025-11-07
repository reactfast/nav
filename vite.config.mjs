import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "ReactFastNav",
      fileName: (format) => `realfastnav.${format}.js`,
      formats: ["es", "umd", "cjs"], // <- add cjs for backward compatibility
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@headlessui/react",
        "@heroicons/react",
        "react-icons",
        "next",
        "next/link"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@headlessui/react": "HeadlessUI",
          "@heroicons/react": "Heroicons",
          "react-icons": "ReactIcons",
          next: "Next",
          "next/link": "NextLink",
        },
      },
    },
  },
});
