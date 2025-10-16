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
    <Card className="h-full flex flex-col overflow-hidden rounded-lg border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow">
      <CardHeader>
        <CardTitle className="text-xl leading-7">
          <Link
            to={`/resources/articles/${slugParam}`}
            className="text-[#00467f] hover:underline"
          >
            {a.title}
          </Link>
        </CardTitle>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
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
      <CardContent className="text-slate-700">
        <p>{a.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link
          to={`/resources/articles/${slugParam}`}
          className="inline-flex items-center gap-2 rounded-full border border-[#00467f] px-4 py-2 text-[#00467f] transition-colors hover:bg-[#00467f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00467f]/40"
        >
          Read article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
