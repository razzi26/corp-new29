import { PageBanner } from "@/components/layout/PageBanner";
import { Link } from "react-router-dom";
import { PlayCircle, FileText, GraduationCap, Mic, FileStack, HelpCircle, ArrowRight } from "lucide-react";

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
              icon: PlayCircle,
              color: "bg-sky-700",
            },
            {
              href: "/resources/articles",
              title: "Articles",
              descr: "Guides, articles and whitepapers.",
              icon: FileText,
              color: "bg-indigo-700",
            },
            {
              href: "/resources/quizzes",
              title: "Quizzes",
              descr: "Interactive assessments to test biosafety knowledge.",
              icon: GraduationCap,
              color: "bg-emerald-700",
            },
            {
              href: "/resources/podcasts",
              title: "Podcasts",
              descr: "Interviews and discussions.",
              icon: Mic,
              color: "bg-teal-700",
            },
            {
              href: "/resources/case-studies",
              title: "Case Studies",
              descr: "Real-world implementations and learnings.",
              icon: FileStack,
              color: "bg-violet-700",
            },
            {
              href: "/resources/faq",
              title: "FAQ",
              descr: "Answers to common questions.",
              icon: HelpCircle,
              color: "bg-amber-700",
            },
          ].map(({ href, title, descr, icon: Icon, color }) => (
            <Link
              key={href}
              to={href}
              className={`group relative block overflow-hidden rounded-2xl p-6 text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${color}`}
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                <div className="absolute inset-0 bg-brand-gradient opacity-[0.15]" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-sm ring-1 ring-white/10">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <ArrowRight className="h-5 w-5 text-white/80 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/90">{descr}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
