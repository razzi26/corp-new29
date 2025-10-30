import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { cn } from "@/lib/utils";
import type { ArticleMeta } from "@/entities/article";
import { ArticleCard } from "@/components/cards/ArticleCard";

export default function KnowledgeHub() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [items, setItems] = useState<ArticleMeta[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const url = new URL("/data/knowledge-articles.json", typeof window !== 'undefined' ? window.location.origin : '/');
        const r = await fetch(url.toString(), {
          cache: "no-store",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`Failed to load articles (${r.status})`);
        const data = await r.json();
        if (!mounted) return;
        const metas: ArticleMeta[] = data.map((d: any) => ({
          slug: d.slug,
          title: d.title,
          description: d.description,
          date: d.date,
          readMins: d.readMins,
          tags: d.tags,
          image: d.image,
        }));
        // Deduplicate articles by slug to avoid rendering warnings about duplicate React keys
        const seen = new Set<string>();
        const uniqueMetas = metas.filter((m) => {
          if (seen.has(m.slug)) return false;
          seen.add(m.slug);
          return true;
        });
        setItems(uniqueMetas);
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        if (mounted) setError(String(e));
      }
    })();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const ALL_TAGS = useMemo(() => {
    return Array.from(new Set((items ?? []).flatMap((a) => a.tags))).sort();
  }, [items]);

  const filtered = useMemo(() => {
    if (!items) return [] as ArticleMeta[];
    const query = q.trim().toLowerCase();
    return items
      .filter((a) => {
        const matchQuery =
          !query ||
          a.title.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          a.tags.some((t) => t.toLowerCase().includes(query));
        const matchTag = !active || a.tags.includes(active);
        return matchQuery && matchTag;
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [q, active, items]);

  const activeTagClasses =
    "bg-[#00467f] text-white hover:bg-[#003a68] focus:ring-[#00467f]/40";

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Articles"
        description="Guides, articles and whitepapers on biosafety and lab practices."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Knowledge Hub", href: "/resources" },
          { label: "Articles" },
        ]}
      />

      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2">
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="kb-search"
            >
              Search articles
            </label>
            <Input
              id="kb-search"
              placeholder="Search by title, tag, or keywords"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="md:w-1/2">
            <div className="mb-2 text-sm font-medium text-slate-700">
              Filter by tag
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={active === null ? "default" : "secondary"}
                className={cn(
                  "cursor-pointer",
                  active === null && activeTagClasses,
                )}
                onClick={() => setActive(null)}
              >
                All
              </Badge>
              {ALL_TAGS.map((t) => (
                <Badge
                  key={t}
                  variant={active === t ? "default" : "secondary"}
                  className={cn(
                    "cursor-pointer",
                    active === t && activeTagClasses,
                  )}
                  onClick={() => setActive((prev) => (prev === t ? null : t))}
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {error && (
          <p className="text-sm text-red-600">Failed to load articles.</p>
        )}
        {!items ? (
          <LoadingIndicator label="Loading articles" />
        ) : filtered.length === 0 ? (
          <p className="text-slate-700">
            No articles found. Try a different search or tag.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        )}

        <div className="mt-10 text-sm text-slate-600">
          Looking for something else? Explore{" "}
          <Link
            to="/resources/videos"
            className="text-[hsl(var(--brand-end))] hover:underline"
          >
            Videos
          </Link>{" "}
          or{" "}
          <Link
            to="/resources/podcasts"
            className="text-[hsl(var(--brand-end))] hover:underline"
          >
            Podcasts
          </Link>
          .
        </div>
      </section>
    </div>
  );
}
