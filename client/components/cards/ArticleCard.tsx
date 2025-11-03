import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import type { ArticleMeta } from "@/entities/article";

export function ArticleCard({ a }: { a: ArticleMeta }) {
  const slugParam = a.slug.replace("/resources/articles/", "");

  return (
    <Card className="h-full flex flex-col overflow-hidden rounded-lg border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow">
      <div className="bg-white">
        <AspectRatio ratio={16 / 9}>
          <img
            src={a.image || "/placeholder.svg"}
            alt={a.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </AspectRatio>
      </div>

      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg leading-6">
          <Link
            to={`/resources/articles/${slugParam}`}
            className="text-slate-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded"
          >
            {a.title}
          </Link>
        </CardTitle>

        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-slate-400" />
            <time dateTime={a.date}>{new Date(a.date).toLocaleDateString()}</time>
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4 text-slate-400" />
            <span>{a.readMins} min read</span>
          </span>
        </div>
      </CardHeader>

      {/*<CardContent className="text-slate-700 p-4 sm:p-6 pt-0">
        <p className="line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm">{a.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>*/}

      <CardFooter className="mt-auto">
        <Link
          to={`/resources/articles/${slugParam}`}
          className="group inline-flex items-center justify-between w-full rounded-lg border border-slate-200 px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold text-slate-900/90 transition-colors hover:bg-slate-50"
        >
          <span className="transition-colors group-hover:text-[#00467f]">Read article</span>
          <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 shrink-0 transform transition-all group-hover:-rotate-45 group-hover:text-[#00467f]" />
        </Link>
      </CardFooter>
    </Card>
  );
}
