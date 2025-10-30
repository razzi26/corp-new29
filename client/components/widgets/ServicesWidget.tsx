import { GraduationCap, CheckCircle, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const SERVICES: Service[] = [
  {
    title: "Trainings and Seminars",
    description:
      "Securing adherence to quality system standards by comprehensive auditing and compliance to regulations by training & education.",
    icon: GraduationCap,
    href: "#trainings-seminars",
  },
  {
    title: "Validation Service",
    description:
      "Ensuring integrity and performance of systems, facilities & equipment through validation.",
    icon: CheckCircle,
    href: "#validation-service",
  },
  {
    title: "Commissioning and Qualification",
    description:
      "Providing quality installation of equipment and construction of facility from start to finish.",
    icon: Wrench,
    href: "#commissioning-qualification",
  },
];

export default function ServicesWidget() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <div className="w-16 h-1 bg-[hsl(var(--primary))] mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-slate-700 max-w-2xl">
            Comprehensive solutions for biosafety compliance and quality assurance
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-lg hover:border-slate-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-[hsl(var(--primary))]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-[hsl(205_100%_12%)]">
                    {service.title}
                  </h3>

                  <p className="text-base leading-relaxed text-slate-700">
                    {service.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[hsl(var(--primary))] transition-all duration-300 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
