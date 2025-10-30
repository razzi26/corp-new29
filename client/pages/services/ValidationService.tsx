import { Link } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/Button";
import { CheckCircle2 } from "lucide-react";

export default function ValidationService() {
  const services = [
    "Validation Program Development",
    "Validation Planning & Reporting",
    "SOP Development & Review",
    "Qualification Protocol Development (IQ/OQ)",
    "Equipment validation",
    "Facilities validation",
    "HVAC system validation",
    "Cleaning validation",
    "Process Validation",
    "Analytical method validation",
    "Computer system validation",
    "Cold Chain Validation",
    "Surrogate Powder Testing",
  ];

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Validation Service"
        description="Ensuring integrity and performance of systems, facilities & equipment through comprehensive validation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Validation Service" },
        ]}
      />

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)] mb-6">
                Our Validation Services
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                We provide comprehensive validation services to ensure the
                integrity and performance of your systems, facilities, and
                equipment. Our expert team develops tailored validation programs
                that meet regulatory requirements and industry standards.
              </p>
            </div>

            {/* Services Grid */}
            <div className="bg-slate-50 rounded-xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-[hsl(205_100%_12%)] mb-8">
                Services Offered
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service} className="flex gap-3 items-start">
                    <CheckCircle2 className="h-6 w-6 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-[hsl(205_100%_12%)] mb-6">
                Why Choose Our Validation Services?
              </h3>
              <div className="space-y-4">
                <p className="text-slate-700 text-lg">
                  <span className="font-semibold">Regulatory Compliance:</span>{" "}
                  Our validation programs ensure full compliance with FDA, EMA,
                  and other regulatory requirements.
                </p>
                <p className="text-slate-700 text-lg">
                  <span className="font-semibold">Expert Team:</span> Our
                  experienced validators bring extensive knowledge of
                  pharmaceutical, biotech, and healthcare industries.
                </p>
                <p className="text-slate-700 text-lg">
                  <span className="font-semibold">Risk-Based Approach:</span> We
                  develop customized validation strategies based on your
                  specific operational requirements.
                </p>
                <p className="text-slate-700 text-lg">
                  <span className="font-semibold">
                    Documentation Excellence:
                  </span>{" "}
                  Comprehensive documentation and reporting to support your
                  compliance audits.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="shadow-lg hover:shadow-xl bg-[hsl(var(--primary))] hover:bg-[hsl(205_100%_20%)]"
              >
                <Link to="/contact">Request Validation Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
