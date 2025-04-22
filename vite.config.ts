import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contact: resolve(__dirname, "contact/index.html"),
        events: resolve(__dirname, "events/index.html"),
        members: resolve(__dirname, "members/index.html"),
        signin: resolve(__dirname, "signin/index.html"),
        signup: resolve(__dirname, "signup/index.html"),
        forgot: resolve(__dirname, "forgot-password/index.html"),
        // example-page-directory: resolve(__dirname, 'path/to/page/index.html'),
      },
    },
  },
});
