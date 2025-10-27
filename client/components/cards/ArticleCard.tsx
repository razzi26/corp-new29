import { Link } from "react-router-dom";
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
    <Card className="h-full flex flex-col overflow-hidden rounded-xl border-2 border-slate-200 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl leading-7">
          <Link
            to={`/resources/articles/${slugParam}`}
            className="text-[hsl(var(--primary))] hover:underline font-bold"
          >
            {a.title}
          </Link>
        </CardTitle>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {new Date(a.date).toLocaleDateString()}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {a.readMins} min read
          </span>
        </div>
      </CardHeader>
      <CardContent className="text-slate-700 py-2">
        <p>{a.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <Badge key={t} variant="secondary" className="bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4">
        <Link
          to={`/resources/articles/${slugParam}`}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-[hsl(var(--primary))] px-5 py-2.5 text-[hsl(var(--primary))] font-bold transition-colors hover:bg-[hsl(var(--primary))] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]/40"
        >
          Read article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
