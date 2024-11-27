import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirect API requests to the backend server
      "/v1/auth": {
        target: "http://localhost:5000", // Your backend server
        changeOrigin: true, // Needed for some virtual hosted sites
        rewrite: (path) => path.replace(/^\/v1\/auth/, "/v1/auth"), // Optional: Adjust the path if needed
      },
    },
  },
});
