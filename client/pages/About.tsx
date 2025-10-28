import { Link } from "react-router-dom";

import { PageBanner } from "@/components/layout/PageBanner";

export default function About() {
  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title="About Us"
        description="Discover Esco Biosafety Institute and our mission to advance biosafety education and standards."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />
      {/* Hero */}
      <section className="relative container mx-auto px-4 py-16 md:py-24">
        <div
          className="pointer-events-none absolute left-[12%] top-16 hidden h-56 w-56 rounded-full bg-[#0096d6]/12 blur-3xl md:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-[8%] top-32 hidden h-72 w-72 rounded-full bg-[#003a68]/12 blur-3xl lg:block"
          aria-hidden
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div className="relative space-y-5 lg:max-w-xl">
            <div>
              <div className="w-16 h-1 bg-[hsl(var(--primary))] mb-4"></div>
              <h1 className="text-3xl font-bold leading-tight text-[hsl(205_100%_12%)] md:text-5xl">
                Esco Biosafety Institute
              </h1>
            </div>
            <p className="max-w-prose text-base text-slate-700 md:text-lg">
              Esco is a global life sciences company that started in 1978 as a
              cleanroom technology specialist. It has since progressed into a
              key player that leverages its Singapore headquarters as a
              strategic hub to connect Eastern and Western markets. The company
              is a market leader in biological safety cabinets and maintains a
              significant worldwide presence.
            </p>
            <p className="max-w-prose text-base text-slate-700 md:text-lg">
              A key initiative in fulfilling its vision was the creation of the
              Esco Biosafety Institute. The Institute was created to push
              forward Esco’s core mission of building a global life sciences
              ecosystem. Beyond being a manufacturing hardware, it purposes to
              be a foundational pillar for education and standards.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-[hsl(var(--brand-end))] px-5 py-3 font-semibold text-white shadow transition hover:shadow-md"
              >
                Contact us
              </Link>
              <Link
                to="/news"
                className="inline-flex items-center justify-center border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-50"
              >
                Explore resources
              </Link>
            </div>
          </div>
          <div className="relative lg:pl-8">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm md:p-8">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#003a68] via-[#0096d6] to-[#003a68]"
                aria-hidden
              />
              <div className="mb-4">
                <div className="w-16 h-1 bg-[hsl(var(--primary))] mb-2"></div>
                <h3 className="text-xl font-semibold text-[hsl(205_100%_12%)]">
                  Our Journey
                </h3>
              </div>
              <ul className="mt-6 space-y-5">
                <li className="relative pl-10 text-sm leading-relaxed text-slate-700">
                  <span
                    className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#003a68]/10 text-[#003a68] ring-2 ring-white shadow-sm"
                    aria-hidden
                  >
                    <span className="h-2 w-2 rounded-full bg-[#003a68]" />
                  </span>
                  <span className="font-semibold">1978:</span> Founded as a
                  cleanroom technology specialist.
                </li>
                <li className="relative pl-10 text-sm leading-relaxed text-slate-700">
                  <span
                    className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#003a68]/10 text-[#003a68] ring-2 ring-white shadow-sm"
                    aria-hidden
                  >
                    <span className="h-2 w-2 rounded-full bg-[#003a68]" />
                  </span>
                  <span className="font-semibold">1980s–2000s:</span> Expanded
                  globally; became a market leader in biological safety
                  cabinets.
                </li>
                <li className="relative pl-10 text-sm leading-relaxed text-slate-700">
                  <span
                    className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#003a68]/10 text-[#003a68] ring-2 ring-white shadow-sm"
                    aria-hidden
                  >
                    <span className="h-2 w-2 rounded-full bg-[#003a68]" />
                  </span>
                  <span className="font-semibold">Today:</span> A global company
                  connecting East and West from Singapore HQ.
                </li>
                <li className="relative pl-10 text-sm leading-relaxed text-slate-700">
                  <span
                    className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#003a68]/10 text-[#003a68] ring-2 ring-white shadow-sm"
                    aria-hidden
                  >
                    <span className="h-2 w-2 rounded-full bg-[#003a68]" />
                  </span>
                  <span className="font-semibold">
                    Esco Biosafety Institute:
                  </span>{" "}
                  Established to advance education, standards, and
                  certification.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative container mx-auto mt-20 px-4">
        <div
          className="pointer-events-none absolute inset-x-6 -top-10 hidden h-32 rounded-full bg-[#0096d6]/10 blur-3xl md:block"
          aria-hidden
        />
        <div className="relative grid gap-6 md:grid-cols-3">
          <MissionCard
            title="Cultivate a Global Culture of Biosafety"
            descr="Educate and certify professionals worldwide, ensuring the highest standards of safety, quality, and compliance in laboratories."
          />
          <MissionCard
            title="Bridge the Knowledge Gap"
            descr="Serve as a central hub for best practices, regulatory updates, and practical skills, leveraging 40+ years of industry experience."
          />
          <MissionCard
            title="Empower the Scientific Community"
            descr="Protect researchers, patients, and the environment by enabling effective use of safety equipment and responsible handling of biological materials."
          />
        </div>
      </section>

      {/* Call to action */}
      <section className="container mx-auto mt-20 mb-24 px-4">
        <div className="relative overflow-hidden rounded-3xl border border-transparent bg-gradient-to-r from-[#003a68] via-[#005a9f] to-[#0096d6] p-6 text-white shadow-xl md:flex md:items-center md:justify-between md:gap-8 md:p-10">
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)] md:block"
            aria-hidden
          />
          <div className="relative z-10 max-w-2xl space-y-3">
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              Partner with us
            </h3>
            <p className="text-white/90">
              Looking to upskill your team, certify your lab, or align with
              global standards? Our experts can help tailor training and
              resources to your needs.
            </p>
          </div>
          <div className="relative z-10 mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white px-5 py-3 font-semibold text-[#003a68] shadow transition hover:shadow-md"
            >
              Get in touch
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function MissionCard({ title, descr }: { title: string; descr: string }) {
  return (
    <div className="relative overflow-hidden bg-white p-6 border-b border-slate-300">
      <div className="relative z-10 space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[hsl(205_100%_12%)]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{descr}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
