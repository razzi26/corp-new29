import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { buildCompleteSitemap, SitemapRoute } from "@/config/sitemapConfig";
import { PageBanner } from "@/components/layout/PageBanner";

interface SitemapItemProps {
  route: SitemapRoute;
  level: number;
}

const SitemapItem: React.FC<SitemapItemProps> = ({ route, level }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = route.children && route.children.length > 0;

  return (
    <div className="border-l border-slate-200">
      <div
        className="pl-4 py-2 flex items-start gap-2 hover:bg-slate-50 transition-colors group"
        style={{ marginLeft: `${level * 24}px` }}
      >
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-0.5 p-0 hover:bg-slate-200 rounded transition-colors flex-shrink-0"
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-slate-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-600" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-4" />}

        <div className="flex-1 min-w-0">
          <Link
            to={route.path}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium block truncate"
          >
            {route.title}
          </Link>
          {route.description && (
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{route.description}</p>
          )}
          <div className="text-xs text-slate-500 mt-1 flex gap-4">
            <span>Priority: {route.priority}</span>
            <span>Update: {route.changeFrequency}</span>
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {route.children!.map((child, idx) => (
            <SitemapItem key={`${child.path}-${idx}`} route={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sitemap() {
  const [routes, setRoutes] = useState<SitemapRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSitemap = async () => {
      try {
        const sitemapRoutes = await buildCompleteSitemap();
        setRoutes(sitemapRoutes);
      } catch (error) {
        console.error("Error loading sitemap:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSitemap();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Sitemap</h1>
          <p className="text-slate-600 mb-8">Loading sitemap...</p>
        </div>
      </div>
    );
  }

  const totalRoutes = routes.reduce((count, route) => {
    const countChildren = (r: SitemapRoute): number => {
      if (!r.children) return 1;
      return 1 + r.children.reduce((sum, child) => sum + countChildren(child), 0);
    };
    return count + countChildren(route);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">Sitemap</h1>
          </div>
          <p className="text-lg text-slate-600 mb-4">
            Browse the complete structure of our website with {totalRoutes} pages
          </p>
          <p className="text-slate-500">
            Click on any page to visit it, or expand the categories to see subpages
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="text-sm text-slate-600 mb-1">Total Pages</div>
            <div className="text-3xl font-bold text-slate-900">{totalRoutes}</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="text-sm text-slate-600 mb-1">Categories</div>
            <div className="text-3xl font-bold text-slate-900">{routes.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="text-sm text-slate-600 mb-1">XML Sitemap</div>
            <a href="/sitemap.xml" className="text-blue-600 hover:underline font-medium">
              View XML
            </a>
          </div>
        </div>

        {/* Sitemap Tree */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-6">
            <div className="space-y-0">
              {routes.map((route, idx) => (
                <SitemapItem key={`${route.path}-${idx}`} route={route} level={0} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-slate-600 text-sm">
          <p>This sitemap is automatically generated from the website structure.</p>
          <p className="mt-2">
            For search engines, use the{" "}
            <a href="/sitemap.xml" className="text-blue-600 hover:underline">
              XML sitemap
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
