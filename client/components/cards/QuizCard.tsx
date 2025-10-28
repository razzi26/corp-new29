import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import type { QuizMeta } from "@/entities/quiz";

export function QuizCard({ quiz }: { quiz: QuizMeta }) {
  return (
    <div className="pb-8 pt-6">
      <AspectRatio ratio={5 / 2} className="mb-6">
        <img
          src={quiz.image?.url ?? "/placeholder.svg"}
          alt={quiz.image?.alt ?? quiz.title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </AspectRatio>
      <div className="mb-3">
        <h3 className="text-2xl font-bold leading-tight text-[hsl(var(--primary))] mb-2">
          {quiz.title}
        </h3>
        <p className="text-base text-slate-600">{quiz.subtitle}</p>
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-[hsl(var(--primary))] uppercase tracking-wide">
        <span className="bg-[hsl(var(--primary))]/5 px-3 py-1">
          {quiz.category}
        </span>
        <span className="text-slate-300">—</span>
        <span className="bg-[hsl(var(--primary))]/5 px-3 py-1">
          {quiz.skillLevel}
        </span>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-6 pt-2 text-sm">
        <div>
          <dt className="font-medium text-slate-600 mb-1">Questions</dt>
          <dd className="text-xl font-bold text-[hsl(var(--primary))]">
            {quiz.questionCount}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-slate-600 mb-1">Duration</dt>
          <dd className="text-xl font-bold text-[hsl(var(--primary))]">
            ~{quiz.durationMinutes} min
          </dd>
        </div>
      </div>
      <Button
        asChild
        className="w-full bg-[hsl(var(--primary))] text-white transition-all duration-300 hover:bg-[hsl(205_100%_20%)] focus-visible:ring-[hsl(var(--primary))]/40 font-bold text-base py-3"
      >
        <Link to={`/resources/quizzes/${quiz.slug}`}>Start quiz</Link>
      </Button>
    </div>
  );
}
