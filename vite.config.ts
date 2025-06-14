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
        signin: resolve(__dirname, "auth/signin/index.html"),
        signup: resolve(__dirname, "auth/signup/index.html"),
        forgot: resolve(__dirname, "auth/forgot-password/index.html"),
        update: resolve(__dirname, "update/index.html"),
        add: resolve(__dirname, "add/index.html"),
        reset: resolve(__dirname, "auth/reset-password/index.html"),
        adduser: resolve(__dirname, "adduser/index.html"),
        deleteuser: resolve(__dirname, "deleteuser/index.html"),
        // example-page-directory: resolve(__dirname, 'path/to/page/index.html'),
      },
    },
  },
});
