import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FAQWidget from "@/components/widgets/FAQWidget";
import { Button } from "@/components/Button";
import HeroSectionWidget from "@/components/HeroSectionWidget";
import ServicesWidget from "@/components/widgets/ServicesWidget";
import KnowledgeHubWidget from "@/components/widgets/KnowledgeHubWidget";
import ContactsDetailsWidget from "@/components/widgets/ContactsDetailsWidget";
import EmailSubscriptionWidget from "@/components/widgets/EmailSubscriptionWidget";

export default function Index() {
  return (
    <div id="top" className="text-slate-900 bg-white">
      {/* Hero Section */}
      <HeroSectionWidget />

      {/* About & Mission Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <div className="w-16 h-1 bg-brand-secondary mb-4"></div>
                <h2 className="text-4xl md:text-5xl font-bold text-[hsl(205_100%_12%)]">
                  About Esco Biosafety Institute
                </h2>
              </div>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Our institute provides training, guidance, resources, and
                certification support for biosafety professionals worldwide.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Whether you're looking to get certified, access information on
                biosafety products, stay updated on industry trends, or test
                your knowledge, we're your central hub for building expertise in
                biosafety protocols.
              </p>
              <Button
                asChild
                size="lg"
                className="shadow-lg hover:shadow-xl bg-[hsl(var(--primary))] hover:bg-[hsl(205_100%_20%)]"
              >
                <Link to="/about">Learn more</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-[hsl(var(--primary))] h-96 rounded-xl"></div>
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = new FormData(
                      e.currentTarget as HTMLFormElement,
                    );
                    console.log(Object.fromEntries(form.entries()));
                    alert("Thank you! We will contact you shortly.");
                  }}
                  className="bg-white"
                >
                  <div className="grid gap-8">
                    <div className="border-b border-slate-300 pb-8">
                      <div className="text-slate-700 text-base leading-relaxed">
                        <ContactsDetailsWidget />
                      </div>
                    </div>

                    <label className="grid gap-2 text-base font-semibold">
                      <span>Name</span>
                      <input
                        name="name"
                        required
                        className="h-12 bg-white text-slate-900 border-2 border-slate-300 px-4 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                      />
                    </label>
                    <label className="grid gap-2 text-base font-semibold">
                      <span>Phone or email</span>
                      <input
                        name="contact"
                        required
                        className="h-12 bg-white text-slate-900 border-2 border-slate-300 px-4 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                      />
                    </label>
                    <label className="grid gap-2 text-base font-semibold">
                      <span>Message</span>
                      <textarea
                        name="message"
                        rows={4}
                        className="bg-white text-slate-900 border-2 border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                      />
                    </label>

                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-brand-secondary hover:bg-brand-secondary/90"
                    >
                      Send request
                    </Button>
                    <p className="text-sm text-slate-500">
                      By submitting, you agree to the processing of personal
                      data.
                    </p>
                  </div>
                </form>
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
