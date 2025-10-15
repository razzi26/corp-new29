import {
  Check,
  HeartPulse,
  Microscope,
  Stethoscope,
  Scan,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div id="top" className="text-slate-900 bg-white">
      {/* Hero with accent background */}
      <section
        className="bg-[hsl(var(--brand-end))] text-white -mt-16"
        data-header-anchor
      >
        <div className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="hero-grid grid lg:grid-cols-2 gap-10 items-center">
            <div className="lg:flex lg:flex-col lg:items-center lg:text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs md:text-sm border border-white/25 text-white">
                <ShieldCheck className="h-4 w-4" /> Biosafety training •
                Guidance • Resources
              </span>
              <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-tight">
                Welcome to Esco Biosafety Institute
              </h1>
              <p className="mt-4 text-white/90 text-base md:text-lg max-w-xl">
                Biosafety in any laboratory is crucial. The Esco Biosafety
                Institute was established to be your partner in achieving it.
                Our institute provides:
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { label: "Training & seminars", icon: HeartPulse },
                  { label: "Regulatory guidance", icon: ShieldCheck },
                  { label: "Practical resources", icon: Microscope },
                  { label: "Certification support", icon: Check },
                ].map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-white/10 text-white/95 rounded-lg px-3 py-4"
                  >
                    <div className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/12 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-white/95 leading-none">{label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-white/85 text-base md:text-lg max-w-2xl">
                Whether you���re looking to get certified, get information on
                biosafety products, need to be updated on industry trends, or
                want to test your knowledge, our institute is your central hub
                for building expertise and confidence in biosafety protocols.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-[hsl(var(--brand-end))] px-5 py-3 font-semibold shadow hover:shadow-md transition"
                >
                  Get certified
                </Link>
                <Link
                  to="/news"
                  className="inline-flex items-center justify-center rounded-lg border border-white/60 text-white px-5 py-3 font-semibold hover:bg-white/10 transition"
                >
                  Explore resources
                </Link>
              </div>

            </div>

            {/*
            <div className="relative">
              <div className="relative rounded-3xl bg-white text-slate-900 p-6 md:p-8 shadow-lg">
                <div className="grid grid-cols-3 gap-4">
                  <FeatureCard icon={HeartPulse} title="Monitors" />
                  <FeatureCard icon={Microscope} title="Laboratory" />
                  <FeatureCard icon={Scan} title="Imaging" />
                  <FeatureCard icon={Stethoscope} title="Diagnostics" />
                  <FeatureCard icon={ShieldCheck} title="Sterilization" />
                  <FeatureCard icon={HeartPulse} title="Cardiology" />
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  We tailor configurations to your needs and budget
                </p>
              </div>
            </div>
            */}
            
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 mt-20">
        <div className="grid md:grid-cols-3 gap-6">
          <BenefitCard
            title="Industry expertise"
            descr="10+ years supplying public and private healthcare"
          />
          <BenefitCard
            title="Official supply"
            descr="We work only with certified manufacturers"
          />
          <BenefitCard
            title="Nationwide service"
            descr="Own service team and responsive support"
          />
        </div>
      </section>

      {/* Products preview */}
      <section className="container mx-auto px-4 mt-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link
            to="/contact"
            className="hidden md:inline-flex text-sm hover:underline"
          >
            Need help choosing?
          </Link>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard title="Biosafety Cabinets" tag="Core" />
          <ProductCard title="CO₂ Incubators" tag="Core" />
          <ProductCard title="PCR Cabinets" tag="Popular" />
          <ProductCard title="Cleanroom Solutions" tag="Advanced" />
          <ProductCard title="Isolators" tag="Specialized" />
          <ProductCard title="Fume Hoods" tag="Popular" />
        </div>
        <div className="mt-6">
          <Link
            to="/products"
            className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-5 py-3 font-semibold shadow hover:shadow-md transition"
          >
            Browse all products
          </Link>
        </div>
      </section>

      {/* Highlighted Resources */}
      <section className="container mx-auto px-4 mt-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Highlighted Resources
          </h2>
          <Link
            to="/news"
            className="hidden md:inline-flex text-sm hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <ResourceCard title="Biosafety Cabinet Certification Guide" />
          <ResourceCard title="Top 10 BSC Best Practices" />
          <ResourceCard title="Understanding ISO/EN Standards" />
        </div>
      </section>

      {/* Contact teaser */}
      <section className="container mx-auto px-4 mt-20 mb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Contact us</h3>
            <p className="mt-3 text-slate-700 max-w-prose">
              Leave your details — we will prepare a commercial offer that fits
              your needs, timelines and budget.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700 text-sm">
              <li>Phone: +7 (495) 000-00-00</li>
              <li>Email: contact@escobiosafety.org</li>
              <li>Mon–Fri: 9:00–19:00</li>
            </ul>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget as HTMLFormElement);
              console.log(Object.fromEntries(form.entries()));
              alert("Thank you! We will contact you shortly.");
            }}
            className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm"
          >
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm">
                <span>Name</span>
                <input
                  name="name"
                  required
                  className="h-11 rounded-lg bg-white text-slate-900 border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Phone or email</span>
                <input
                  name="contact"
                  required
                  className="h-11 rounded-lg bg-white text-slate-900 border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={4}
                  className="rounded-lg bg-white text-slate-900 border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--brand-end))]"
                />
              </label>
              <button className="mt-2 inline-flex items-center justify-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-5 py-3 font-semibold shadow hover:shadow-md transition">
                Send request
              </button>
              <p className="text-xs text-slate-500">
                By submitting, you agree to the processing of personal data.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="aspect-square rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center p-4">
      <Icon className="h-8 w-8 text-[hsl(var(--brand-end))]" />
      <span className="mt-2 text-base">{title}</span>
    </div>
  );
}

function BenefitCard({ title, descr }: { title: string; descr: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="font-semibold text-xl">{title}</h3>
      <p className="mt-2 text-slate-700 text-base leading-relaxed">{descr}</p>
    </div>
  );
}

function ProductCard({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative h-40 bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%),radial-gradient(circle_at_70%_80%,white,transparent_25%)]" />
        <span className="absolute top-3 left-3 text-sm rounded-full bg-white text-[hsl(var(--brand-end))] px-3 py-1 font-semibold">
          {tag}
        </span>
      </div>
      <div className="p-5">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="mt-1 text-base text-slate-600">
          Check availability and pricing with our manager
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-3.5 py-2.5 text-base font-semibold shadow"
          >
            Request quote
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg border border-slate-300 px-3.5 py-2.5 text-base font-semibold hover:bg-slate-50"
          >
            Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title }: { title: string }) {
  return (
    <Link
      to="/news"
      className="rounded-2xl border border-slate-200 bg-white p-6 block hover:shadow-sm transition-shadow"
    >
      <div className="text-sm text-slate-500">Featured</div>
      <h3 className="mt-2 font-semibold text-xl">{title}</h3>
      <p className="mt-2 text-base text-slate-600">
        Explore best practices, standards and industry insights curated by our
        experts.
      </p>
      <span className="mt-4 inline-flex text-base underline">Read more</span>
    </Link>
  );
}
