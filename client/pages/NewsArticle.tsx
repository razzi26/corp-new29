import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Separator } from "@/components/ui/separator";
import { Seo } from "@/components/Seo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShareButtons } from "@/components/ShareButtons";
import { Calendar, Clock } from "lucide-react";

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
    fetch("/data/news-articles.json")
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setItems(data);
      })
      .catch((e) => {
        if (mounted) setError(String(e));
      });
    return () => {
      mounted = false;
    };
  }, []);

  const article = useMemo(() => {
    if (!items || !slug) return null;
    const path = "/news/" + slug;
    return items.find((a) => a.slug === path) ?? null;
  }, [items, slug]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">Failed to load article.</div>
    );
  }
  if (!items || !article) {
    return <div className="container mx-auto px-4 py-12">Loading…</div>;
  }

  const { title, description, date, readMins, content } = article;

  const recent = useMemo(() => {
    if (!items) return [] as NewsItem[];
    return items
      .filter((a) => a.slug !== article.slug)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 5);
  }, [items, article.slug]);

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
            <div className="sticky top-24 rounded-lg border bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold">Недавние новости</h3>
              <ul className="space-y-4">
                {recent.map((a) => {
                  const slugParam = a.slug.replace("/news/", "");
                  return (
                    <li key={a.slug}>
                      <Link to={`/news/${slugParam}`} className="group block">
                        <div className="flex gap-3">
                          <div className="w-24 flex-shrink-0 overflow-hidden rounded-md border bg-white">
                            <AspectRatio ratio={16 / 9}>
                              <img
                                src={a.image || "/placeholder.svg"}
                                alt={a.title}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            </AspectRatio>
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-slate-900 group-hover:underline">
                              {a.title}
                            </div>
                            <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-600">
                              <Calendar className="h-3 w-3" />
                              {new Date(a.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </Link>
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
