import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Clock, CalendarDays } from "lucide-react";

interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO string
  readMins: number;
  tags: string[];
}

const ARTICLES: ArticleMeta[] = [
  {
    slug: "/resources/knowledge-hub/biosafety-basics",
    title: "Biosafety Basics: How to Build a Safe Lab Culture",
    description:
      "A practical guide to biosafety levels, risk assessment, PPE, and routine controls for modern labs.",
    date: "2025-03-12",
    readMins: 8,
    tags: ["Biosafety", "Lab Practices"],
  },
  {
    slug: "/resources/knowledge-hub/sample-decontamination",
    title: "Surface Decontamination Methods Compared",
    description:
      "An evidence-based overview of chemical disinfectants and compatibility considerations.",
    date: "2025-02-11",
    readMins: 6,
    tags: ["Decontamination", "SOP"],
  },
  {
    slug: "/resources/knowledge-hub/bsc-airflow-fundamentals",
    title: "BSC Airflow Fundamentals",
    description:
      "Understanding inflow, downflow, and exhaust to maintain containment.",
    date: "2025-01-20",
    readMins: 7,
    tags: ["BSC", "Engineering Controls"],
  },
];

const ALL_TAGS = Array.from(new Set(ARTICLES.flatMap((a) => a.tags))).sort();

function ArticleCard({ a }: { a: ArticleMeta }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl leading-7">{a.title}</CardTitle>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" />{new Date(a.date).toLocaleDateString()}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{a.readMins} min read</span>
        </div>
      </CardHeader>
      <CardContent className="text-slate-700">
        <p>{a.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <Badge key={t} variant="secondary">{t}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild>
          <Link to={a.slug}>Read article</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function KnowledgeHub() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const matchQuery = !query
        || a.title.toLowerCase().includes(query)
        || a.description.toLowerCase().includes(query)
        || a.tags.some((t) => t.toLowerCase().includes(query));
      const matchTag = !active || a.tags.includes(active);
      return matchQuery && matchTag;
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [q, active]);

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Knowledge Hub"
        description="Guides, articles and whitepapers on biosafety and lab practices."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Knowledge Hub" },
        ]}
      />

      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="md:w-1/2">
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="kb-search">
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

        {filtered.length === 0 ? (
          <p className="text-slate-700">No articles found. Try a different search or tag.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        )}

        <div className="mt-10 text-sm text-slate-600">
          Looking for something else? Explore <Link to="/resources/videos" className="text-[hsl(var(--brand-end))] hover:underline">Videos</Link> or <Link to="/resources/podcasts" className="text-[hsl(var(--brand-end))] hover:underline">Podcasts</Link>.
        </div>
      </section>
    </div>
  );
}
