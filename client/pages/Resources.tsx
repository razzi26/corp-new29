import { PageBanner } from "@/components/layout/PageBanner";
import { Link } from "react-router-dom";
import {
  PlayCircle,
  FileText,
  GraduationCap,
  Mic,
  FileStack,
  HelpCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type ResourceCard = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

const RESOURCE_CARDS: ResourceCard[] = [
  {
    href: "/resources/videos",
    title: "Videos",
    description: "Short introductions and recorded seminars.",
    icon: PlayCircle,
    color: "bg-sky-600",
  },
  {
    href: "/resources/articles",
    title: "Articles",
    description: "Guides, articles and whitepapers.",
    icon: FileText,
    color: "bg-indigo-600",
  },
  {
    href: "/resources/quizzes",
    title: "Quizzes",
    description: "Interactive assessments to test biosafety knowledge.",
    icon: GraduationCap,
    color: "bg-emerald-600",
  },
  {
    href: "/resources/podcasts",
    title: "Podcasts",
    description: "Interviews and discussions.",
    icon: Mic,
    color: "bg-teal-600",
  },
  {
    href: "/resources/case-studies",
    title: "Case Studies",
    description: "Real-world implementations and learnings.",
    icon: FileStack,
    color: "bg-violet-600",
  },
  {
    href: "/resources/faq",
    title: "FAQ",
    description: "Answers to common questions.",
    icon: HelpCircle,
    color: "bg-amber-600",
  },
];

export default function Resources() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Knowledge Hub"
        description="A curated collection of learning materials, videos, and case studies to help you stay informed about biosafety best practices."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge Hub" }]}
        backgroundImage="https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg"
        gradient="linear-gradient(135deg, hsl(205 100% 28%) 0%, hsl(205 100% 25%) 50%, hsl(205 85% 32%) 100%)"
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCE_CARDS.map(
            ({ href, title, description, icon: Icon, color }) => (
              <Link
                key={href}
                to={href}
                className={`group relative block overflow-hidden rounded-xl p-6 text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${color}`}
              >
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-brand-gradient opacity-[0.15]" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-1 items-start gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-sm ring-1 ring-white/10">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm text-white/90">
                        {description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 flex-shrink-0 text-white/80 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
