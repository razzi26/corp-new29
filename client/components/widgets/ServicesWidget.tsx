import { GraduationCap, CheckCircle, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  backgroundImage?: string;
}

const SERVICES: Service[] = [
  {
    title: "Trainings and Seminars",
    description:
      "Securing adherence to quality system standards by comprehensive auditing and compliance to regulations by training & education.",
    icon: GraduationCap,
    href: "/services/trainings-and-seminars",
    backgroundImage: "https://pharmavalidationtraininginstitute.com/images/section/Audit-and-Training-Service.jpg",
  },
  {
    title: "Validation Service",
    description:
      "Ensuring integrity and performance of systems, facilities & equipment through validation.",
    icon: CheckCircle,
    href: "/services/validation-service",
    backgroundImage: "https://pharmavalidationtraininginstitute.com/images/section/Validation-Service.jpg",
  },
  {
    title: "Commissioning and Qualification",
    description:
      "Providing quality installation of equipment and construction of facility from start to finish.",
    icon: Wrench,
    href: "/services/commissioning-and-qualification",
    backgroundImage: "https://pharmavalidationtraininginstitute.com/images/section/Commissioning-and-Qualification.jpg",
  },
];

export default function ServicesWidget() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <div className="w-16 h-1 bg-[hsl(var(--primary))] mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-slate-700 max-w-2xl">
            Comprehensive solutions for biosafety compliance and quality
            assurance
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                to={service.href}
                className="relative group overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-slate-300 cursor-pointer block"
              >
                <div
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: service.backgroundImage ? `url(${service.backgroundImage})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-[hsl(var(--primary))]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {service.backgroundImage && (
                  <div className="absolute inset-0 bg-black/40" />
                )}

                <div className="relative z-10 p-8 h-full flex flex-col">
                  <h3 className={`mb-3 text-xl font-bold ${
                    service.backgroundImage
                      ? "text-white"
                      : "text-[hsl(205_100%_12%)]"
                  }`}>
                    {service.title}
                  </h3>

                  <p className={`text-base leading-relaxed flex-1 ${
                    service.backgroundImage
                      ? "text-white/90"
                      : "text-slate-700"
                  }`}>
                    {service.description}
                  </p>

                  <div className="absolute top-6 right-6 text-white">
                    <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:-rotate-45" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[hsl(var(--primary))] transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
