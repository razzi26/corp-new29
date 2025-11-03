import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin(), configInjectionPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}

function configInjectionPlugin(): Plugin {
  return {
    name: "config-injection",
    transformIndexHtml(html) {
      // Read the config file
      const configPath = path.resolve(__dirname, "./client/config/config.ts");
      const configContent = fs.readFileSync(configPath, "utf-8");

      // Extract siteName value using regex
      const siteNameMatch = configContent.match(/siteName:\s*["']([^"']+)["']/);
      const siteName = siteNameMatch
        ? siteNameMatch[1]
        : "Esco Cell Culture Institute";

      // Replace placeholder in HTML
      return html.replace(/__SITE_NAME__/g, siteName);
    },
  };
}
