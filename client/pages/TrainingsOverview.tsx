import { PageBanner } from "@/components/layout/PageBanner";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Wrench,
  FileStack,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type TrainingCard = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

const TRAINING_CARDS: TrainingCard[] = [
  {
    href: "/services/about",
    title: "About Trainings",
    description:
      "Expert-led programs delivered from our dedicated learning centers.",
    icon: BookOpen,
    color: "bg-blue-700",
  },
  {
    href: "/services/seminars",
    title: "Seminars",
    description: "Specialized seminars on biosafety cabinet operations.",
    icon: Users,
    color: "bg-indigo-600",
  },
  {
    href: "/services/services",
    title: "Services",
    description: "Professional training and support services.",
    icon: Wrench,
    color: "bg-cyan-600",
  },
  {
    href: "/services/brochures",
    title: "Brochures",
    description: "Downloadable training materials and documentation.",
    icon: FileStack,
    color: "bg-teal-600",
  },
  {
    href: "/services/trainings-and-seminars",
    title: "Trainings and Seminars",
    description:
      "Securing adherence to quality system standards by comprehensive auditing and compliance to regulations by training & education.",
    icon: GraduationCap,
  },
  {
    title: "Validation Service",
    description:
      "Ensuring integrity and performance of systems, facilities & equipment through validation.",
    icon: CheckCircle,
    href: "/services/validation-service",
  },
  {
    title: "Commissioning and Qualification",
    description:
      "Providing quality installation of equipment and construction of facility from start to finish.",
    icon: Wrench,
    href: "/services/commissioning-and-qualification",
  }, 
];

export default function TrainingsOverview() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Services"
        description="Comprehensive training programs and resources to enhance your biosafety expertise."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2">
          {TRAINING_CARDS.map(
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
