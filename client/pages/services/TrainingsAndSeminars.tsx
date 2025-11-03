import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/Button";
import { GraduationCap, CheckCircle, Users, Trophy } from "lucide-react";
import trainingsData from "@/config/data/trainings.json";

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

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="mb-8">
              <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)] mb-6">
                Comprehensive Training Programs
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Our training and seminar programs are designed to equip
                biosafety professionals with the knowledge and skills needed to
                maintain the highest standards of safety and compliance. We
                deliver non-commercial, safety-focused educational content
                worldwide.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                    <GraduationCap className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Expert-Led Training
                  </h3>
                  <p className="text-slate-700">
                    Learn from industry experts with years of experience in
                    biosafety protocols and regulatory compliance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                    <Users className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Interactive Workshops
                  </h3>
                  <p className="text-slate-700">
                    Participate in hands-on seminars that provide practical
                    insights and real-world applications.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                    <Trophy className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Certification Support
                  </h3>
                  <p className="text-slate-700">
                    Prepare for professional certifications with our
                    comprehensive training materials and guidance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                    <CheckCircle className="h-6 w-6 text-[hsl(var(--primary))]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Quality Assurance
                  </h3>
                  <p className="text-slate-700">
                    Ensure your facility meets the highest standards through
                    regulatory compliance training.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="shadow-lg hover:shadow-xl bg-[hsl(var(--primary))] hover:bg-[hsl(205_100%_20%)]"
            >
              <Link to="/contact">Schedule a Training Session</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
