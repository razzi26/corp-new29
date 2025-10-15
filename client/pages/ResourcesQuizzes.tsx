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
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { cn } from "@/lib/utils";

interface QuizMeta {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  skillLevel: string;
  durationMinutes: number;
  questionCount: number;
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
                  className="flex h-full flex-col overflow-hidden border border-slate-200/70 shadow-sm transition-shadow hover:shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-xl leading-snug text-slate-900">
                      {quiz.title}
                    </CardTitle>
                    <p className="mt-2 text-sm text-slate-600">
                      {quiz.subtitle}
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-4 text-sm text-slate-600">
                    <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                      <span className="rounded-full bg-[#003a68]/10 px-3 py-1 text-[#003a68]">
                        {quiz.category}
                      </span>
                      <span className="rounded-full bg-[#003a68]/10 px-3 py-1 text-[#003a68]">
                        {quiz.skillLevel}
                      </span>
                    </div>
                    <dl className="grid grid-cols-2 gap-4 text-sm text-slate-700">
                      <div>
                        <dt className="font-medium text-slate-600">
                          Questions
                        </dt>
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
                  </CardContent>
                  <CardFooter className="border-t border-slate-100 bg-slate-50">
                    <Button
                      asChild
                      className="w-full bg-[#003a68] hover:bg-[#003a68]/90 focus-visible:ring-[#003a68]/40"
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
