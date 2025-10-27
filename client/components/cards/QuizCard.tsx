import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import type { QuizMeta } from "@/entities/quiz";

export function QuizCard({ quiz }: { quiz: QuizMeta }) {
  return (
    <Card
      key={quiz.slug}
      className="group relative flex h-full w-full flex-col overflow-hidden border-2 border-slate-200 bg-white transition-all duration-300 hover:border-[hsl(var(--primary))]/40"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(205_100%_20%)] to-[hsl(var(--primary))] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <AspectRatio ratio={5 / 2}>
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
      <CardHeader className="space-y-2 px-5 pb-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl leading-snug text-[hsl(var(--primary))] font-bold">
            {quiz.title}
          </CardTitle>
        </div>
        <p className="text-sm text-slate-600">{quiz.subtitle}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 px-5 pb-5 pt-0 text-sm text-slate-600">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--primary))]">
          <span className="rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-[hsl(var(--primary))]">
            {quiz.category}
          </span>
          <span className="rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-[hsl(var(--primary))]">
            {quiz.skillLevel}
          </span>
        </div>
        <dl className="grid grid-cols-2 gap-4 text-sm text-slate-700">
          <div>
            <dt className="font-medium text-slate-600">Questions</dt>
            <dd className="mt-1 text-lg font-semibold text-[hsl(var(--primary))]">
              {quiz.questionCount}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-slate-600">Duration</dt>
            <dd className="mt-1 text-lg font-semibold text-[hsl(var(--primary))]">
              ~{quiz.durationMinutes} min
            </dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="border-t border-slate-100 bg-slate-50/80 px-5 py-4">
        <Button
          asChild
          className="w-full bg-[hsl(var(--primary))] text-white transition-all duration-300 hover:bg-[hsl(205_100%_20%)] focus-visible:ring-[hsl(var(--primary))]/40 font-bold"
        >
          <Link to={`/resources/quizzes/${quiz.slug}`}>Start quiz</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
