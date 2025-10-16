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
      className="group relative flex h-full w-full flex-col overflow-hidden border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#003a68]/40 hover:shadow-xl"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0096d6] via-[#003a68] to-[#0096d6] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
          <CardTitle className="text-xl leading-snug text-slate-900">
            {quiz.title}
          </CardTitle>
        </div>
        <p className="text-sm text-slate-600">{quiz.subtitle}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 px-5 pb-5 pt-0 text-sm text-slate-600">
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
      </CardContent>
      <CardFooter className="border-t border-slate-100 bg-slate-50/80 px-5 py-4">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-[#003a68] via-[#005a9f] to-[#0096d6] text-white shadow-sm transition-all duration-300 hover:from-[#002a4a] hover:via-[#004d84] hover:to-[#007bb5] focus-visible:ring-[#0096d6]/40"
        >
          <Link to={`/resources/quizzes/${quiz.slug}`}>Start quiz</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
