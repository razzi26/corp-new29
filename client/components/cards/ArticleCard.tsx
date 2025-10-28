import { Link } from "react-router-dom";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import type { ArticleMeta } from "@/entities/article";

export function ArticleCard({ a }: { a: ArticleMeta }) {
  const slugParam = a.slug.replace("/resources/articles/", "");
  return (
    <div className="border-b border-slate-200 pb-8 pt-6">
      <Link
        to={`/resources/articles/${slugParam}`}
        className="text-2xl font-bold leading-tight text-[hsl(var(--primary))] hover:underline block mb-4"
      >
        {a.title}
      </Link>
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4" />
          {new Date(a.date).toLocaleDateString()}
        </span>
        <span className="text-slate-300">—</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {a.readMins} min read
        </span>
      </div>
      <p className="text-lg leading-relaxed text-slate-700 mb-4">{a.description}</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {a.tags.map((t) => (
          <span key={t} className="text-sm font-semibold text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5 px-3 py-1">
            {t}
          </span>
        ))}
      </div>
      <Link
        to={`/resources/articles/${slugParam}`}
        className="inline-flex items-center gap-2 text-[hsl(var(--primary))] font-bold text-base hover:underline transition-colors"
      >
        Read article
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
