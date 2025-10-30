import { useEffect, useMemo, useState } from "react";
import { PageBanner } from "@/components/layout/PageBanner";
import { Badge } from "@/components/ui/badge";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { cn } from "@/lib/utils";
import { QuizCard } from "@/components/cards/QuizCard";
import type { QuizMeta } from "@/entities/quiz";

export default function ResourcesQuizzes() {
  const [items, setItems] = useState<QuizMeta[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const url = new URL("/data/quizzes.json", typeof window !== 'undefined' ? window.location.origin : '/');
    const response = await fetch(url.toString(), {
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
                <QuizCard key={quiz.slug} quiz={quiz} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
