import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

interface NewsMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMins: number;
  tags: string[];
  image?: string;
}

function NewsCard({ a }: { a: NewsMeta }) {
  const slugParam = a.slug.replace("/news/", "");
  return (
    <Card className="h-full flex flex-col overflow-hidden rounded-lg border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow">
      {(
        <div className="bg-white">
          <AspectRatio ratio={16 / 9}>
            <img
              src={a.image || "/placeholder.svg"}
              alt={a.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </AspectRatio>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl leading-7">
          <Link to={`/news/${slugParam}`} className="text-[#00467f] hover:underline">
            {a.title}
          </Link>
        </CardTitle>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {new Date(a.date).toLocaleDateString()}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {a.readMins} min read
          </span>
        </div>
      </CardHeader>
      <CardContent className="text-slate-700">
        <p>{a.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link
          to={`/news/${slugParam}`}
          className="inline-flex items-center gap-2 rounded-full border border-[#00467f] px-4 py-2 text-[#00467f] transition-colors hover:bg-[#00467f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00467f]/40"
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function News() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [items, setItems] = useState<NewsMeta[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const r = await fetch("/data/news-articles.json", {
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
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="news-search">
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
            <div className="mb-2 text-sm font-medium text-slate-700">Filter by tag</div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={active === null ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setActive(null)}
              >
                All
              </Badge>
              {ALL_TAGS.map((t) => (
                <Badge
                  key={t}
                  variant={active === t ? "default" : "secondary"}
                  className="cursor-pointer"
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
          <p className="text-slate-700">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-slate-700">No news found. Try a different search or tag.</p>
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
