import { siteConfig } from "./config";

export interface SitemapRoute {
  path: string;
  title: string;
  description?: string;
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  lastModified?: string;
  children?: SitemapRoute[];
}

export interface DynamicRouteData {
  path: string;
  title: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

// Static routes
export const staticRoutes: SitemapRoute[] = [
  {
    path: "/",
    title: "Home",
    description: siteConfig.description,
    priority: 1.0,
    changeFrequency: "weekly",
  },
  {
    path: "/about",
    title: "About Us",
    description: "Learn about Esco Cell Culture Institute and our mission",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  // {
  //   path: "/products",
  //   title: "Products",
  //   description: "Browse our comprehensive catalog of biosafety products",
  //   priority: 0.9,
  //   changeFrequency: "weekly",
  //   children: [], // Will be populated with dynamic product routes
  // },
  {
    path: "/services",
    title: "Services",
    description: "Explore our professional services and training programs",
    priority: 0.9,
    changeFrequency: "monthly",
    children: [
      {
        path: "/services/trainings-and-seminars",
        title: "Trainings & Seminars",
        priority: 0.8,
        changeFrequency: "monthly",
      },
      {
        path: "/services/validation-service",
        title: "Validation Service",
        priority: 0.8,
        changeFrequency: "monthly",
      },
      {
        path: "/services/commissioning-and-qualification",
        title: "Commissioning & Qualification",
        priority: 0.8,
        changeFrequency: "monthly",
      },
      {
        path: "/services/about",
        title: "Services About",
        priority: 0.7,
        changeFrequency: "monthly",
      },
      {
        path: "/services/seminars",
        title: "Seminars",
        priority: 0.7,
        changeFrequency: "monthly",
      },
      {
        path: "/services/brochures",
        title: "Brochures",
        priority: 0.7,
        changeFrequency: "monthly",
      },
    ],
  },
  {
    path: "/resources",
    title: "Resources",
    description: "Access training materials, articles, videos, and more",
    priority: 0.9,
    changeFrequency: "weekly",
    children: [
      {
        path: "/resources/articles",
        title: "Knowledge Hub",
        priority: 0.8,
        changeFrequency: "weekly",
        children: [], // Will be populated with dynamic article routes
      },
      {
        path: "/resources/videos",
        title: "Videos",
        priority: 0.8,
        changeFrequency: "weekly",
      },
      {
        path: "/resources/quizzes",
        title: "Quizzes",
        priority: 0.8,
        changeFrequency: "weekly",
        children: [], // Will be populated with dynamic quiz routes
      },
      {
        path: "/resources/podcasts",
        title: "Podcasts",
        priority: 0.7,
        changeFrequency: "monthly",
      },
      {
        path: "/resources/case-studies",
        title: "Case Studies",
        priority: 0.7,
        changeFrequency: "monthly",
      },
      {
        path: "/resources/faq",
        title: "FAQ",
        priority: 0.7,
        changeFrequency: "monthly",
      },
    ],
  },
  {
    path: "/news",
    title: "News",
    description: "Latest news and updates from Esco Cell Culture Institute",
    priority: 0.8,
    changeFrequency: "daily",
    children: [], // Will be populated with dynamic news routes
  },
  {
    path: "/contact",
    title: "Contact Us",
    description: "Get in touch with our team",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/sitemap",
    title: "Sitemap",
    description: "Visual sitemap of all pages",
    priority: 0.5,
    changeFrequency: "weekly",
  },
];

// Functions to fetch and populate dynamic routes
// export async function fetchDynamicProducts(): Promise<DynamicRouteData[]> {
//   try {
//     const response = await fetch("/data/products.json");
//     if (!response.ok) throw new Error("Failed to fetch products");
//     const products = await response.json();
//     return products.map((product: any) => ({
//       path: `/products/${product.id}`,
//       title: product.title,
//       priority: 0.7,
//       changeFrequency: "monthly" as const,
//     }));
//   } catch (error) {
//     console.error("Error fetching products for sitemap:", error);
//     return [];
//   }
// }

export async function fetchDynamicNews(): Promise<DynamicRouteData[]> {
  try {
    const url = new URL(
      "/data/news-articles.json",
      typeof window !== "undefined" ? window.location.origin : "/",
    );
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Failed to fetch news");
    const articles = await response.json();
    return articles.map((article: any) => ({
      path: article.slug,
      title: article.title,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
    return [];
  }
}

export async function fetchDynamicArticles(): Promise<DynamicRouteData[]> {
  try {
    const url = new URL(
      "/data/knowledge-articles.json",
      typeof window !== "undefined" ? window.location.origin : "/",
    );
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Failed to fetch articles");
    const articles = await response.json();
    return articles.map((article: any) => ({
      path: article.slug,
      title: article.title,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));
  } catch (error) {
    console.error("Error fetching articles for sitemap:", error);
    return [];
  }
}

export async function fetchDynamicQuizzes(): Promise<DynamicRouteData[]> {
  try {
    const url = new URL(
      "/data/quizzes.json",
      typeof window !== "undefined" ? window.location.origin : "/",
    );
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Failed to fetch quizzes");
    const quizzes = await response.json();
    return quizzes.map((quiz: any) => ({
      path: `/resources/quizzes/${quiz.slug}`,
      title: quiz.title,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    }));
  } catch (error) {
    console.error("Error fetching quizzes for sitemap:", error);
    return [];
  }
}

// Build complete sitemap with all routes
export async function buildCompleteSitemap(): Promise<SitemapRoute[]> {
  const routes = JSON.parse(JSON.stringify(staticRoutes)) as SitemapRoute[];

  // Fetch all dynamic data in parallel
  const [, news, articles, quizzes] = await Promise.all([
    // fetchDynamicProducts(),
    Promise.resolve([]),
    fetchDynamicNews(),
    fetchDynamicArticles(),
    fetchDynamicQuizzes(),
  ]);

  // Populate dynamic routes into the sitemap tree
  const findRoute = (
    routes: SitemapRoute[],
    path: string,
  ): SitemapRoute | undefined => {
    for (const route of routes) {
      if (route.path === path) return route;
      if (route.children) {
        const found = findRoute(route.children, path);
        if (found) return found;
      }
    }
    return undefined;
  };

  // Add products
  // const productsRoute = findRoute(routes, "/products");
  // if (productsRoute && products.length > 0) {
  //   productsRoute.children = products.map((p) => ({
  //     path: p.path,
  //     title: p.title,
  //     priority: p.priority,
  //     changeFrequency: p.changeFrequency,
  //   }));
  // }

  // Add news articles
  const newsRoute = findRoute(routes, "/news");
  if (newsRoute && news.length > 0) {
    newsRoute.children = news.map((n) => ({
      path: n.path,
      title: n.title,
      priority: n.priority,
      changeFrequency: n.changeFrequency,
    }));
  }

  // Add knowledge articles
  const articlesRoute = findRoute(routes, "/resources/articles");
  if (articlesRoute && articles.length > 0) {
    articlesRoute.children = articles.map((a) => ({
      path: a.path,
      title: a.title,
      priority: a.priority,
      changeFrequency: a.changeFrequency,
    }));
  }

  // Add quizzes
  const quizzesRoute = findRoute(routes, "/resources/quizzes");
  if (quizzesRoute && quizzes.length > 0) {
    quizzesRoute.children = quizzes.map((q) => ({
      path: q.path,
      title: q.title,
      priority: q.priority,
      changeFrequency: q.changeFrequency,
    }));
  }

  return routes;
}

// Flatten sitemap to array for easier processing
export function flattenSitemap(routes: SitemapRoute[]): SitemapRoute[] {
  const flattened: SitemapRoute[] = [];

  const flatten = (routes: SitemapRoute[]) => {
    for (const route of routes) {
      flattened.push(route);
      if (route.children && route.children.length > 0) {
        flatten(route.children);
      }
    }
  };

  flatten(routes);
  return flattened;
}

// Get site base URL (for XML sitemap generation)
export function getSiteBaseURL(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://www.escolifesciences.com";
}
