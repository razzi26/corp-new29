import { RequestHandler } from "express";
import * as fs from "fs";
import * as path from "path";

interface SitemapEntry {
  path: string;
  priority: number;
  changeFrequency: string;
}

interface RouteData {
  path: string;
  title: string;
  priority: number;
  changeFrequency: string;
  children?: RouteData[];
}

// Static routes definition
const staticRoutes: RouteData[] = [
  { path: "/", title: "Home", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", title: "About Us", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products", title: "Products", priority: 0.9, changeFrequency: "weekly" },
  {
    path: "/services",
    title: "Services",
    priority: 0.9,
    changeFrequency: "monthly",
    children: [
      { path: "/services/trainings-and-seminars", title: "Trainings & Seminars", priority: 0.8, changeFrequency: "monthly" },
      { path: "/services/validation-service", title: "Validation Service", priority: 0.8, changeFrequency: "monthly" },
      { path: "/services/commissioning-and-qualification", title: "Commissioning & Qualification", priority: 0.8, changeFrequency: "monthly" },
      { path: "/services/about", title: "Services About", priority: 0.7, changeFrequency: "monthly" },
      { path: "/services/seminars", title: "Seminars", priority: 0.7, changeFrequency: "monthly" },
      { path: "/services/brochures", title: "Brochures", priority: 0.7, changeFrequency: "monthly" },
    ],
  },
  {
    path: "/resources",
    title: "Resources",
    priority: 0.9,
    changeFrequency: "weekly",
    children: [
      { path: "/resources/articles", title: "Knowledge Hub", priority: 0.8, changeFrequency: "weekly" },
      { path: "/resources/videos", title: "Videos", priority: 0.8, changeFrequency: "weekly" },
      { path: "/resources/quizzes", title: "Quizzes", priority: 0.8, changeFrequency: "weekly" },
      { path: "/resources/podcasts", title: "Podcasts", priority: 0.7, changeFrequency: "monthly" },
      { path: "/resources/case-studies", title: "Case Studies", priority: 0.7, changeFrequency: "monthly" },
      { path: "/resources/faq", title: "FAQ", priority: 0.7, changeFrequency: "monthly" },
    ],
  },
  { path: "/news", title: "News", priority: 0.8, changeFrequency: "daily" },
  { path: "/contact", title: "Contact Us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sitemap", title: "Sitemap", priority: 0.5, changeFrequency: "weekly" },
];

// Flatten routes for XML output
function flattenRoutes(routes: RouteData[]): SitemapEntry[] {
  const flattened: SitemapEntry[] = [];

  const flatten = (routes: RouteData[]) => {
    for (const route of routes) {
      flattened.push({
        path: route.path,
        priority: route.priority,
        changeFrequency: route.changeFrequency,
      });
      if (route.children && route.children.length > 0) {
        flatten(route.children);
      }
    }
  };

  flatten(routes);
  return flattened;
}

// Load JSON data safely
function loadJsonFile(filename: string): any[] {
  try {
    const dataPath = path.join(process.cwd(), "public", "data", filename);
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
}

// Generate XML sitemap
function generateSitemapXml(baseUrl: string): string {
  const entries: SitemapEntry[] = flattenRoutes(staticRoutes);
  const products = loadJsonFile("products.json");
  const news = loadJsonFile("news-articles.json");
  const articles = loadJsonFile("knowledge-articles.json");
  const quizzes = loadJsonFile("quizzes.json");

  // Add dynamic routes
  if (Array.isArray(products)) {
    products.forEach((product: any) => {
      entries.push({
        path: `/products/${product.id}`,
        priority: 0.7,
        changeFrequency: "monthly",
      });
    });
  }

  if (Array.isArray(news)) {
    news.forEach((article: any) => {
      entries.push({
        path: article.slug,
        priority: 0.7,
        changeFrequency: "monthly",
      });
    });
  }

  if (Array.isArray(articles)) {
    articles.forEach((article: any) => {
      entries.push({
        path: article.slug,
        priority: 0.7,
        changeFrequency: "monthly",
      });
    });
  }

  if (Array.isArray(quizzes)) {
    quizzes.forEach((quiz: any) => {
      entries.push({
        path: `/resources/quizzes/${quiz.slug}`,
        priority: 0.6,
        changeFrequency: "monthly",
      });
    });
  }

  // Build XML
  const urlEntries = entries
    .map((entry) => {
      const url = baseUrl.replace(/\/$/, "") + entry.path;
      return `  <url>
    <loc>${escapeXml(url)}</loc>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Handler for /sitemap.xml
export const handleSitemap: RequestHandler = (req, res) => {
  const protocol = req.protocol || "https";
  const host = req.get("host") || "www.escolifesciences.com";
  const baseUrl = `${protocol}://${host}`;

  const xml = generateSitemapXml(baseUrl);

  res.type("application/xml");
  res.send(xml);
};

// Handler for /robots.txt (optional but good to have)
export const handleRobots: RequestHandler = (_req, res) => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.escolifesciences.com/sitemap.xml
`;
  res.type("text/plain");
  res.send(robotsTxt);
};
