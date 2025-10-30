import { useEffect, useMemo, useState } from "react";
import { PageBanner } from "@/components/layout/PageBanner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import type { NewsMeta } from "@/entities/news";
import { NewsCard } from "@/components/cards/NewsCard";

export default function News() {
  const [q, setQ] = useState("");
  const activeTagClasses =
    "bg-[#00467f] text-white hover:bg-[#003a68] focus:ring-[#00467f]/40";
  const [active, setActive] = useState<string | null>(null);
  const [items, setItems] = useState<NewsMeta[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const url = new URL("/data/news-articles.json", typeof window !== 'undefined' ? window.location.origin : '/');
        const r = await fetch(url.toString(), {
          cache: "no-store",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!r.ok) throw new Error(`Failed to load news (${r.status})`);
        const data = await r.json();
        if (!mounted) return;
        const metas: NewsMeta[] = data.map((d: any) => ({
          slug: d.slug,
          title: d.title,
          description: d.description,
          date: d.date,
          readMins: d.readMins,
          tags: d.tags,
          image: d.image,
        }));
        setItems(metas);
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
    if (!items) return [] as NewsMeta[];
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

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="News"
        description="Updates, product news, and practical insights from our team and partners."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      />

      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2">
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="news-search"
            >
              Search news
            </label>
            <Input
              id="news-search"
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

        {error && <p className="text-sm text-red-600">Failed to load news.</p>}
        {!items ? (
          <LoadingIndicator label="Loading news" />
        ) : filtered.length === 0 ? (
          <p className="text-slate-700">
            No news found. Try a different search or tag.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <NewsCard key={a.slug} a={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
