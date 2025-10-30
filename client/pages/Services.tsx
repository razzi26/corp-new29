import { PageBanner } from "@/components/layout/PageBanner";
import {
  Wrench,
  Headset,
  Boxes,
  ShieldCheck,
  Award,
  Truck,
  Clock,
  LifeBuoy,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="Services"
        description="Global, certified field service and support for biosafety equipment."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Services" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid items-start gap-8 lg:gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Expert Field Service, Worldwide
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-700 leading-relaxed">
              Esco Lifesciences Group leverages its global team of highly
              trained field service engineers to provide clients with
              comprehensive support. This includes reliable technical
              assistance, on-site engineering, a guaranteed inventory of ready
              parts, and dedicated after-sales service. Our global team holds
              prestigious certifications from NSF, TÜV-NORD, NEBB, IFBA, and
              CETA-CNBT, ensuring expert servicing for a wide range of
              equipment.
            </p>
            <ul className="mt-6 grid gap-3 text-slate-700">
              {[
                "Reliable technical assistance",
                "On-site engineering and commissioning",
                "Guaranteed inventory of ready parts",
                "Dedicated after-sales service",
              ].map((text) => (
                <li key={text} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 text-[hsl(var(--brand-end))]" />
                  <span className="text-base">{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] px-5 py-3 font-semibold text-white shadow hover:shadow-md transition"
              >
                Request Service
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={Headset}
              title="Technical Support"
              descr="Fast, expert assistance from certified engineers."
            />
            <FeatureCard
              icon={Wrench}
              title="On‑site Engineering"
              descr="Installation, commissioning, calibration, certification."
            />
            <FeatureCard
              icon={Boxes}
              title="Spare Parts"
              descr="Guaranteed inventory with quick dispatch globally."
            />
            <FeatureCard
              icon={LifeBuoy}
              title="After‑sales Care"
              descr="Preventive maintenance and responsive repairs."
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3">
            <BadgeItem
              icon={Award}
              label="Certified Team"
              descr="NSF, TÜV‑NORD, NEBB, IFBA, CETA‑CNBT"
            />
            <BadgeItem
              icon={Truck}
              label="Global Coverage"
              descr="Service from regional hubs worldwide"
            />
            <BadgeItem
              icon={Clock}
              label="Rapid Response"
              descr="Priority dispatch and SLAs available"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  descr,
}: {
  icon: any;
  title: string;
  descr: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-start))]/10 text-[hsl(var(--brand-end))]">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{descr}</p>
      </div>
    </div>
  );
}

function BadgeItem({
  icon: Icon,
  label,
  descr,
}: {
  icon: any;
  label: string;
  descr: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--brand-end))] text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-semibold">{label}</div>
        <div className="text-sm text-slate-600">{descr}</div>
      </div>
    </div>
  );
}
