import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/Button";
import { CheckCircle2, Wrench, Building2 } from "lucide-react";

export default function CommissioningAndQualification() {
  const services = [
    "Qualification Protocol Execution",
    "Facility Construction",
  ];

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Commissioning and Qualification"
        description="Providing quality installation of equipment and construction of facilities from start to finish."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Commissioning and Qualification" },
        ]}
      />

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)] mb-6">
                Expert Commissioning & Qualification Services
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                From initial planning through final qualification, we manage every aspect of your equipment installation and facility commissioning. Our comprehensive approach ensures that your equipment and facilities meet all performance specifications and regulatory requirements from day one.
              </p>
            </div>

            {/* Services Grid */}
            <div className="bg-slate-50 rounded-xl p-8 md:p-12 mb-12">
              <h3 className="text-2xl font-bold text-[hsl(205_100%_12%)] mb-8">
                Services Offered
              </h3>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service} className="flex gap-3 items-start">
                    <CheckCircle2 className="h-6 w-6 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium text-lg">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="border border-slate-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="h-6 w-6 text-[hsl(var(--primary))]" />
                  <h3 className="text-xl font-semibold text-slate-900">
                    Equipment Installation
                  </h3>
                </div>
                <p className="text-slate-700">
                  Expert installation of biosafety cabinets and other critical equipment with strict adherence to manufacturer specifications and operational requirements.
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-[hsl(var(--primary))]" />
                  <h3 className="text-xl font-semibold text-slate-900">
                    Facility Construction
                  </h3>
                </div>
                <p className="text-slate-700">
                  Comprehensive facility design and construction ensuring compliance with biosafety standards and creating optimal working environments.
                </p>
              </div>
            </div>

            {/* Process Overview */}
            <div className="bg-slate-50 rounded-xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-[hsl(205_100%_12%)] mb-6">
                Our Process
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white font-semibold">
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Planning & Design</h4>
                    <p className="text-slate-700">
                      Detailed planning and facility design based on your specific requirements and regulatory needs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white font-semibold">
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Installation & Construction</h4>
                    <p className="text-slate-700">
                      Professional installation of equipment and facility construction with continuous quality oversight.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white font-semibold">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Qualification & Testing</h4>
                    <p className="text-slate-700">
                      Comprehensive qualification protocols ensuring all systems perform to specifications.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white font-semibold">
                      4
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Documentation & Handover</h4>
                    <p className="text-slate-700">
                      Complete documentation package for regulatory compliance and operational readiness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="shadow-lg hover:shadow-xl bg-[hsl(var(--primary))] hover:bg-[hsl(205_100%_20%)]"
              >
                <Link to="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
