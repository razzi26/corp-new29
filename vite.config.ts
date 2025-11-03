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
      // Read the site JSON file
      const siteJsonPath = path.resolve(
        __dirname,
        "./client/config/data/site.json",
      );
      let siteName = "Esco Cell Culture Institute";
      try {
        const siteJson = JSON.parse(fs.readFileSync(siteJsonPath, "utf-8"));
        if (siteJson && siteJson.siteName) siteName = siteJson.siteName;
      } catch (e) {
        // fallback to default
      }

      // Replace placeholder in HTML
      return html.replace(/__SITE_NAME__/g, siteName);
    },
  };
}
