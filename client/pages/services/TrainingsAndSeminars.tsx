import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/Button";
import { GraduationCap, CheckCircle, Users, Trophy } from "lucide-react";
import trainingsData from "@/config/data/trainings.json";
import TrainingsSection from "@/components/services/TrainingsSection";

const ICONS: Record<string, any> = { GraduationCap, CheckCircle, Users, Trophy };

export default function TrainingsAndSeminars() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title={trainingsData.title}
        description={trainingsData.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: trainingsData.title },
        ]}
      />
      <TrainingsSection />

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="mb-8">
              <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)] mb-6">
                {trainingsData.title}
              </h2>
              {trainingsData.intro.map((p, i) => (
                <p key={i} className="text-lg text-slate-700 leading-relaxed mb-6">
                  {p}
                </p>
              ))}
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-8 my-12">
              {trainingsData.features.map((f) => {
                const Icon = ICONS[f.icon] ?? GraduationCap;
                return (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                        <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{f.title}</h3>
                      <p className="text-slate-700">{f.descr}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="shadow-lg hover:shadow-xl bg-[hsl(var(--primary))] hover:bg-[hsl(205_100%_20%)]"
            >
              <Link to={trainingsData.cta.href}>{trainingsData.cta.text}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
