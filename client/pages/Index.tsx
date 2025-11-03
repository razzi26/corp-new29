import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FAQWidget from "@/components/widgets/FAQWidget";
import { Button } from "@/components/Button";
import HeroSectionWidget from "@/components/HeroSectionWidget";
import ServicesWidget from "@/components/widgets/ServicesWidget";
import KnowledgeHubWidget from "@/components/widgets/KnowledgeHubWidget";
import EmailSubscriptionWidget from "@/components/widgets/EmailSubscriptionWidget";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/config/config";
import homeAboutData from "@/config/data/homeAbout.json";

export default function Index() {
  return (
    <div id="top" className="text-slate-900 bg-white">
      {/* Hero Section */}
      <HeroSectionWidget />

      {/* Knowledge Hub */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <KnowledgeHubWidget />
        </div>
      </section>

      {/* About & Mission Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
                <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
                  About {siteConfig.siteName}
                </h2>
              </div>
              {homeAboutData.paragraphs.slice(0, 2).map((p, i) => (
                <p
                  key={i}
                  className="text-lg text-slate-700 mb-4 leading-relaxed"
                >
                  {p}
                </p>
              ))}
              <Button
                asChild
                size="lg"
                className="shadow-lg hover:shadow-xl bg-[hsl(var(--primary))] hover:bg-[hsl(205_100%_20%)]"
              >
                <Link to="/about">Learn more</Link>
              </Button>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="w-full h-56 sm:h-72 md:h-80 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="/placeholder.svg"
                  alt="About photo"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products preview */}
      {/*
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--primary))]">Featured Products</h2>
            <Link
              to="/products"
              className="hidden md:inline-flex text-base font-semibold text-[hsl(var(--primary))] hover:underline"
            >
              Browse all products →
            </Link>
          </div>

          <FeaturedProductsWidget />
        </div>
      </section>*/}

      {/* Services */}
      <ServicesWidget />

      {/* Benefits - Color Block Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
              Why Choose Us
            </h2>
          </div>
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

      {/* Contact teaser */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
                <h3 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
                  FAQs
                </h3>
              </div>
              <div className="mt-6">
                <FAQWidget />
              </div>
            </div>

            <div className="mb-8">
              <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
              <h3 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
                Contact Us
              </h3>
              <div className="mt-6">
                <ContactForm variant="minimal" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscription */}
      <EmailSubscriptionWidget />
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
    <div className="border-b border-slate-200 pb-8 pt-6">
      <h3 className="text-2xl font-bold text-[hsl(var(--primary))] mb-4">
        {title}
      </h3>
      <p className="text-lg leading-relaxed text-slate-700">{descr}</p>
    </div>
  );
}

function ResourceCard({ title }: { title: string }) {
  return (
    <Link
      to="/news"
      className="rounded-2xl border border-slate-200 bg-white p-6 block"
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
