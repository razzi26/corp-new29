import {
  Check,
  HeartPulse,
  Microscope,
  Stethoscope,
  Scan,
  ShieldCheck,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FAQWidget from "@/components/widgets/FAQWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import ContactModal from "@/components/ContactModal";
import { cn } from "@/lib/utils";
import FeaturedProductsWidget from "@/components/widgets/FeaturedProductsWidget";
import KnowledgeHubWidget from "@/components/widgets/KnowledgeHubWidget";

export default function Index() {
  return (
    <div id="top" className="text-slate-900 bg-white">
      {/* Hero with accent background */}
      <section
        className="relative -mt-16 text-white overflow-hidden"
        data-header-anchor
        aria-label="Hero section"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/8533036/pexels-photo-8533036.jpeg"
            alt="Scientist working in biosafety cabinet"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[hsl(var(--brand-start))]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--brand-start))]/60 to-[hsl(var(--brand-end))]/75 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40">
          <div className="hero-grid grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:flex lg:flex-col lg:items-start lg:text-left max-w-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Welcome to Esco Biosafety Institute!
              </h1>
              <p className="mt-6 text-white text-lg md:text-xl leading-relaxed max-w-2xl">
                Biosafety in any laboratory is crucial. The Esco Biosafety
                Institute was established to be your partner in achieving it.
                Our institute provides:
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {[
                  {
                    label: "Training & seminars",
                    icon: GraduationCap,
                    bg: "bg-[hsl(var(--brand-start))]",
                  },
                  {
                    label: "Regulatory guidance",
                    icon: ShieldCheck,
                    bg: "bg-[hsl(var(--accent))]",
                  },
                  {
                    label: "Practical resources",
                    icon: Microscope,
                    bg: "bg-[hsl(var(--brand-start))]",
                  },
                  {
                    label: "Certification support",
                    icon: BadgeCheck,
                    bg: "bg-[hsl(var(--accent))]",
                  },
                ].map(({ label, icon: Icon, bg }) => (
                  <div
                    key={label}
                    className={cn(
                      "flex items-center gap-4 text-white rounded-lg px-4 py-4 backdrop-blur-sm bg-white/10 border border-white/20",
                      bg,
                    )}
                  >
                    <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-semibold text-base leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-white text-lg leading-relaxed max-w-2xl">
                Whether you're looking to get certified, get information on
                biosafety products, need to be updated on industry trends, or
                want to test your knowledge, our institute is your central hub
                for building expertise and confidence in biosafety protocols.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-[hsl(var(--accent))] hover:bg-[hsl(21_69%_44%)] text-white px-8 py-3.5 font-bold shadow-lg hover:shadow-xl transition"
                >
                  Get certified
                </Link>
                <Link
                  to="/news"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white text-white px-8 py-3.5 font-bold hover:bg-white/10 transition"
                >
                  Explore resources
                </Link>
              </div>
            </div>
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
            to="/products"
            className="hidden md:inline-flex text-sm hover:underline"
          >
            Browse all products
          </Link>
        </div>

        <FeaturedProductsWidget />

        {/*<div className="mt-6">
          <Link
            to="/products"
            className="inline-flex items-center rounded-lg bg-[hsl(var(--brand-end))] text-white px-5 py-3 font-semibold shadow hover:shadow-md transition"
          >
            Browse all products
          </Link>
        </div>*/}
      </section>

      {/* Knowledge Hub */}
      <section className="container mx-auto px-4 mt-20">
        <KnowledgeHubWidget />
      </section>

      {/* Contact teaser */}
      <section className="container mx-auto px-4 mt-20 mb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">FAQs</h3>
            <div className="mt-6">
              <FAQWidget />
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget as HTMLFormElement);
              console.log(Object.fromEntries(form.entries()));
              alert("Thank you! We will contact you shortly.");
            }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-4">
              <h3 className="text-2xl md:text-3xl font-bold">Contact Us</h3>
              <div className="rounded-md bg-slate-50 p-3 text-slate-700 text-sm">
                <div className="font-semibold">Contact details</div>
                <ul className="mt-2 space-y-1">
                  <li>Phone: +7 (495) 000-00-00</li>
                  <li>Email: contact@escobiosafety.org</li>
                  <li>Mon–Fri: 9:00–19:00</li>
                </ul>
              </div>

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
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-transparent via-transparent to-[#0096d6]/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1 bg-gradient-to-r from-[#003a68] via-[#0096d6] to-[#003a68]"
        aria-hidden
      />
      <div className="relative z-10 space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-base leading-relaxed text-slate-600">{descr}</p>
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
