import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Separator } from "@/components/ui/separator";
import { Seo } from "@/components/Seo";
import { ShareButtons } from "@/components/ShareButtons";
import { Calendar, Clock } from "lucide-react";

interface SectionBlock {
  type: "p" | "h3" | "ul" | "links";
  text?: string;
  items?: any;
}
interface ArticleSection {
  id: string;
  title: string;
  content: SectionBlock[];
}
interface ArticleData {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMins: number;
  tags: string[];
  sections: ArticleSection[];
}

function Toc({ sections }: { sections: ArticleSection[] }) {
  return (
    <nav aria-label="Table of contents">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">Contents</h2>
      <ol className="list-decimal space-y-2 pl-5 text-slate-700">
        {sections.map((s) => (
          <li key={s.id}>
            <a className="hover:underline" href={`#${s.id}`}>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function KnowledgeArticle() {
  const { slug } = useParams();
  const [articles, setArticles] = useState<ArticleData[] | null>(null);
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
        if (mounted) setArticles(data);
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

  const article = useMemo(() => {
    if (!articles || !slug) return null;
    const path = "/resources/articles/" + slug;
    return articles.find((a) => a.slug === path) ?? null;
  }, [articles, slug]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        Failed to load articles. Please try again later.
      </div>
    );
  }
  if (!articles || !article) {
    return <div className="container mx-auto px-4 py-12">Loading…</div>;
  }

  const { title, description, date, readMins, sections } = article;

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title={title}
        description={description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Knowledge Hub", href: "/resources" },
          { label: "Articles", href: "/resources/articles" },
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
        image="/placeholder.svg"
        type="article"
      />

      <article className="container mx-auto px-4 py-12 md:py-16">
        <ShareButtons
          title={title}
          description={description}
          className="mb-6"
        />

        {/* Mobile TOC */}
        <div className="mb-8 lg:hidden">
          <Toc sections={sections} />
          <Separator className="my-6" />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="mb-3 text-xl font-semibold">{s.title}</h2>
                {s.content.map((b, i) => {
                  if (b.type === "p")
                    return (
                      <p key={i} className="mt-2 text-slate-700">
                        {b.text}
                      </p>
                    );
                  if (b.type === "h3")
                    return (
                      <h3 key={i} className="mt-3 font-semibold">
                        {b.text}
                      </h3>
                    );
                  if (b.type === "ul")
                    return (
                      <ul
                        key={i}
                        className="mt-3 list-disc space-y-1 pl-6 text-slate-700"
                      >
                        {Array.isArray(b.items) &&
                          b.items.map((it: string, idx: number) => (
                            <li key={idx}>{it}</li>
                          ))}
                      </ul>
                    );
                  if (b.type === "links")
                    return (
                      <ul
                        key={i}
                        className="mt-2 list-disc space-y-1 pl-6 text-slate-700"
                      >
                        {Array.isArray(b.items) &&
                          b.items.map(
                            (
                              it: { label: string; url: string },
                              idx: number,
                            ) => (
                              <li key={idx}>
                                <a
                                  className="text-[hsl(var(--brand-end))] hover:underline"
                                  href={it.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {it.label}
                                </a>
                              </li>
                            ),
                          )}
                      </ul>
                    );
                  return null;
                })}
                <Separator className="my-8" />
              </section>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/resources/articles"
                className="text-[hsl(var(--brand-end))] hover:underline"
              >
                ← Back to Articles
              </Link>
              <div className="text-sm text-slate-600">
                Last updated: {new Date(date).toLocaleDateString()}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-lg border bg-white p-5 shadow-sm">
              <Toc sections={sections} />
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
