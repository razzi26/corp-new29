import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Separator } from "@/components/ui/separator";
import { Seo } from "@/components/Seo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShareButtons } from "@/components/ShareButtons";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface Block {
  type: "p" | "h3" | "ul";
  text?: string;
  items?: string[];
}
interface NewsItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMins: number;
  tags: string[];
  image?: string;
  content: Block[];
}

export default function NewsArticle() {
  const { slug } = useParams();
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const r = await fetch("/data/news-articles.json", { cache: "no-store" });
        if (!r.ok) throw new Error(`Failed to load news (${r.status})`);
        const data = await r.json();
        if (mounted) setItems(data);
      } catch (e) {
        if (mounted) setError(String(e));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const article = useMemo(() => {
    if (!items || !slug) return null;
    const path = "/news/" + slug;
    return items.find((a) => a.slug === path) ?? null;
  }, [items, slug]);

  const currentPath = useMemo(() => "/news/" + (slug ?? ""), [slug]);
  const recent = useMemo(() => {
    const list = items ?? [];
    return list
      .filter((a) => a.slug !== currentPath)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 5);
  }, [items, currentPath]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">Failed to load article.</div>
    );
  }
  if (!items || !article) {
    return <div className="container mx-auto px-4 py-12">Loading…</div>;
  }

  const { title, description, date, readMins, content } = article;


  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title={title}
        description={description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: title },
        ]}
        meta={
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{readMins} min read</span>
            </span>
          </div>
        }
      />

      <Seo
        title={title}
        description={description}
        url={typeof window !== "undefined" ? window.location.href : undefined}
        image={article.image ?? "/placeholder.svg"}
        type="article"
      />

      <article className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {article.image && (
              <div className="mb-8 overflow-hidden rounded-lg border bg-white shadow-sm">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={article.image}
                    alt={title}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </AspectRatio>
              </div>
            )}

            <ShareButtons title={title} description={description} className="mb-6" />

            {content.map((b, i) => {
              if (b.type === "p")
                return (
                  <p key={i} className="mt-4 text-lg leading-8 text-slate-700">
                    {b.text}
                  </p>
                );
              if (b.type === "h3")
                return (
                  <h3 key={i} className="mt-8 text-xl font-semibold">
                    {b.text}
                  </h3>
                );
              if (b.type === "ul")
                return (
                  <ul key={i} className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
                    {(b.items ?? []).map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                );
              return null;
            })}

            <Separator className="my-10" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link to="/news" className="text-[hsl(var(--brand-end))] hover:underline">
                ← Back to News
              </Link>
              <div className="text-sm text-slate-600">
                Last updated: {new Date(date).toLocaleDateString()}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <h3 className="mb-3 text-sm font-semibold">Recent News</h3>
              <ul className="space-y-3">
                {recent.map((a) => {
                  const slugParam = a.slug.replace("/news/", "");
                  return (
                    <li key={a.slug}>
                      <div className="rounded-lg border p-3 shadow-sm transition-shadow hover:shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              to={`/news/${slugParam}`}
                              className="line-clamp-2 text-sm font-medium text-[hsl(var(--brand-end))] hover:underline"
                            >
                              {a.title}
                            </Link>
                            <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-600">
                              <Calendar className="h-3 w-3" />
                              {new Date(a.date).toLocaleDateString()}
                            </div>
                          </div>
                          <Link
                            to={`/news/${slugParam}`}
                            aria-label="Open"
                            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md border text-[hsl(var(--brand-end))] hover:bg-[hsl(var(--brand-end))]/5"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
