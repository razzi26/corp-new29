import { PageBanner } from "@/components/layout/PageBanner";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Wrench,
  FileStack,
  type LucideIcon,
  GraduationCap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

type TrainingCard = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const TRAINING_CARDS: TrainingCard[] = [
  {
    href: "/services/about",
    title: "About Trainings",
    description:
      "Expert-led programs delivered from our dedicated learning centers.",
    icon: BookOpen,
  },
  {
    href: "/services/seminars",
    title: "Seminars",
    description: "Specialized seminars on biosafety cabinet operations.",
    icon: Users,
  },
  {
    href: "/services/services",
    title: "Services",
    description: "Professional training and support services.",
    icon: Wrench,
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TRAINING_CARDS.map(({ href, title, description, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              className="relative group overflow-hidden rounded-lg border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-slate-300 cursor-pointer block"
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
      </section>
    </div>
  );
}
