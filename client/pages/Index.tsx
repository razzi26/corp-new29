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
            {/*<div className="lg:flex lg:flex-col lg:items-start lg:text-left max-w-2xl">
              
            </div>*/}

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
      </section>

      {/* About & Mission Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
                About Esco Biosafety Institute
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Our institute provides training, guidance, resources, and
                certification support for biosafety professionals worldwide.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Whether you're looking to get certified, access information on
                biosafety products, stay updated on industry trends, or test
                your knowledge, we're your central hub for building expertise
                in biosafety protocols.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center rounded-lg bg-[hsl(var(--primary))] text-white px-8 py-3 font-bold shadow-lg hover:shadow-xl transition hover:bg-[hsl(208_35%_28%)]"
              >
                Learn more
              </Link>
            </div>
            <div className="relative">
              <div className="bg-[hsl(var(--primary))] h-96 rounded-xl shadow-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Color Block Section */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              title="Industry Expertise"
              descr="10+ years supplying public and private healthcare institutions with trusted biosafety solutions"
            />
            <BenefitCard
              title="Official Supply"
              descr="We work only with certified manufacturers to ensure quality and compliance with standards"
            />
            <BenefitCard
              title="Nationwide Service"
              descr="Our own service team provides responsive support and maintenance across the nation"
            />
          </div>
        </div>
      </section>

      {/* Products preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--primary))]">Featured Products</h2>
            <Link
              to="/products"
              className="hidden md:inline-flex text-base font-semibold text-[hsl(var(--accent))] hover:underline"
            >
              Browse all products →
            </Link>
          </div>

          <FeaturedProductsWidget />
        </div>
      </section>

      {/* Knowledge Hub */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <KnowledgeHubWidget />
        </div>
      </section>

      {/* Contact teaser */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-[hsl(var(--primary))] mb-8">FAQs</h3>
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
              className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg"
            >
              <div className="grid gap-6">
                <h3 className="text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">Contact Us</h3>
                <div className="rounded-lg bg-[hsl(var(--primary))]/5 p-4 text-slate-700 text-base border border-[hsl(var(--primary))]/10">
                  <div className="font-bold text-[hsl(var(--primary))]">Contact details</div>
                  <ul className="mt-3 space-y-2">
                    <li>Phone: +7 (495) 000-00-00</li>
                    <li>Email: contact@escobiosafety.org</li>
                    <li>Mon–Fri: 9:00–19:00</li>
                  </ul>
                </div>

                <label className="grid gap-2 text-base font-semibold">
                  <span>Name</span>
                  <input
                    name="name"
                    required
                    className="h-12 rounded-lg bg-white text-slate-900 border-2 border-slate-300 px-4 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                  />
                </label>
                <label className="grid gap-2 text-base font-semibold">
                  <span>Phone or email</span>
                  <input
                    name="contact"
                    required
                    className="h-12 rounded-lg bg-white text-slate-900 border-2 border-slate-300 px-4 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                  />
                </label>
                <label className="grid gap-2 text-base font-semibold">
                  <span>Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    className="rounded-lg bg-white text-slate-900 border-2 border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                  />
                </label>
                <button className="mt-4 inline-flex items-center justify-center rounded-lg bg-[hsl(var(--primary))] hover:bg-[hsl(208_35%_28%)] text-white px-8 py-3.5 font-bold shadow-lg hover:shadow-xl transition">
                  Send request
                </button>
                <p className="text-sm text-slate-500">
                  By submitting, you agree to the processing of personal data.
                </p>
              </div>
            </form>
          </div>
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
    <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl transition">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[hsl(var(--accent))]/5 via-transparent to-[hsl(var(--primary))]/5"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))]"
        aria-hidden
      />
      <div className="relative z-10 space-y-4">
        <h3 className="text-2xl font-bold text-[hsl(var(--primary))]">{title}</h3>
        <p className="text-lg leading-relaxed text-slate-700">{descr}</p>
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
