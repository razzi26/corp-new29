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
import servicesData from "@/config/data/services.json";
import TrainingsSection from "@/components/services/TrainingsSection";
import CommissioningSection from "@/components/services/CommissioningSection";
import ValidationSection from "@/components/services/ValidationSection";

const ICONS: Record<string, any> = { Headset, Wrench, Boxes, LifeBuoy, Award, Truck, Clock };

export default function Services() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title={servicesData.title}
        description={servicesData.description}
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
            {servicesData.intro.map((p, i) => (
              <p key={i} className="mt-4 text-base md:text-lg text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
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
            {servicesData.features.map((f) => {
              const Icon = ICONS[f.icon] ?? Headset;
              return (
                <FeatureCard
                  key={f.title}
                  icon={Icon}
                  title={f.title}
                  descr={f.descr}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3">
            {servicesData.badges.map((b) => {
              const Icon = ICONS[b.icon] ?? Award;
              return <BadgeItem key={b.label} icon={Icon} label={b.label} descr={b.descr} />;
            })}
          </div>
        </div>
      </section>

      {/* Trainings Section (embedded) */}
      <TrainingsSection />

      {/* Commissioning Section (embedded) */}
      <CommissioningSection />

      {/* Validation Section (embedded) */}
      <ValidationSection />
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
