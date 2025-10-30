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
        gradient="linear-gradient(135deg, #020113 0%, #003BA3)"
      />

      <section className="container mx-auto py-12 md:py-16">
        <div className="rounded-lg overflow-hidden bg-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
            {RESOURCE_CARDS.map(({ href, title, description, icon: Icon, color }) => (
              <Link
                key={href}
                to={href}
                className="relative group overflow-hidden bg-white p-6 transition-all duration-300 hover:shadow-lg cursor-pointer block rounded-none"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-[hsl(var(--primary))]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex flex-col gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-3 text-xl font-bold text-[hsl(205_100%_12%)]">
                      {title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-700">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="absolute top-6 right-4 text-[hsl(var(--primary))]">
                  <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:-rotate-45" />
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[hsl(var(--primary))] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
