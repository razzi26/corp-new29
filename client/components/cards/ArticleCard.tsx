import { Link } from "react-router-dom";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import type { ArticleMeta } from "@/entities/article";

export function ArticleCard({ a }: { a: ArticleMeta }) {
  const slugParam = a.slug.replace("/resources/articles/", "");
  return (
    <div className="pb-0 pt-0 flex flex-col h-full bg-[hsl(var(--primary))] rounded-lg overflow-hidden w-full ">
      {a.image && (
        <img
          src={a.image}
          alt={a.title}
          className="w-full h-32 object-cover sm:h-48"
        />
      )}

      <div className="flex flex-col flex-1 p-4 sm:p-6 text-white">
        <Link
          to={`/resources/articles/${slugParam}`}
          className="text-lg sm:text-xl font-bold leading-tight text-white hover:text-white/80 transition-colors block mb-2 sm:mb-3"
        >
          {a.title}
        </Link>

        <div className="mb-2 sm:mb-3 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-white/80 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {new Date(a.date).toLocaleDateString()}
          </span>
          <span className="text-slate-300 hidden sm:inline">—</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {a.readMins} min read
          </span>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 mb-3 sm:mb-4">
          {a.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] sm:text-xs font-semibold text-white bg-white/20 px-2 py-0.5 sm:py-1 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          to={`/resources/articles/${slugParam}`}
          className="group inline-flex items-center justify-between w-full rounded-lg border border-white px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-white/90 transition-colors"
        >
          <span className="transition-colors group-hover:text-brand-secondary">
            Read article
          </span>
          <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 shrink-0 transform transition-all group-hover:-rotate-45 group-hover:text-brand-secondary" />
        </Link>
      </div>
    </div>
  );
}
