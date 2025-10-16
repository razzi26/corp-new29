import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface QuizMeta {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  skillLevel: string;
  durationMinutes: number;
  questionCount: number;
  image?: { url: string; alt?: string };
}

export default function ResourcesQuizzes() {
  const [items, setItems] = useState<QuizMeta[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const response = await fetch("/data/quizzes.json", {
          cache: "no-store",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Failed to load quizzes (${response.status})`);
        }
        const data = await response.json();
        if (mounted) {
          const metas: QuizMeta[] = data.map((item: any) => ({
            slug: item.slug,
            title: item.title,
            subtitle: item.subtitle,
            category: item.category,
            skillLevel: item.skillLevel,
            durationMinutes: item.durationMinutes,
            questionCount: item.questionCount ?? item.questions?.length ?? 0,
            image: item.image,
          }));
          setItems(metas);
        }
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

  const categories = useMemo(() => {
    return Array.from(new Set((items ?? []).map((item) => item.category))).sort(
      (a, b) => a.localeCompare(b),
    );
  }, [items]);

  const filtered = useMemo(() => {
    if (!items) return [] as QuizMeta[];
    if (!category) return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Quizzes"
        description="Challenge your biosafety knowledge with interactive quizzes and track your progress."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Knowledge Hub", href: "/resources" },
          { label: "Quizzes" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Interactive learning modules
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className={cn(
                "cursor-pointer",
                category === null &&
                  "bg-[#003a68] text-white hover:bg-[#003a68]",
              )}
              onClick={() => setCategory(null)}
            >
              All categories
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className={cn(
                  "cursor-pointer",
                  category === cat &&
                    "bg-[#003a68] text-white hover:bg-[#003a68]",
                )}
                onClick={() =>
                  setCategory((prev) => (prev === cat ? null : cat))
                }
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {error && (
            <p className="text-sm text-red-600">Failed to load quizzes.</p>
          )}
          {!items ? (
            <LoadingIndicator label="Loading quizzes" />
          ) : filtered.length === 0 ? (
            <p className="text-slate-700">
              No quizzes found in this category. Try a different filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((quiz) => (
                <Card
                  key={quiz.slug}
                  className="group relative flex h-full flex-col overflow-hidden border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#003a68]/40 hover:shadow-xl"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0096d6] via-[#003a68] to-[#0096d6] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <AspectRatio ratio={16 / 9}>
                    <div className="relative h-full w-full">
                      <img
                        src={quiz.image?.url ?? "/placeholder.svg"}
                        alt={quiz.image?.alt ?? quiz.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </AspectRatio>
                  <CardHeader className="space-y-2 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-xl leading-snug text-slate-900">
                        {quiz.title}
                      </CardTitle>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#003a68]/10 text-[#003a68]">
                        <Sparkles className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{quiz.subtitle}</p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-6 text-sm text-slate-600">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#003a68]">
                      <span className="rounded-full bg-[#003a68]/10 px-3 py-1 text-[#003a68]">
                        {quiz.category}
                      </span>
                      <span className="rounded-full bg-[#003a68]/10 px-3 py-1 text-[#003a68]">
                        {quiz.skillLevel}
                      </span>
                    </div>
                    <dl className="grid grid-cols-2 gap-4 text-sm text-slate-700">
                      <div>
                        <dt className="font-medium text-slate-600">Questions</dt>
                        <dd className="mt-1 text-lg font-semibold text-slate-900">
                          {quiz.questionCount}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-slate-600">Duration</dt>
                        <dd className="mt-1 text-lg font-semibold text-slate-900">
                          ~{quiz.durationMinutes} min
                        </dd>
                      </div>
                    </dl>
                    <div className="flex items-center gap-2 text-xs font-medium text-[#003a68]">
                      <span className="inline-flex h-2 w-2 rounded-full bg-[#0096d6] animate-pulse" />
                      Real-world scenarios to sharpen your instincts
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-slate-100 bg-slate-50/80">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-[#003a68] via-[#005a9f] to-[#0096d6] text-white shadow-sm transition-all duration-300 hover:from-[#002a4a] hover:via-[#004d84] hover:to-[#007bb5] focus-visible:ring-[#0096d6]/40"
                    >
                      <Link to={`/resources/quizzes/${quiz.slug}`}>
                        Start quiz
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
