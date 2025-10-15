import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";

export default function Resources() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Knowledge Hub"
        description="A curated collection of learning materials, videos, and case studies to help you stay informed about biosafety best practices."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge Hub" }]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/resources/videos",
              title: "Videos",
              descr: "Short introductions and recorded seminars.",
            },
            {
              href: "/resources/articles",
              title: "Articles",
              descr: "Guides, articles and whitepapers.",
            },
            {
              href: "/resources/quizzes",
              title: "Quizzes",
              descr: "Interactive assessments to test biosafety knowledge.",
            },
            {
              href: "/resources/podcasts",
              title: "Podcasts",
              descr: "Interviews and discussions.",
            },
            {
              href: "/resources/case-studies",
              title: "Case Studies",
              descr: "Real-world implementations and learnings.",
            },
            {
              href: "/resources/faq",
              title: "FAQ",
              descr: "Answers to common questions.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block rounded-lg border border-slate-200 p-6 hover:shadow-md"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.descr}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
